/**
 * app.js — Show Up Chicago
 * Two dropdown filters — cause and time available — drive matching.
 * Deterministic on purpose: this runs live in front of people, so exact
 * filtering beats guessable free-text parsing. "I'm in" saves an action
 * to My Actions via localStorage — no backend.
 */

const STORAGE_KEY = "suc_my_actions";
const STORAGE_KEY_EVENTS = "suc_my_events";

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
  either: "Your choice"
};

function orgWebsite(org) {
  return org.website && org.website.trim()
    ? org.website
    : `https://www.google.com/search?q=${encodeURIComponent(org.name + " Chicago")}`;
}

function actionKey(org, action) {
  return `${org.id}-${action.id}`;
}

// Results are grouped into these buckets for display, regardless of
// which time filter is active — a broad filter (or "any") naturally
// spans several of them, a narrow filter collapses to just one.
const TIME_BUCKETS = [
  { max: 5, label: "a couple of minutes" },
  { max: 20, label: "about 15 minutes" },
  { max: 40, label: "about 30 minutes" },
  { max: 100, label: "about an hour" },
  { max: 300, label: "an afternoon" },
  { max: Infinity, label: "a full day" }
];

function bucketFor(minutes) {
  return TIME_BUCKETS.find((b) => minutes <= b.max);
}

const MAX_RESULTS = 16;

function renderMatches(matches, cause, timeLabel) {
  const total = matches.length;
  const shown = matches.slice(0, MAX_RESULTS);

  document.getElementById("match-count").textContent = total
    ? `${total} match${total === 1 ? "" : "es"}${total > shown.length ? ` (showing ${shown.length})` : ""}`
    : "";

  const causeText = cause === "any" ? "any cause" : cause;
  const timeText = timeLabel ? `under ${timeLabel}` : "any amount of time";
  document.getElementById("we-heard").textContent = `We heard: ${causeText} · ${timeText}`;

  const container = document.getElementById("results-container");
  container.innerHTML = "";

  if (shown.length === 0) {
    const note = document.createElement("p");
    note.className = "empty-note";
    note.textContent = "No matches for that combination yet — try a different cause or more time.";
    container.appendChild(note);
    return;
  }

  // Group the (already time-sorted) matches into buckets, preserving order.
  const groups = new Map();
  shown.forEach((m) => {
    const bucket = bucketFor(m.action.minutes);
    if (!groups.has(bucket.label)) groups.set(bucket.label, []);
    groups.get(bucket.label).push(m);
  });

  groups.forEach((items, label) => {
    const divider = document.createElement("div");
    divider.className = "time-divider";
    divider.innerHTML = `<h3>If you've got ${label}</h3><div class="rule"></div>`;
    container.appendChild(divider);

    const grid = document.createElement("div");
    grid.className = "results-grid";
    items.forEach(({ org, action }) => grid.appendChild(actionCard(org, action)));
    container.appendChild(grid);
  });
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
      <button type="button" class="im-in ${saved ? "added" : ""}">${saved ? "Done \u2713" : "I'm in"}</button>
      <a href="${orgWebsite(org)}" target="_blank" rel="noopener">Their site &#8599;</a>
    </div>
  `;

  card.querySelector(".im-in").addEventListener("click", (e) => {
    toggleSaved(org, action);
    const btn = e.currentTarget;
    const nowSaved = isSaved(org, action);
    btn.classList.toggle("added", nowSaved);
    btn.textContent = nowSaved ? "Done \u2713" : "I'm in";
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
  document.getElementById("my-count").textContent = getSaved().length + getSavedEvents().length;
}

// ---------- My Events (localStorage) ----------

function getSavedEvents() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_EVENTS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function setSavedEvents(list) {
  try {
    localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(list));
  } catch {
    // storage unavailable — fail quietly
  }
}

function isEventSaved(id) {
  return getSavedEvents().includes(id);
}

function toggleSavedEvent(id) {
  const list = getSavedEvents();
  const idx = list.indexOf(id);
  if (idx === -1) list.push(id);
  else list.splice(idx, 1);
  setSavedEvents(list);
  return list.includes(id);
}

function renderMyActions() {
  const savedActionKeys = getSaved();
  const savedEventIds = getSavedEvents();
  const container = document.getElementById("my-actions-list");
  container.innerHTML = "";

  if (savedActionKeys.length === 0 && savedEventIds.length === 0) {
    container.innerHTML = `<p class="my-actions-empty">You haven't added anything yet. Head to <strong>Find actions</strong> or <strong>Events</strong> and tap "I'm in" on something.</p>`;
    return;
  }

  if (savedEventIds.length > 0) {
    const head = document.createElement("div");
    head.className = "dayhead";
    head.innerHTML = `<span class="d">Events you're going to</span><span class="rule"></span>`;
    container.appendChild(head);

    const list = document.createElement("div");
    list.innerHTML = savedEventIds
      .map((id) => EVENTS.find((e) => e.id === id))
      .filter(Boolean)
      .map((e) => ({ ...e, dt: evDate(e) }))
      .sort((a, b) => a.dt - b.dt)
      .map(evRowHtml)
      .join("");
    container.appendChild(list);
  }

  if (savedActionKeys.length > 0) {
    if (savedEventIds.length > 0) {
      const head = document.createElement("div");
      head.className = "dayhead";
      head.innerHTML = `<span class="d">Actions you've saved</span><span class="rule"></span>`;
      container.appendChild(head);
    }

    const grid = document.createElement("div");
    grid.className = "results-grid";
    savedActionKeys.forEach((key) => {
      const [orgId, actionId] = key.split("-").map(Number);
      const org = ORGS.find((o) => o.id === orgId);
      if (!org) return;
      const action = org.actions.find((a) => a.id === actionId);
      if (!action) return;
      grid.appendChild(actionCard(org, action));
    });
    container.appendChild(grid);
  }
}

