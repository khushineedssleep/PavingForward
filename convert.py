import csv, json, random

NEIGHBORHOOD_COORDS = {
    "Archer Heights": (41.8103, -87.7256),
    "Bronzeville": (41.8175, -87.6173),
    "Bucktown": (41.9214, -87.6779),
    "East Garfield Park": (41.8814, -87.7086),
    "Edgewater": (41.9850, -87.6600),
    "Humboldt Park": (41.9042, -87.7014),
    "Lakeview": (41.9403, -87.6438),
    "Lincoln Park": (41.9214, -87.6513),
    "Lincoln Square": (41.9686, -87.6895),
    "Loop": (41.8827, -87.6298),
    "Museum Campus": (41.8623, -87.6167),
    "North Center": (41.9556, -87.6796),
    "North Side": (41.9796, -87.6720),
    "Pilsen": (41.8564, -87.6564),
    "River North": (41.8919, -87.6343),
    "Rogers Park": (42.0100, -87.6685),
    "Uptown": (41.9664, -87.6551),
    "West Loop": (41.8853, -87.6522),
    "West Rogers Park": (42.0028, -87.6976),
    "West Town": (41.9022, -87.6805),
    "Chicagoland": (41.8836, -87.6324),  # fallback: downtown, jittered per org below
}

# events.csv identifies orgs by short code (gcfd, ajh, ...) rather than the
# numeric org_id organizations.csv uses. Map each code to the real org_id
# once here so events.js can reference the same ORGS your whole site uses
# — no second, parallel org-name lookup to keep in sync.
EVENT_ORG_CODES = {
    "gcfd": "Greater Chicago Food Depository",
    "ajh": "A Just Harvest",
    "fru": "Food Rescue US - Chicago",
    "ref1": "RefugeeOne",
    "nijc": "National Immigrant Justice Center",
    "erie": "Erie Neighborhood House",
    "hopes": "Chicago HOPES for Kids",
    "openbooks": "Open Books",
    "asm": "After School Matters",
    "paws": "PAWS Chicago",
    "treehouse": "Tree House Humane Society",
    "lbfe": "Little Brothers - Friends of the Elderly",
    "mow": "Meals on Wheels Chicago",
    "cara": "Cara Collective",
    "cgla": "Cabrini Green Legal Aid",
    "votes": "Chicago Votes",
    "cch": "Chicago Coalition for the Homeless",
    "nightmin": "The Night Ministry",
    "fotr": "Friends of the Chicago River",
}

random.seed(42)

with open('organizations.csv') as f:
    orgs = list(csv.DictReader(f))
with open('actions.csv') as f:
    actions = list(csv.DictReader(f))

actions_by_org = {}
for a in actions:
    actions_by_org.setdefault(a['org_id'], []).append({
        "id": int(a['action_id']),
        "action": a['action'],
        "detail": a['action_detail'],
        "type": a['action_type'],
        "howYouHelp": a['how_you_help'],
        "minutes": int(a['time_minutes']),
        "timeLabel": a['time_label'],
        "where": a['where'],
    })

out = []
name_to_id = {}
for o in orgs:
    n = o['neighborhood']
    lat, lng = NEIGHBORHOOD_COORDS[n]
    multi_site = (n == "Chicagoland")
    if multi_site:
        # small deterministic jitter so multi-site orgs don't stack exactly
        lat += random.uniform(-0.045, 0.045)
        lng += random.uniform(-0.05, 0.05)
    org_id = int(o['org_id'])
    name_to_id[o['org_name']] = org_id
    out.append({
        "id": org_id,
        "name": o['org_name'],
        "description": o['description'],
        "whoTheyServe": o['who_they_serve'],
        "causeArea": o['cause_area'],
        "neighborhood": n,
        "multiSite": multi_site,
        "address": o['address'],
        # Optional column — add a "website" column to organizations.csv
        # with real URLs and this will pick it up automatically. Until
        # then, cards link out to a search for the org's name instead.
        "website": (o.get('website') or '').strip(),
        "lat": round(lat, 5),
        "lng": round(lng, 5),
        "actions": actions_by_org.get(o['org_id'], [])
    })

with open('data.js', 'w') as f:
    f.write('''/**
 * data.js — Chicago Civic Match dataset
 * ------------------------------------------------
 * GENERATED FILE — do not hand-edit. Edit organizations.csv / actions.csv
 * and re-run `python3 convert.py` instead.
 *
 * Each org has a list of small "actions" (real tasks), each with a time
 * cost in minutes and a mode (in_person / remote / either).
 */

const ORGS = ''')
    json.dump(out, f, indent=2)
    f.write(';\n')

print("orgs:", len(out))
print("total actions:", sum(len(o['actions']) for o in out))

# ---------------------------------------------------------------------
# events.js — built the same way from events.csv, if present
# ---------------------------------------------------------------------
try:
    with open('events.csv') as f:
        events = list(csv.DictReader(f))
except FileNotFoundError:
    events = None

if events is not None:
    ev_out = []
    for e in events:
        code = e['org_id']
        org_name = EVENT_ORG_CODES.get(code)
        org_id = name_to_id.get(org_name) if org_name else None
        if org_id is None:
            # Don't fail the whole build over one bad row — skip it and
            # say exactly which row/code needs a fix.
            print(f"WARNING: events.csv row {e['event_id']} has org_id "
                  f"'{code}' with no match in EVENT_ORG_CODES / organizations.csv "
                  f"— skipping this event. Add it to EVENT_ORG_CODES in convert.py.")
            continue

        start_h, start_m = (int(x) for x in e['start'].split(' ')[1].split(':')[:2])
        ev_out.append({
            "id": int(e['event_id']),
            "orgId": org_id,
            "t": e['title'],
            "d": e['description'],
            "off": int(e['day_offset']),
            "h": start_h,
            "m": start_m,
            "dur": int(e['duration_min']),
            "loc": e['location'],
            "kind": e['kind'],
            "signup": (e.get('signup_url') or '').strip(),
        })

    with open('events.js', 'w') as f:
        f.write('''/**
 * events.js — Chicago Civic Match calendar dataset
 * ------------------------------------------------
 * GENERATED FILE — do not hand-edit. Edit events.csv and re-run
 * `python3 convert.py` instead.
 *
 * off = days from "today" at page-load time (0 = today), so the demo
 * calendar never goes stale. orgId matches an id in ORGS (data.js) —
 * see EVENT_ORG_CODES in convert.py for the short-code mapping.
 */

const EVENTS = ''')
        json.dump(ev_out, f, indent=2)
        f.write(';\n')

    print("events:", len(ev_out))
