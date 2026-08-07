/**
 * app.js — Show Up Chicago
 * One free-text box drives everything: it's parsed for both a time
 * budget ("2 minutes", "an hour") and interest keywords ("immigrants",
 * "animals", "job skills"), matched against ORGS/actions from data.js.
 * "I'm in" saves an action to My Actions via localStorage — no backend.
 */

const STORAGE_KEY = "suc_my_actions";

// ---------- Time parsing ----------
// Pulls a minute budget + a human label out of free text. Falls back to
// "no limit" when nothing time-shaped is said (e.g. "Free Saturday
// afternoon" implies a bigger, looser block of time, not a hard cap).
function parseTimeBudget(text) {
  const t = text.toLowerCase();

  let m = t.match(/(\d+)\s*(minutes|minute|mins|min)\b/);
  if (m) {
    const n = parseInt(m[1], 10);
    return { minutes: n, label: `${n} minute${n === 1 ? "" : "s"}` };
  }

  m = t.match(/(\d+(?:\.\d+)?)\s*(hours|hour|hrs|hr)\b/);
  if (m) {
    const n = parseFloat(m[1]);
    return { minutes: Math.round(n * 60), label: `${m[1]} hour${n === 1 ? "" : "s"}` };
  }

  if (/half\s*a?\s*day/.test(t)) return { minutes: 240, label: "half a day" };
  if (/all\s*day|full\s*day/.test(t)) return { minutes: Infinity, label: null };
  if (/(quick|couple|few)\s*(min|minutes)?/.test(t) && /quick|couple minutes|few minutes/.test(t)) {
    return { minutes: 15, label: "a few minutes" };
  }

  return { minutes: Infinity, label: null };
}

// ---------- Keyword matching over ACTIONS ----------

const STOPWORDS = new Set([
  "i", "want", "to", "help", "with", "who", "the", "a", "an", "and", "for",
  "in", "on", "of", "my", "im", "i'm", "would", "like", "have", "has", "ve",
  "got", "from", "use", "hours", "hour", "minutes", "minute", "min", "mins", "week",
  "month", "time", "free", "please", "chicago", "something", "do"
]);

function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOPWORDS.has(w));
}

const ACTIONS = ORGS.flatMap((org) =>
  org.actions.map((action) => ({ org, action }))
);

const SKILL_WORDS = new Set(["skill", "skills", "job", "career", "professional", "expertise"]);
const REMOTE_WORDS = new Set(["home", "remote", "online", "virtual", "phone", "couch"]);
const IN_PERSON_WORDS = new Set(["person", "neighborhood", "outside", "outdoors"]);

// Whole-word match — plain .includes() would let "home" match inside
// "Homelessness", which is a false positive we don't want.
function hasWord(haystack, token) {
  return new RegExp(`\\b${token}\\b`).test(haystack);
}

function scoreEntry(org, action, tokens) {
  if (tokens.length === 0) return 0;

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
    if (hasWord(strongText, tok)) score += 3;
    else if (hasWord(weakText, tok)) score += 1;

    if (SKILL_WORDS.has(tok) && action.type === "skilled_task") score += 3;
    if (REMOTE_WORDS.has(tok) && (action.where === "remote" || action.where === "either")) score += 2;
    if (IN_PERSON_WORDS.has(tok) && (action.where === "in_person" || action.where === "either")) score += 2;
  });
  return score;
}

function actionFits(action, maxMinutes) {
  return action.minutes <= maxMinutes;
}

// ---------- Run a search ----------

function runMatch() {
  const text = document.getElementById("intent").value;
  const tokens = tokenize(text);
  const { minutes: maxMinutes, label: timeLabel } = parseTimeBudget(text);

  const candidates = ACTIONS.map(({ org, action }) => ({
    org,
    action,
    score: scoreEntry(org, action, tokens)
  }));

  let filtered = candidates.filter((s) => s.score > 0 && actionFits(s.action, maxMinutes));

  // No interest keywords (a pure time query like "I've got 2 minutes"),
  // or the words used just aren't in the data (e.g. "Saturday") — either
  // way, don't show an empty result for a query that specified a real
  // time budget. Fall back to whatever fits the time, shortest first.
  if (filtered.length === 0) {
    filtered = candidates
      .filter((s) => actionFits(s.action, maxMinutes))
      .sort((a, b) => a.action.minutes - b.action.minutes);
  } else {
    filtered.sort((a, b) => b.score - a.score || a.action.minutes - b.action.minutes);
  }

  const scored = filtered.slice(0, 8);

  renderMatches(scored, timeLabel);

  if (scored.length && window._civicMap) {
    const uniqueOrgIds = [...new Set(scored.map((s) => s.org.id))];
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

function renderMatches(scored, timeLabel) {
  document.getElementById("match-count").textContent = scored.length
    ? `${scored.length} match${scored.length === 1 ? "" : "es"}`
    : "";

  document.getElementById("we-heard").textContent = timeLabel
    ? `We heard: under ${timeLabel}`
    : "We heard: flexible on time";

  const divider = document.getElementById("time-divider");
  const dividerLabel = document.getElementById("time-divider-label");
  if (timeLabel) {
    dividerLabel.textContent = `If you've got ${timeLabel}`;
    divider.hidden = false;
  } else {
    divider.hidden = true;
  }

  const results = document.getElementById("results");
  results.innerHTML = "";

  if (scored.length === 0) {
    const note = document.createElement("p");
    note.className = "empty-note";
    note.textContent =
      'Try different words for who you want to help — e.g. "kids", "seniors", "animals", "immigrants" — or give yourself more time.';
    results.appendChild(note);
    return;
  }

  scored.forEach(({ org, action }) => results.appendChild(actionCard(org, action)));
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
  initMap();
  updateMyCount();

  document.getElementById("match-form").addEventListener("submit", (e) => {
    e.preventDefault();
    runMatch();
  });

  document.querySelectorAll(".pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      document.getElementById("intent").value = pill.dataset.q;
      runMatch();
    });
  });

  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => switchView(btn.dataset.view));
  });

  // Demo default — mirrors the "I've got 2 minutes" example on load.
  document.getElementById("intent").value = "I've got 2 minutes";
  runMatch();
});