// ---------- Tabs ----------

function switchView(view) {
  document.getElementById("view-find").hidden = view !== "find";
  document.getElementById("view-events").hidden = view !== "events";
  document.getElementById("view-my").hidden = view !== "my";
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.view === view);
  });
  if (view === "my") renderMyActions();
  if (view === "events") renderEvents();
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

  // Sanity check: the cause dropdown's options are hardcoded in index.html
  // for reliability (see README). If organizations.csv ever gets a cause
  // area that isn't in that list, warn loudly in the console instead of
  // silently dropping matches for it.
  const knownCauses = new Set(
    [...document.getElementById("cause-filter").options].map((o) => o.value)
  );
  const dataCauses = new Set(ORGS.map((o) => o.causeArea));
  dataCauses.forEach((c) => {
    if (!knownCauses.has(c)) {
      console.warn(
        `Cause "${c}" appears in the data but isn't an option in the cause-filter <select> in index.html — add it there.`
      );
    }
  });

  document.getElementById("match-form").addEventListener("submit", (e) => {
    e.preventDefault();
    clearActivePill();
    runMatch();
  });

  document.getElementById("cause-filter").addEventListener("change", clearActivePill);
  document.getElementById("time-filter").addEventListener("change", clearActivePill);

  document.querySelectorAll(".pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      document.getElementById("cause-filter").value = pill.dataset.cause;
      document.getElementById("time-filter").value = pill.dataset.time;
      document.querySelectorAll(".pill").forEach((p) => p.classList.remove("active"));
      pill.classList.add("active");
      runMatch();
    });
  });

  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => switchView(btn.dataset.view));
  });

  // Demo default on load — same combo as the "I've got 2 minutes" pill.
  document.getElementById("time-filter").value = "2";
  document.querySelector('.pill[data-time="2"]')?.classList.add("active");
  runMatch();
});

function clearActivePill() {
  document.querySelectorAll(".pill").forEach((p) => p.classList.remove("active"));
}

// ============================================================
// Events tab (calendar module)
// EVENTS comes from events.js (generated from events.csv). Each event's
// orgId already matches an id in ORGS — see EVENT_ORG_CODES in
// convert.py for how the CSV's short org codes were resolved.
// off = days from "today" at page-load time, so the calendar is always
// current whenever the page is opened, with no stale hardcoded dates.
// ============================================================

let evFilter = "all";
let evView = "list";
let calMonth = null; // {y, m} currently shown in the calendar view
let calSel = null; // "y-m-d" of the selected day, or null

