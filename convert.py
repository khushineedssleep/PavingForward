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

random.seed(42)

with open('/mnt/user-data/uploads/organizations.csv') as f:
    orgs = list(csv.DictReader(f))
with open('/mnt/user-data/uploads/actions.csv') as f:
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
for o in orgs:
    n = o['neighborhood']
    lat, lng = NEIGHBORHOOD_COORDS[n]
    multi_site = (n == "Chicagoland")
    if multi_site:
        # small deterministic jitter so multi-site orgs don't stack exactly
        lat += random.uniform(-0.045, 0.045)
        lng += random.uniform(-0.05, 0.05)
    out.append({
        "id": int(o['org_id']),
        "name": o['org_name'],
        "description": o['description'],
        "whoTheyServe": o['who_they_serve'],
        "causeArea": o['cause_area'],
        "neighborhood": n,
        "multiSite": multi_site,
        "address": o['address'],
        "lat": round(lat, 5),
        "lng": round(lng, 5),
        "actions": actions_by_org.get(o['org_id'], [])
    })

with open('data.json', 'w') as f:
    json.dump(out, f, indent=2)

print("orgs:", len(out))
print("total actions:", sum(len(o['actions']) for o in out))
