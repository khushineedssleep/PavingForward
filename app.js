/**
 * app.js — Chicago Civic Match
 * Matches free-text intent + a time budget against real ORGS/actions
 * (see data.js). No backend — everything runs in the browser.
 */

// ---------- 1. Plain-language matching over ACTIONS ----------

const STOPWORDS = new Set([
  "i", "want", "to", "help", "with", "who", "the", "a", "an", "and", "for",
  "in", "on", "of", "my", "im", "i'm", "would", "like", "people", "someone",
  "something", "have", "has", "hours", "hour", "week", "month", "time",
  "free", "please", "chicago", "wanna", "gonna", "get", "do", "support"
]);

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOPWORDS.has(w));
}

// Flatten every org's actions into one list, each carrying its parent org.
const ACTIONS = ORGS.flatMap((org) =>
  org.actions.map((action) => ({ org, action }))
);

function scoreEntry(org, action, tokens) {
  if (tokens.length === 0) return 0;

  // fields checked at higher weight — who the org serves / cause area
  // are the closest thing to "who do you want to help"
  const strongText = [org.whoTheyServe, org.causeArea].join(" ").toLowerCase();
  const weakText = [
    org.description,
    org.name,
    org.neighborhood,
    action.action,
    action.detail,
    action.howYouHelp
  ]
    .join(" ")
    .toLowerCase();

  let score = 0;
  tokens.forEach((tok) => {
    if (strongText.includes(tok)) score += 3;
    else if (weakText.includes(tok)) score += 1;
  });
  return score;
}

const TIME_MAX_MINUTES = {
  "15": 15,
  "30": 30,
  "60": 60,
  "120": 120,
  any: Infinity
};

function actionFits(action, maxMinutes) {
  return action.minutes <= maxMinutes;
}

function runMatch() {
  const text = document.getElementById("intent").value;
  const tokens = tokenize(text);
  const maxMinutes = TIME_MAX_MINUTES[document.getElementById("time").value];

  const scored = ACTIONS.map(({ org, action }) => ({
    org,
    action,
    score: scoreEntry(org, action, tokens)
  }))
    .filter((s) => s.score > 0 && actionFits(s.action, maxMinutes))
    .sort((a, b) => b.score - a.score || a.action.minutes - b.action.minutes)
    .slice(0, 6);

  renderMatches(scored);

  if (scored.length && window._civicMap) {
    const uniqueOrgIds = [...new Set(scored.map((s) => s.org.id))];
    const group = L.featureGroup(
      uniqueOrgIds.map((id) => window._civicMarkers[id])
    );
    window._civicMap.flyToBounds(group.getBounds().pad(0.3), { duration: 0.8 });
    uniqueOrgIds.forEach((id) => window._civicMarkers[id].openPopup());
  }
}

const WHERE_LABEL = {
  in_person: "In person",
  remote: "Remote",
  either: "In person or remote"
};

function renderMatches(scored) {
  const results = document.getElementById("results");
  results.innerHTML = "";

  const label = document.createElement("div");
  label.className = "results-label";
  label.textContent = scored.length
    ? `Top matches — ${scored.length} shown`
    : "No close matches yet";
  results.appendChild(label);

  if (scored.length === 0) {
    const note = document.createElement("p");
    note.className = "empty-note";
    note.textContent =
      'Try describing who you want to help in different words — e.g. "kids", "seniors", "animals", "refugees", "the environment" — or give yourself more time in the dropdown.';
    results.appendChild(note);
    return;
  }

  scored.forEach(({ org, action }) => {
    const card = document.createElement("div");
    card.className = "match-card";
    card.innerHTML = `
      <div class="cause-tag">${org.causeArea.toUpperCase()}</div>
      <div>
        <h3>${action.action}</h3>
        <div class="meta">${org.name} · ${org.neighborhood}${org.multiSite ? " (multiple sites)" : ""} · ${action.timeLabel} · ${WHERE_LABEL[action.where]}</div>
        <p>${action.detail}</p>
      </div>
    `;
    results.appendChild(card);
  });
}

// ---------- 2. Map ----------

function initMap() {
  const map = L.map("map", {
    scrollWheelZoom: false
  }).setView([41.8781, -87.6298], 10.6);

  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 19
    }
  ).addTo(map);

  const markers = {};

  ORGS.forEach((org) => {
    const icon = L.divIcon({
      className: "",
      html: '<div class="pin-dot"></div>',
      iconSize: [14, 14]
    });
    const marker = L.marker([org.lat, org.lng], { icon }).addTo(map);

    const actionList = org.actions
      .map(
        (a) =>
          `<li><strong>${a.action}</strong> — ${a.timeLabel}, ${WHERE_LABEL[a.where].toLowerCase()}</li>`
      )
      .join("");

    marker.bindPopup(`
      <h4>${org.name}</h4>
      <div class="popup-meta">${org.causeArea} · ${org.neighborhood}${org.multiSite ? " (multiple sites)" : ""}</div>
      <p style="margin:0 0 8px;font-size:14px;">${org.description}</p>
      <ul style="margin:0;padding-left:16px;font-size:13px;">${actionList}</ul>
    `);
    markers[org.id] = marker;
  });

  window._civicMap = map;
  window._civicMarkers = markers;
}

// ---------- Wire up ----------

document.addEventListener("DOMContentLoaded", () => {
  initMap();
  document.getElementById("match-form").addEventListener("submit", (e) => {
    e.preventDefault();
    runMatch();
  });
});