function evDate(e) {
  const dt = new Date();
  dt.setHours(e.h, e.m, 0, 0);
  dt.setDate(dt.getDate() + e.off);
  return dt;
}
function dayLabel(off, dt) {
  if (off === 0) return "Today";
  if (off === 1) return "Tomorrow";
  return dt.toLocaleDateString([], { weekday: "long", month: "short", day: "numeric" });
}
function fmtT(dt) {
  return dt.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}
function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
}

// Opens an org's "profile" — this site's map popup — and switches to
// the Find Actions tab to show it. Called from event cards' org links.
function onOrgClick(orgId) {
  switchView("find");
  document.querySelectorAll('.tab-btn[data-view="find"]').forEach((b) => b.classList.add("active"));
  document.querySelectorAll('.tab-btn:not([data-view="find"])').forEach((b) => b.classList.remove("active"));

  const mapEl = document.getElementById("map");
  if (mapEl) mapEl.scrollIntoView({ behavior: "smooth", block: "center" });

  const marker = window._civicMarkers && window._civicMarkers[orgId];
  if (marker && window._civicMap) {
    window._civicMap.flyTo(marker.getLatLng(), 14, { duration: 0.8 });
    setTimeout(() => marker.openPopup(), 450);
  }
}

// Extensibility hook — fires once when someone marks an event "I'm in".
// Saving itself already happens in markEv()/toggleSavedEvent(); this is
// just a seam for adding analytics later without touching that logic.
function onEventJoined(evt) {
  console.log("Event joined:", evt.t);
}

function renderEvents() {
  const el = document.getElementById("evContent");
  const kinds = [
    ["all", "Everything"],
    ["volunteer", "Volunteer"],
    ["advocacy", "Advocacy"],
    ["training", "Trainings"],
    ["event", "Events"]
  ];
  let html = `<h1>On the calendar</h1>
  <p class="sub">Real ways to show up. Tap an org for their page, tap "I'm in" and it counts on your record.</p>
  <div class="evtoggle">
    <button class="${evView === "list" ? "on" : ""}" onclick="evView='list';renderEvents()">List</button>
    <button class="${evView === "cal" ? "on" : ""}" onclick="evView='cal';renderEvents()">Calendar</button>
  </div>
  <div class="evfilters">`;
  for (const [k, label] of kinds) {
    html += `<button class="chip ${evFilter === k ? "on" : ""}" onclick="evFilter='${k}';renderEvents()">${label}</button>`;
  }
  html += `</div>`;
  const rows = EVENTS.filter((e) => evFilter === "all" || e.kind === evFilter)
    .map((e) => ({ ...e, dt: evDate(e) }))
    .sort((a, b) => a.dt - b.dt);
  html += evView === "cal" ? calHtml(rows) : listHtml(rows);
  el.innerHTML = html;
}

function evRowHtml(e) {
  const org = ORGS.find((o) => o.id === e.orgId);
  const name = org ? org.name : "Unknown org";
  const endDt = new Date(e.dt.getTime() + e.dur * 60000);
  const saved = isEventSaved(e.id);
  const link = e.signup && e.signup.trim() ? e.signup : org ? orgWebsite(org) : "#";
  return `<div class="evitem">
    <div class="evtime"><div class="t1">${fmtT(e.dt)}</div><div class="t2">to ${fmtT(endDt)}</div></div>
    <div class="evbody">
      <h3>${esc(e.t)}</h3>
      <div class="desc">${esc(e.d)}</div>
      <div class="evmeta"><span class="kindtag ${e.kind}">${e.kind}</span><button class="orglink" onclick="onOrgClick(${e.orgId})">${esc(name)}</button><span class="loc">· ${esc(e.loc)}</span></div>
    </div>
    <div class="evside">
      <button class="go ${saved ? "done" : ""}" onclick="markEv(${e.id},this)">${saved ? "Going \u2713" : "I'm in"}</button>
      <a class="go" href="${link}" target="_blank" rel="noopener">Sign up &#8599;</a>
    </div>
  </div>`;
}

