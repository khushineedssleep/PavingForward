/**
 * app.js — Show Up Chicago
 * Two dropdown filters — cause and time available — drive matching.
 * Deterministic on purpose: this runs live in front of people, so exact
 * filtering beats guessable free-text parsing. "I'm in" saves an action
 * to My Actions via localStorage — no backend.
 */

const STORAGE_KEY = "suc_my_actions";

const ACTIONS = ORGS.flatMap((org) =>
  org.actions.map((action) => ({ org, action }))
);

const TIME_LABELS = {
  any: null,
  "2": "2 minutes",
  "15": "15 minutes",
  "30": "30 minutes",
  "60": "1 hour",
  "120": "2 hours",
  "240": "half a day"
};

function populateCauseFilter() {
  const select = document.getElementById("cause-filter");
  const causes = [...new Set(ORGS.map((o) => o.causeArea))].sort();
  select.innerHTML = `<option value="any">Any cause</option>`;
  causes.forEach((cause) => {
    const opt = document.createElement("option");
    opt.value = cause;
    opt.textContent = cause;
    select.appendChild(opt);
  });
}

function runMatch() {
  const cause = document.getElementById("cause-filter").value;
  const timeValue = document.getElementById("time-filter").value;
  const maxMinutes = timeValue === "any" ? Infinity : parseInt(timeValue, 10);
  const timeLabel = TIME_LABELS[timeValue];

  const matches = ACTIONS.filter(
    ({ org, action }) =>
      (cause === "any" || org.causeArea === cause) && action.minutes <= maxMinutes
  ).sort((a, b) => a.action.minutes - b.action.minutes || a.org.name.localeCompare(b.org.name));

  renderMatches(matches, cause, timeLabel);

  if (matches.length && window._civicMap) {
    const uniqueOrgIds = [...new Set(matches.map((s) => s.org.id))];
    const group = L.featureGroup(uniqueOrgIds.map((id) => window._civicMarkers[id]));
    window._civicMap.flyToBounds(group.getBounds().pad(0.3), { duration: 0.8 });
  }
}

const WHERE_LABEL = {
  in_person: "In person",
  remote: "From anywhere",
  either: "Flexible"
};

function orgWebsite(org) {
  return org.website && org.website.trim()
    ? org.website
    : `https://www.google.com/search?q=${encodeURIComponent(org.name + " Chicago")}`;
}

function actionKey(org, action) {
  return `${org.id}-${action.id}`;
}

function renderMatches(matches, cause, timeLabel) {
  matches = matches.slice(0, 8);

  document.getElementById("match-count").textContent = matches.length
    ? `${matches.length} match${matches.length === 1 ? "" : "es"}`
    : "";

  const causeText = cause === "any" ? "any cause" : cause;
  const timeText = timeLabel ? `under ${timeLabel}` : "any amount of time";
  document.getElementById("we-heard").textContent = `We heard: ${causeText} · ${timeText}`;

  const divider = document.getElementById("time-divider");
  const dividerLabel = document.getElementById("time-divider-label");
  dividerLabel.textContent = timeLabel ? `If you've got ${timeLabel}` : "";
  divider.hidden = !timeLabel;

  const results = document.getElementById("results");
  results.innerHTML = "";

  if (matches.length === 0) {
    const note = document.createElement("p");
    note.className = "empty-note";
    note.textContent = "No matches for that combination yet — try a different cause or more time.";
    results.appendChild(note);
    return;
  }

  matches.forEach(({ org, action }) => results.appendChild(actionCard(org, action)));
}

function actionCard(org, action) {
  const card = document.createElement("div");
  card.className = "action-card";
  const saved = isSaved(org, action);

  card.innerHTML = `
    <div class="badge-row">
      <span class="badge time">${action.timeLabel}</span>
      <span class="badge where">${WHERE_LABEL[action.where]}</span>
    </div>
    <h3>${action.action}</h3>
    <p class="org-name">${org.name}</p>
    <p class="desc">${action.detail}</p>
    <div class="card-actions">
      <button type="button" class="im-in ${saved ? "added" : ""}">${saved ? "Added \u2713" : "I'm in"}</button>
      <a href="${orgWebsite(org)}" target="_blank" rel="noopener">Their site &#8599;</a>
    </div>
  `;

  card.querySelector(".im-in").addEventListener("click", (e) => {
    toggleSaved(org, action);
    const btn = e.currentTarget;
    const nowSaved = isSaved(org, action);
    btn.classList.toggle("added", nowSaved);
    btn.textContent = nowSaved ? "Added \u2713" : "I'm in";
    updateMyCount();
    if (document.getElementById("view-my").hidden === false) renderMyActions();
  });

  return card;
}

// ---------- My Actions (localStorage) ----------

function getSaved() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setSaved(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // storage unavailable (private browsing, etc.) — fail quietly
  }
}

function isSaved(org, action) {
  return getSaved().includes(actionKey(org, action));
}

function toggleSaved(org, action) {
  const key = actionKey(org, action);
  const list = getSaved();
  const idx = list.indexOf(key);
  if (idx === -1) list.push(key);
  else list.splice(idx, 1);
  setSaved(list);
}

function updateMyCount() {
  document.getElementById("my-count").textContent = getSaved().length;
}

function renderMyActions() {
  const list = getSaved();
  const container = document.getElementById("my-actions-list");
  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = `<p class="my-actions-empty">You haven't added anything yet. Head to <strong>Find actions</strong> and tap "I'm in" on something.</p>`;
    return;
  }

  list.forEach((key) => {
    const [orgId, actionId] = key.split("-").map(Number);
    const org = ORGS.find((o) => o.id === orgId);
    if (!org) return;
    const action = org.actions.find((a) => a.id === actionId);
    if (!action) return;
    container.appendChild(actionCard(org, action));
  });
}

// ---------- Tabs ----------

function switchView(view) {
  document.getElementById("view-find").hidden = view !== "find";
  document.getElementById("view-my").hidden = view !== "my";
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.view === view);
  });
  if (view === "my") renderMyActions();
}

// ---------- Map ----------

function initMap() {
  const map = L.map("map", { scrollWheelZoom: false }).setView([41.8781, -87.6298], 10.6);

  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 19
  }).addTo(map);

  const markers = {};

  ORGS.forEach((org) => {
    const icon = L.divIcon({ className: "", html: '<div class="pin-dot"></div>', iconSize: [14, 14] });
    const marker = L.marker([org.lat, org.lng], { icon }).addTo(map);

    const actionList = org.actions
      .map((a) => `<li><strong>${a.action}</strong> — ${a.timeLabel}, ${WHERE_LABEL[a.where].toLowerCase()}</li>`)
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
  populateCauseFilter();
  initMap();
  updateMyCount();

  document.getElementById("match-form").addEventListener("submit", (e) => {
    e.preventDefault();
    runMatch();
  });

  document.querySelectorAll(".pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      document.getElementById("cause-filter").value = pill.dataset.cause;
      document.getElementById("time-filter").value = pill.dataset.time;
      runMatch();
    });
  });

  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => switchView(btn.dataset.view));
  });

  // Demo default on load — same combo as the "I've got 2 minutes" pill.
  document.getElementById("time-filter").value = "2";
  runMatch();
});