function markEv(id, btn) {
  const nowSaved = toggleSavedEvent(id);
  btn.classList.toggle("done", nowSaved);
  btn.textContent = nowSaved ? "Going \u2713" : "I'm in";
  updateMyCount();
  if (nowSaved) {
    const evt = EVENTS.find((e) => e.id === id);
    if (evt) onEventJoined(evt);
  }
  if (document.getElementById("view-my").hidden === false) renderMyActions();
}

function listHtml(rows) {
  if (!rows.length) {
    return `<div class="evempty"><b>Nothing in this category right now.</b><br>Check Everything, or search for a remote action instead.</div>`;
  }
  let html = "",
    lastOff = null;
  for (const e of rows) {
    if (e.off !== lastOff) {
      lastOff = e.off;
      const lbl = dayLabel(e.off, e.dt);
      html += `<div class="dayhead"><span class="d">${e.off <= 1 ? `<em>${lbl}</em>` : lbl}</span><span class="rule"></span></div>`;
    }
    html += evRowHtml(e);
  }
  return html;
}

function dKey(dt) {
  return dt.getFullYear() + "-" + dt.getMonth() + "-" + dt.getDate();
}
function calShift(dm) {
  calMonth.m += dm;
  if (calMonth.m < 0) {
    calMonth.m = 11;
    calMonth.y--;
  }
  if (calMonth.m > 11) {
    calMonth.m = 0;
    calMonth.y++;
  }
  calSel = null;
  renderEvents();
}
function calPick(key) {
  calSel = calSel === key ? null : key;
  renderEvents();
  setTimeout(() => {
    const s = document.getElementById("selday");
    if (s) s.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, 50);
}

function calHtml(rows) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (!calMonth) calMonth = { y: today.getFullYear(), m: today.getMonth() };
  const byDay = {};
  for (const e of rows) {
    (byDay[dKey(e.dt)] = byDay[dKey(e.dt)] || []).push(e);
  }
  const first = new Date(calMonth.y, calMonth.m, 1);
  const startDow = first.getDay();
  const mname = first.toLocaleDateString([], { month: "long", year: "numeric" });
  let html = `<div class="calhead">
    <button onclick="calShift(-1)" aria-label="Previous month">‹</button>
    <span class="mname">${mname}</span>
    <button onclick="calShift(1)" aria-label="Next month">›</button>
  </div><div class="calgrid">`;
  for (const d of ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]) html += `<span class="dow">${d}</span>`;
  const cells = 42;
  for (let i = 0; i < cells; i++) {
    const dt = new Date(calMonth.y, calMonth.m, 1 - startDow + i);
    const inMonth = dt.getMonth() === calMonth.m;
    const key = dKey(dt);
    const evs = byDay[key] || [];
    const isToday = dt.getTime() === today.getTime();
    const cls = ["calcell", inMonth ? "" : "out", evs.length ? "hasev" : "", isToday ? "today" : "", calSel === key ? "sel" : ""]
      .filter(Boolean)
      .join(" ");
    html += `<div class="${cls}" ${evs.length ? `onclick="calPick('${key}')" role="button" tabindex="0" aria-label="${evs.length} events"` : ""}>
      <span class="dnum">${dt.getDate()}</span>`;
    for (const e of evs.slice(0, 2)) html += `<span class="calchip ${e.kind}">${esc(e.t)}</span>`;
    if (evs.length > 2) html += `<span class="calmore">+${evs.length - 2} more</span>`;
    if (evs.length) {
      html += `<span class="caldots">`;
      for (const e of evs.slice(0, 4)) html += `<span class="caldot ${e.kind}"></span>`;
      html += `</span>`;
    }
    html += `</div>`;
  }
  html += `</div>`;
  if (calSel && byDay[calSel]) {
    const evs = byDay[calSel];
    const dt = evs[0].dt;
    html += `<div class="seldaywrap" id="selday"><div class="dayhead"><span class="d"><em>${dt.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })}</em></span><span class="rule"></span></div>`;
    for (const e of evs) html += evRowHtml(e);
    html += `</div>`;
  } else {
    html += `<div class="seldaywrap"><p class="sub" style="margin-top:14px">Tap a day with events to see the lineup.</p></div>`;
  }
  return html;
}
