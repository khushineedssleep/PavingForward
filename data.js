/**
 * data.js — Chicago Civic Match dataset
 * ------------------------------------------------
 * Generated from organizations.csv + actions.csv.
 * Each org has a list of small "actions" (real tasks),
 * each with a time cost in minutes and a mode
 * (in_person / remote / either).
 *
 * To refresh this file after editing the CSVs, re-run convert.py.
 */

const ORGS = [
  {
    "id": 1,
    "name": "Greater Chicago Food Depository",
    "description": "Food bank supplying pantries and meal programs across Cook County.",
    "whoTheyServe": "Food-insecure families",
    "causeArea": "Hunger",
    "neighborhood": "Archer Heights",
    "multiSite": false,
    "address": "Archer Heights, Chicago, IL",
    "lat": 41.8103,
    "lng": -87.7256,
    "actions": [
      {
        "id": 1,
        "action": "Repack produce for distribution",
        "detail": "Sort and box fresh produce on the warehouse floor for member pantries.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 120,
        "timeLabel": "2 hr",
        "where": "in_person"
      },
      {
        "id": 2,
        "action": "Post the 'hunger isn't a choice' graphic",
        "detail": "Share their campaign post so more neighbors know free food is nearby.",
        "type": "share_message",
        "howYouHelp": "voice",
        "minutes": 2,
        "timeLabel": "2 min",
        "where": "remote"
      },
      {
        "id": 3,
        "action": "Email your county commissioner on food funding",
        "detail": "Send a two-minute note backing local hunger-relief dollars.",
        "type": "contact_official",
        "howYouHelp": "voice",
        "minutes": 5,
        "timeLabel": "5 min",
        "where": "remote"
      }
    ]
  },
  {
    "id": 2,
    "name": "Nourishing Hope",
    "description": "Food pantries plus free mental health and social services.",
    "whoTheyServe": "Food-insecure Chicagoans",
    "causeArea": "Hunger",
    "neighborhood": "Lakeview",
    "multiSite": false,
    "address": "Lakeview, Chicago, IL",
    "lat": 41.9403,
    "lng": -87.6438,
    "actions": [
      {
        "id": 4,
        "action": "Pack grocery orders",
        "detail": "Assemble personalized grocery boxes for client-choice pickup.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 150,
        "timeLabel": "2 hr 30 min",
        "where": "in_person"
      },
      {
        "id": 5,
        "action": "Run a virtual food drive",
        "detail": "Set up an online drive and rally your circle to fund groceries.",
        "type": "fundraise",
        "howYouHelp": "time",
        "minutes": 30,
        "timeLabel": "30 min",
        "where": "remote"
      },
      {
        "id": 6,
        "action": "Share the pantry finder",
        "detail": "Post the map so people know where and when to get food.",
        "type": "share_message",
        "howYouHelp": "voice",
        "minutes": 2,
        "timeLabel": "2 min",
        "where": "remote"
      }
    ]
  },
  {
    "id": 3,
    "name": "Care for Real",
    "description": "Food and clothing pantry serving the far North Side.",
    "whoTheyServe": "Neighbors in need",
    "causeArea": "Hunger",
    "neighborhood": "Edgewater",
    "multiSite": false,
    "address": "Edgewater, Chicago, IL",
    "lat": 41.985,
    "lng": -87.66,
    "actions": [
      {
        "id": 7,
        "action": "Sort clothing donations",
        "detail": "Fold, size, and shelve donated clothes for the free store.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 120,
        "timeLabel": "2 hr",
        "where": "in_person"
      },
      {
        "id": 8,
        "action": "Drop off winter coats",
        "detail": "Bring gently used coats and warm layers to the donation door.",
        "type": "donate_goods",
        "howYouHelp": "goods",
        "minutes": 20,
        "timeLabel": "20 min",
        "where": "in_person"
      },
      {
        "id": 9,
        "action": "Post their volunteer call",
        "detail": "Amplify their weekly shift openings to your neighbors.",
        "type": "share_message",
        "howYouHelp": "voice",
        "minutes": 2,
        "timeLabel": "2 min",
        "where": "remote"
      }
    ]
  },
  {
    "id": 4,
    "name": "Common Pantry",
    "description": "Chicago's longest-running food pantry, North Center.",
    "whoTheyServe": "Hungry North Side residents",
    "causeArea": "Hunger",
    "neighborhood": "North Center",
    "multiSite": false,
    "address": "North Center, Chicago, IL",
    "lat": 41.9556,
    "lng": -87.6796,
    "actions": [
      {
        "id": 10,
        "action": "Stock pantry shelves",
        "detail": "Restock and face shelves before distribution opens.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 90,
        "timeLabel": "1 hr 30 min",
        "where": "in_person"
      },
      {
        "id": 11,
        "action": "Deliver groceries to a homebound neighbor",
        "detail": "Drive a short route dropping food to people who can't travel.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 75,
        "timeLabel": "1 hr 15 min",
        "where": "in_person"
      },
      {
        "id": 12,
        "action": "Sign up for a monthly grocery gift",
        "detail": "Pledge a recurring grocery contribution online.",
        "type": "fundraise",
        "howYouHelp": "time",
        "minutes": 5,
        "timeLabel": "5 min",
        "where": "remote"
      }
    ]
  },
  {
    "id": 5,
    "name": "A Just Harvest",
    "description": "Community kitchen serving daily hot meals in Rogers Park.",
    "whoTheyServe": "Hungry Rogers Park residents",
    "causeArea": "Hunger",
    "neighborhood": "Rogers Park",
    "multiSite": false,
    "address": "Rogers Park, Chicago, IL",
    "lat": 42.01,
    "lng": -87.6685,
    "actions": [
      {
        "id": 13,
        "action": "Serve the evening meal",
        "detail": "Plate and serve dinner in the community dining room.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 180,
        "timeLabel": "3 hr",
        "where": "in_person"
      },
      {
        "id": 14,
        "action": "Prep produce in the kitchen",
        "detail": "Wash and chop vegetables for the day's meal.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 120,
        "timeLabel": "2 hr",
        "where": "in_person"
      },
      {
        "id": 15,
        "action": "Share tonight's meal count",
        "detail": "Post their impact numbers to make the need visible.",
        "type": "share_message",
        "howYouHelp": "voice",
        "minutes": 2,
        "timeLabel": "2 min",
        "where": "remote"
      }
    ]
  },
  {
    "id": 6,
    "name": "Food Rescue US - Chicago",
    "description": "Rescues surplus food and delivers it to those who need it.",
    "whoTheyServe": "Hungry Chicagoans",
    "causeArea": "Hunger",
    "neighborhood": "Chicagoland",
    "multiSite": true,
    "address": "Chicagoland (multiple sites)",
    "lat": 41.89615,
    "lng": -87.6799,
    "actions": [
      {
        "id": 16,
        "action": "Drive one food rescue",
        "detail": "Pick up surplus from a restaurant and drop it at a shelter.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 45,
        "timeLabel": "45 min",
        "where": "in_person"
      },
      {
        "id": 17,
        "action": "Claim a recurring weekly rescue",
        "detail": "Commit to a standing pickup route through the app.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 45,
        "timeLabel": "45 min",
        "where": "either"
      },
      {
        "id": 18,
        "action": "Recruit a restaurant",
        "detail": "Ask a local spot to donate surplus instead of tossing it.",
        "type": "skilled_task",
        "howYouHelp": "skill",
        "minutes": 30,
        "timeLabel": "30 min",
        "where": "either"
      }
    ]
  },
  {
    "id": 7,
    "name": "The Night Ministry",
    "description": "Mobile outreach with housing, health care, and human connection.",
    "whoTheyServe": "People experiencing homelessness",
    "causeArea": "Homelessness",
    "neighborhood": "North Side",
    "multiSite": false,
    "address": "North Side, Chicago, IL",
    "lat": 41.9796,
    "lng": -87.672,
    "actions": [
      {
        "id": 19,
        "action": "Assemble hygiene kits",
        "detail": "Build kits with soap, socks, and essentials for the outreach bus.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 90,
        "timeLabel": "1 hr 30 min",
        "where": "in_person"
      },
      {
        "id": 20,
        "action": "Donate new socks and toiletries",
        "detail": "Drop off packaged hygiene supplies for street outreach.",
        "type": "donate_goods",
        "howYouHelp": "goods",
        "minutes": 15,
        "timeLabel": "15 min",
        "where": "in_person"
      },
      {
        "id": 21,
        "action": "Post the outreach schedule",
        "detail": "Share where the health bus will be this week.",
        "type": "share_message",
        "howYouHelp": "voice",
        "minutes": 2,
        "timeLabel": "2 min",
        "where": "remote"
      }
    ]
  },
  {
    "id": 8,
    "name": "Chicago Coalition for the Homeless",
    "description": "Advocacy and organizing to end homelessness.",
    "whoTheyServe": "Unhoused Chicagoans",
    "causeArea": "Homelessness",
    "neighborhood": "Loop",
    "multiSite": false,
    "address": "Loop, Chicago, IL",
    "lat": 41.8827,
    "lng": -87.6298,
    "actions": [
      {
        "id": 22,
        "action": "Call your state rep on housing funding",
        "detail": "Two-minute call urging support for homelessness prevention dollars.",
        "type": "contact_official",
        "howYouHelp": "voice",
        "minutes": 3,
        "timeLabel": "3 min",
        "where": "remote"
      },
      {
        "id": 23,
        "action": "Sign the housing-is-a-right petition",
        "detail": "Add your name to their statewide petition.",
        "type": "sign_petition",
        "howYouHelp": "voice",
        "minutes": 2,
        "timeLabel": "2 min",
        "where": "remote"
      },
      {
        "id": 24,
        "action": "Join a lobby day in Springfield",
        "detail": "Ride along to meet legislators on housing bills.",
        "type": "attend_event",
        "howYouHelp": "time",
        "minutes": 240,
        "timeLabel": "4 hr",
        "where": "in_person"
      }
    ]
  },
  {
    "id": 9,
    "name": "La Casa Norte",
    "description": "Housing and wraparound services for youth and families.",
    "whoTheyServe": "Youth and families facing homelessness",
    "causeArea": "Homelessness",
    "neighborhood": "Humboldt Park",
    "multiSite": false,
    "address": "Humboldt Park, Chicago, IL",
    "lat": 41.9042,
    "lng": -87.7014,
    "actions": [
      {
        "id": 25,
        "action": "Stock the community market",
        "detail": "Shelve food and goods in their free client market.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 120,
        "timeLabel": "2 hr",
        "where": "in_person"
      },
      {
        "id": 26,
        "action": "Host a supply drive",
        "detail": "Collect hygiene and household items with your group.",
        "type": "donate_goods",
        "howYouHelp": "time",
        "minutes": 60,
        "timeLabel": "1 hr",
        "where": "either"
      },
      {
        "id": 27,
        "action": "Share a youth's story",
        "detail": "Amplify a client story to build support.",
        "type": "share_message",
        "howYouHelp": "voice",
        "minutes": 2,
        "timeLabel": "2 min",
        "where": "remote"
      }
    ]
  },
  {
    "id": 10,
    "name": "Breakthrough",
    "description": "Housing, food, and workforce support on the West Side.",
    "whoTheyServe": "West Side neighbors in crisis",
    "causeArea": "Homelessness",
    "neighborhood": "East Garfield Park",
    "multiSite": false,
    "address": "East Garfield Park, Chicago, IL",
    "lat": 41.8814,
    "lng": -87.7086,
    "actions": [
      {
        "id": 28,
        "action": "Serve in the fresh market",
        "detail": "Help neighbors shop the free grocery market with dignity.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 120,
        "timeLabel": "2 hr",
        "where": "in_person"
      },
      {
        "id": 29,
        "action": "Mock-interview a job seeker",
        "detail": "Run a practice interview and give feedback.",
        "type": "skilled_task",
        "howYouHelp": "skill",
        "minutes": 60,
        "timeLabel": "1 hr",
        "where": "either"
      },
      {
        "id": 30,
        "action": "Tutor an adult learner",
        "detail": "Support GED or workforce prep one on one.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 90,
        "timeLabel": "1 hr 30 min",
        "where": "in_person"
      }
    ]
  },
  {
    "id": 11,
    "name": "Franciscan Outreach",
    "description": "Emergency shelter and daily meals.",
    "whoTheyServe": "People experiencing homelessness",
    "causeArea": "Homelessness",
    "neighborhood": "Humboldt Park",
    "multiSite": false,
    "address": "Humboldt Park, Chicago, IL",
    "lat": 41.9042,
    "lng": -87.7014,
    "actions": [
      {
        "id": 31,
        "action": "Cook and serve a shelter meal",
        "detail": "Prepare and serve dinner for shelter guests.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 180,
        "timeLabel": "3 hr",
        "where": "in_person"
      },
      {
        "id": 32,
        "action": "Sponsor a night of meals",
        "detail": "Fund one evening's dinner service online.",
        "type": "fundraise",
        "howYouHelp": "time",
        "minutes": 5,
        "timeLabel": "5 min",
        "where": "remote"
      },
      {
        "id": 33,
        "action": "Post the meal-team sign-up",
        "detail": "Share their group volunteer openings.",
        "type": "share_message",
        "howYouHelp": "voice",
        "minutes": 2,
        "timeLabel": "2 min",
        "where": "remote"
      }
    ]
  },
  {
    "id": 12,
    "name": "RefugeeOne",
    "description": "Resettles refugees and helps them build new lives.",
    "whoTheyServe": "Refugees and asylees",
    "causeArea": "Immigration",
    "neighborhood": "Uptown",
    "multiSite": false,
    "address": "Uptown, Chicago, IL",
    "lat": 41.9664,
    "lng": -87.6551,
    "actions": [
      {
        "id": 34,
        "action": "Set up a new family's apartment",
        "detail": "Furnish and stock a home before a family arrives.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 180,
        "timeLabel": "3 hr",
        "where": "in_person"
      },
      {
        "id": 35,
        "action": "Be a weekly conversation partner",
        "detail": "Practice English with a newcomer over coffee.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 60,
        "timeLabel": "1 hr",
        "where": "either"
      },
      {
        "id": 36,
        "action": "Donate a welcome kit",
        "detail": "Provide kitchenware and linens for an arriving family.",
        "type": "donate_goods",
        "howYouHelp": "goods",
        "minutes": 30,
        "timeLabel": "30 min",
        "where": "in_person"
      }
    ]
  },
  {
    "id": 13,
    "name": "National Immigrant Justice Center",
    "description": "Legal aid and advocacy for immigrants.",
    "whoTheyServe": "Immigrants and asylum seekers",
    "causeArea": "Immigration",
    "neighborhood": "Loop",
    "multiSite": false,
    "address": "Loop, Chicago, IL",
    "lat": 41.8827,
    "lng": -87.6298,
    "actions": [
      {
        "id": 37,
        "action": "Call your senator on immigrant protections",
        "detail": "Two-minute call urging humane immigration policy.",
        "type": "contact_official",
        "howYouHelp": "voice",
        "minutes": 3,
        "timeLabel": "3 min",
        "where": "remote"
      },
      {
        "id": 38,
        "action": "Translate an intake document",
        "detail": "Help translate forms for a Spanish or Creole speaker.",
        "type": "skilled_task",
        "howYouHelp": "skill",
        "minutes": 90,
        "timeLabel": "1 hr 30 min",
        "where": "remote"
      },
      {
        "id": 39,
        "action": "Share a know-your-rights card",
        "detail": "Post the printable rights card so people are prepared.",
        "type": "share_message",
        "howYouHelp": "voice",
        "minutes": 2,
        "timeLabel": "2 min",
        "where": "remote"
      }
    ]
  },
  {
    "id": 14,
    "name": "Erie Neighborhood House",
    "description": "Education and support for immigrant families.",
    "whoTheyServe": "Immigrant families",
    "causeArea": "Immigration",
    "neighborhood": "West Town",
    "multiSite": false,
    "address": "West Town, Chicago, IL",
    "lat": 41.9022,
    "lng": -87.6805,
    "actions": [
      {
        "id": 40,
        "action": "Help at citizenship class",
        "detail": "Assist adults preparing for the naturalization test.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 90,
        "timeLabel": "1 hr 30 min",
        "where": "in_person"
      },
      {
        "id": 41,
        "action": "Tutor a child after school",
        "detail": "Support homework and reading with a young student.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 75,
        "timeLabel": "1 hr 15 min",
        "where": "in_person"
      },
      {
        "id": 42,
        "action": "Sign up to interpret",
        "detail": "Offer on-call interpretation in your language.",
        "type": "skilled_task",
        "howYouHelp": "skill",
        "minutes": 10,
        "timeLabel": "10 min",
        "where": "either"
      }
    ]
  },
  {
    "id": 15,
    "name": "Instituto del Progreso Latino",
    "description": "Education and workforce training for Latino immigrants.",
    "whoTheyServe": "Latino immigrants",
    "causeArea": "Immigration",
    "neighborhood": "Pilsen",
    "multiSite": false,
    "address": "Pilsen, Chicago, IL",
    "lat": 41.8564,
    "lng": -87.6564,
    "actions": [
      {
        "id": 43,
        "action": "Coach resume writing",
        "detail": "Help a job seeker sharpen their resume.",
        "type": "skilled_task",
        "howYouHelp": "skill",
        "minutes": 60,
        "timeLabel": "1 hr",
        "where": "either"
      },
      {
        "id": 44,
        "action": "Judge a student pitch night",
        "detail": "Give feedback at a workforce program showcase.",
        "type": "attend_event",
        "howYouHelp": "time",
        "minutes": 120,
        "timeLabel": "2 hr",
        "where": "in_person"
      },
      {
        "id": 45,
        "action": "Share a scholarship link",
        "detail": "Amplify a program opening to eligible neighbors.",
        "type": "share_message",
        "howYouHelp": "voice",
        "minutes": 2,
        "timeLabel": "2 min",
        "where": "remote"
      }
    ]
  },
  {
    "id": 16,
    "name": "World Relief Chicagoland",
    "description": "Refugee resettlement and welcome across the region.",
    "whoTheyServe": "Refugees",
    "causeArea": "Immigration",
    "neighborhood": "Chicagoland",
    "multiSite": true,
    "address": "Chicagoland (multiple sites)",
    "lat": 41.86335,
    "lng": -87.66008,
    "actions": [
      {
        "id": 46,
        "action": "Join an airport welcome team",
        "detail": "Greet a newly arriving refugee family.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 120,
        "timeLabel": "2 hr",
        "where": "in_person"
      },
      {
        "id": 47,
        "action": "Mentor a family for a season",
        "detail": "Commit to monthly support as a family settles in.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 90,
        "timeLabel": "1 hr 30 min",
        "where": "either"
      },
      {
        "id": 48,
        "action": "Collect household goods",
        "detail": "Gather furniture and kitchen basics with your group.",
        "type": "donate_goods",
        "howYouHelp": "time",
        "minutes": 60,
        "timeLabel": "1 hr",
        "where": "either"
      }
    ]
  },
  {
    "id": 17,
    "name": "Cradles to Crayons",
    "description": "Provides essentials to kids living in poverty.",
    "whoTheyServe": "Children living in poverty",
    "causeArea": "Youth",
    "neighborhood": "Chicagoland",
    "multiSite": true,
    "address": "Chicagoland (multiple sites)",
    "lat": 41.90488,
    "lng": -87.61473,
    "actions": [
      {
        "id": 49,
        "action": "Sort kids' clothing and books",
        "detail": "Inspect and pack donated children's items.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 120,
        "timeLabel": "2 hr",
        "where": "in_person"
      },
      {
        "id": 50,
        "action": "Run a diaper drive",
        "detail": "Collect diapers and wipes with your office or block.",
        "type": "donate_goods",
        "howYouHelp": "time",
        "minutes": 45,
        "timeLabel": "45 min",
        "where": "either"
      },
      {
        "id": 51,
        "action": "Share the essentials wishlist",
        "detail": "Post their current needs list to your network.",
        "type": "share_message",
        "howYouHelp": "voice",
        "minutes": 2,
        "timeLabel": "2 min",
        "where": "remote"
      }
    ]
  },
  {
    "id": 18,
    "name": "After School Matters",
    "description": "Paid teen programs in arts, sports, and STEM.",
    "whoTheyServe": "Chicago teens",
    "causeArea": "Youth",
    "neighborhood": "Loop",
    "multiSite": false,
    "address": "Loop, Chicago, IL",
    "lat": 41.8827,
    "lng": -87.6298,
    "actions": [
      {
        "id": 52,
        "action": "Guest-speak about your career",
        "detail": "Tell teens how you got into your field.",
        "type": "attend_event",
        "howYouHelp": "time",
        "minutes": 60,
        "timeLabel": "1 hr",
        "where": "either"
      },
      {
        "id": 53,
        "action": "Judge a teen showcase",
        "detail": "Score final projects at a program expo.",
        "type": "attend_event",
        "howYouHelp": "time",
        "minutes": 120,
        "timeLabel": "2 hr",
        "where": "in_person"
      },
      {
        "id": 54,
        "action": "Share a teen apprenticeship link",
        "detail": "Help a teenager you know find a paid spot.",
        "type": "share_message",
        "howYouHelp": "voice",
        "minutes": 2,
        "timeLabel": "2 min",
        "where": "remote"
      }
    ]
  },
  {
    "id": 19,
    "name": "Open Books",
    "description": "Literacy programs powered by a used bookstore.",
    "whoTheyServe": "Young readers",
    "causeArea": "Youth",
    "neighborhood": "West Loop",
    "multiSite": false,
    "address": "West Loop, Chicago, IL",
    "lat": 41.8853,
    "lng": -87.6522,
    "actions": [
      {
        "id": 55,
        "action": "Shelve donated books",
        "detail": "Sort and shelve inventory in the nonprofit bookstore.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 120,
        "timeLabel": "2 hr",
        "where": "in_person"
      },
      {
        "id": 56,
        "action": "Read one-on-one with a student",
        "detail": "Support a young reader during a literacy session.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 90,
        "timeLabel": "1 hr 30 min",
        "where": "in_person"
      },
      {
        "id": 57,
        "action": "Donate gently used books",
        "detail": "Drop off books to fund literacy programming.",
        "type": "donate_goods",
        "howYouHelp": "goods",
        "minutes": 15,
        "timeLabel": "15 min",
        "where": "in_person"
      }
    ]
  },
  {
    "id": 20,
    "name": "Chicago HOPES for Kids",
    "description": "Tutoring and enrichment for kids in shelters.",
    "whoTheyServe": "Kids living in shelters",
    "causeArea": "Youth",
    "neighborhood": "Chicagoland",
    "multiSite": true,
    "address": "Chicagoland (multiple sites)",
    "lat": 41.9189,
    "lng": -87.67371,
    "actions": [
      {
        "id": 58,
        "action": "Tutor in a shelter homework lab",
        "detail": "Help kids with reading and math after school.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 90,
        "timeLabel": "1 hr 30 min",
        "where": "in_person"
      },
      {
        "id": 59,
        "action": "Assemble a birthday kit",
        "detail": "Build a birthday-in-a-box for a child in a shelter.",
        "type": "donate_goods",
        "howYouHelp": "time",
        "minutes": 30,
        "timeLabel": "30 min",
        "where": "either"
      },
      {
        "id": 60,
        "action": "Share the tutor recruitment post",
        "detail": "Help them find more volunteers this term.",
        "type": "share_message",
        "howYouHelp": "voice",
        "minutes": 2,
        "timeLabel": "2 min",
        "where": "remote"
      }
    ]
  },
  {
    "id": 21,
    "name": "Marwen",
    "description": "Free art education for under-resourced youth.",
    "whoTheyServe": "Under-resourced youth",
    "causeArea": "Arts",
    "neighborhood": "River North",
    "multiSite": false,
    "address": "River North, Chicago, IL",
    "lat": 41.8919,
    "lng": -87.6343,
    "actions": [
      {
        "id": 61,
        "action": "Help hang a student art show",
        "detail": "Prep and install work for a youth exhibition.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 120,
        "timeLabel": "2 hr",
        "where": "in_person"
      },
      {
        "id": 62,
        "action": "Mentor a teen artist",
        "detail": "Share your creative career over a studio visit.",
        "type": "skilled_task",
        "howYouHelp": "skill",
        "minutes": 60,
        "timeLabel": "1 hr",
        "where": "either"
      },
      {
        "id": 63,
        "action": "Donate art supplies",
        "detail": "Drop off new supplies for the studios.",
        "type": "donate_goods",
        "howYouHelp": "goods",
        "minutes": 20,
        "timeLabel": "20 min",
        "where": "in_person"
      }
    ]
  },
  {
    "id": 22,
    "name": "Mikva Challenge",
    "description": "Civic education that puts young people in the action.",
    "whoTheyServe": "Young people",
    "causeArea": "Civic",
    "neighborhood": "Loop",
    "multiSite": false,
    "address": "Loop, Chicago, IL",
    "lat": 41.8827,
    "lng": -87.6298,
    "actions": [
      {
        "id": 64,
        "action": "Judge a youth policy pitch",
        "detail": "Give feedback as teens present real policy ideas.",
        "type": "attend_event",
        "howYouHelp": "time",
        "minutes": 120,
        "timeLabel": "2 hr",
        "where": "in_person"
      },
      {
        "id": 65,
        "action": "Share a youth voter reg drive",
        "detail": "Amplify a student-led registration event.",
        "type": "share_message",
        "howYouHelp": "voice",
        "minutes": 2,
        "timeLabel": "2 min",
        "where": "remote"
      },
      {
        "id": 66,
        "action": "Sponsor a student's civic trip",
        "detail": "Fund a young person's trip to a civic event.",
        "type": "fundraise",
        "howYouHelp": "time",
        "minutes": 5,
        "timeLabel": "5 min",
        "where": "remote"
      }
    ]
  },
  {
    "id": 23,
    "name": "NAMI Chicago",
    "description": "Mental health support, education, and a helpline.",
    "whoTheyServe": "People affected by mental illness",
    "causeArea": "Health",
    "neighborhood": "Chicagoland",
    "multiSite": true,
    "address": "Chicagoland (multiple sites)",
    "lat": 41.87657,
    "lng": -87.67942,
    "actions": [
      {
        "id": 67,
        "action": "Staff a resource fair table",
        "detail": "Share mental health resources at a community event.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 180,
        "timeLabel": "3 hr",
        "where": "in_person"
      },
      {
        "id": 68,
        "action": "Take the helpline training",
        "detail": "Train to support callers on the mental health line.",
        "type": "skilled_task",
        "howYouHelp": "skill",
        "minutes": 240,
        "timeLabel": "4 hr",
        "where": "either"
      },
      {
        "id": 69,
        "action": "Share the helpline number",
        "detail": "Post the free support line so people know it exists.",
        "type": "share_message",
        "howYouHelp": "voice",
        "minutes": 2,
        "timeLabel": "2 min",
        "where": "remote"
      }
    ]
  },
  {
    "id": 24,
    "name": "Howard Brown Health",
    "description": "LGBTQ+ focused health care and services.",
    "whoTheyServe": "LGBTQ+ Chicagoans",
    "causeArea": "Health",
    "neighborhood": "Uptown",
    "multiSite": false,
    "address": "Uptown, Chicago, IL",
    "lat": 41.9664,
    "lng": -87.6551,
    "actions": [
      {
        "id": 70,
        "action": "Volunteer at a health event",
        "detail": "Help run intake or logistics at a wellness pop-up.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 120,
        "timeLabel": "2 hr",
        "where": "in_person"
      },
      {
        "id": 71,
        "action": "Sort the food pantry (Brown Elephant)",
        "detail": "Organize donations at their resale-funded pantry.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 90,
        "timeLabel": "1 hr 30 min",
        "where": "in_person"
      },
      {
        "id": 72,
        "action": "Share sexual-health resources",
        "detail": "Amplify free testing and care info.",
        "type": "share_message",
        "howYouHelp": "voice",
        "minutes": 2,
        "timeLabel": "2 min",
        "where": "remote"
      }
    ]
  },
  {
    "id": 25,
    "name": "Heartland Alliance",
    "description": "Health, housing, and human rights for the marginalized.",
    "whoTheyServe": "Poor and marginalized people",
    "causeArea": "Health",
    "neighborhood": "Chicagoland",
    "multiSite": true,
    "address": "Chicagoland (multiple sites)",
    "lat": 41.85828,
    "lng": -87.63186,
    "actions": [
      {
        "id": 73,
        "action": "Assemble care packages",
        "detail": "Pack essentials for people in transitional housing.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 120,
        "timeLabel": "2 hr",
        "where": "in_person"
      },
      {
        "id": 74,
        "action": "Call on anti-poverty funding",
        "detail": "Urge your rep to protect safety-net programs.",
        "type": "contact_official",
        "howYouHelp": "voice",
        "minutes": 5,
        "timeLabel": "5 min",
        "where": "remote"
      },
      {
        "id": 75,
        "action": "Share a policy explainer",
        "detail": "Post their brief on a current safety-net issue.",
        "type": "share_message",
        "howYouHelp": "voice",
        "minutes": 2,
        "timeLabel": "2 min",
        "where": "remote"
      }
    ]
  },
  {
    "id": 26,
    "name": "Little Brothers - Friends of the Elderly",
    "description": "Companionship and support for isolated seniors.",
    "whoTheyServe": "Isolated seniors",
    "causeArea": "Seniors",
    "neighborhood": "Bucktown",
    "multiSite": false,
    "address": "Bucktown, Chicago, IL",
    "lat": 41.9214,
    "lng": -87.6779,
    "actions": [
      {
        "id": 76,
        "action": "Visit a senior weekly",
        "detail": "Build a friendship through regular visits.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 90,
        "timeLabel": "1 hr 30 min",
        "where": "either"
      },
      {
        "id": 77,
        "action": "Make a friendly phone call",
        "detail": "Check in by phone with an isolated elder.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 20,
        "timeLabel": "20 min",
        "where": "remote"
      },
      {
        "id": 78,
        "action": "Deliver a holiday meal",
        "detail": "Bring a warm meal and company on a holiday.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 120,
        "timeLabel": "2 hr",
        "where": "in_person"
      }
    ]
  },
  {
    "id": 27,
    "name": "CJE SeniorLife",
    "description": "Comprehensive services for older adults.",
    "whoTheyServe": "Older adults",
    "causeArea": "Seniors",
    "neighborhood": "West Rogers Park",
    "multiSite": false,
    "address": "West Rogers Park, Chicago, IL",
    "lat": 42.0028,
    "lng": -87.6976,
    "actions": [
      {
        "id": 79,
        "action": "Lead a virtual activity",
        "detail": "Host a class or game session for seniors online.",
        "type": "skilled_task",
        "howYouHelp": "skill",
        "minutes": 45,
        "timeLabel": "45 min",
        "where": "remote"
      },
      {
        "id": 80,
        "action": "Drive a senior to an appointment",
        "detail": "Provide a ride to a medical visit.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 90,
        "timeLabel": "1 hr 30 min",
        "where": "in_person"
      },
      {
        "id": 81,
        "action": "Share caregiver resources",
        "detail": "Post support info for family caregivers.",
        "type": "share_message",
        "howYouHelp": "voice",
        "minutes": 2,
        "timeLabel": "2 min",
        "where": "remote"
      }
    ]
  },
  {
    "id": 28,
    "name": "Meals on Wheels Chicago",
    "description": "Meal delivery and connection for homebound seniors.",
    "whoTheyServe": "Homebound seniors",
    "causeArea": "Seniors",
    "neighborhood": "Chicagoland",
    "multiSite": true,
    "address": "Chicagoland (multiple sites)",
    "lat": 41.84099,
    "lng": -87.66252,
    "actions": [
      {
        "id": 82,
        "action": "Deliver meals on a route",
        "detail": "Drop off meals and check in on homebound seniors.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 90,
        "timeLabel": "1 hr 30 min",
        "where": "in_person"
      },
      {
        "id": 83,
        "action": "Pack pet food for seniors' pets",
        "detail": "Bag pet meals so seniors keep their companions.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 60,
        "timeLabel": "1 hr",
        "where": "in_person"
      },
      {
        "id": 84,
        "action": "Fund a week of meals",
        "detail": "Sponsor seven days of meals for one senior.",
        "type": "fundraise",
        "howYouHelp": "time",
        "minutes": 5,
        "timeLabel": "5 min",
        "where": "remote"
      }
    ]
  },
  {
    "id": 29,
    "name": "PAWS Chicago",
    "description": "No-kill shelter and adoption center.",
    "whoTheyServe": "Homeless pets",
    "causeArea": "Animals",
    "neighborhood": "Lincoln Park",
    "multiSite": false,
    "address": "Lincoln Park, Chicago, IL",
    "lat": 41.9214,
    "lng": -87.6513,
    "actions": [
      {
        "id": 85,
        "action": "Walk and socialize dogs",
        "detail": "Give shelter dogs exercise and affection.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 120,
        "timeLabel": "2 hr",
        "where": "in_person"
      },
      {
        "id": 86,
        "action": "Foster a pet",
        "detail": "Take a cat or dog home until it's adopted.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 60,
        "timeLabel": "1 hr",
        "where": "either"
      },
      {
        "id": 87,
        "action": "Share an adoptable pet",
        "detail": "Post a pet's profile to help it find a home.",
        "type": "share_message",
        "howYouHelp": "voice",
        "minutes": 2,
        "timeLabel": "2 min",
        "where": "remote"
      }
    ]
  },
  {
    "id": 30,
    "name": "The Anti-Cruelty Society",
    "description": "Shelter, adoption, and animal welfare since 1899.",
    "whoTheyServe": "Animals in need",
    "causeArea": "Animals",
    "neighborhood": "River North",
    "multiSite": false,
    "address": "River North, Chicago, IL",
    "lat": 41.8919,
    "lng": -87.6343,
    "actions": [
      {
        "id": 88,
        "action": "Do laundry and dishes for the shelter",
        "detail": "Handle behind-the-scenes chores that keep animals clean.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 90,
        "timeLabel": "1 hr 30 min",
        "where": "in_person"
      },
      {
        "id": 89,
        "action": "Donate towels and blankets",
        "detail": "Drop off gently used linens for animal bedding.",
        "type": "donate_goods",
        "howYouHelp": "goods",
        "minutes": 15,
        "timeLabel": "15 min",
        "where": "in_person"
      },
      {
        "id": 90,
        "action": "Share the low-cost clinic",
        "detail": "Post affordable vet-care info for pet owners.",
        "type": "share_message",
        "howYouHelp": "voice",
        "minutes": 2,
        "timeLabel": "2 min",
        "where": "remote"
      }
    ]
  },
  {
    "id": 31,
    "name": "Tree House Humane Society",
    "description": "Cageless cat rescue and adoption.",
    "whoTheyServe": "Homeless cats",
    "causeArea": "Animals",
    "neighborhood": "Uptown",
    "multiSite": false,
    "address": "Uptown, Chicago, IL",
    "lat": 41.9664,
    "lng": -87.6551,
    "actions": [
      {
        "id": 91,
        "action": "Socialize shy cats",
        "detail": "Spend time helping fearful cats trust people.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 90,
        "timeLabel": "1 hr 30 min",
        "where": "in_person"
      },
      {
        "id": 92,
        "action": "Join a TNR (trap-neuter-return) team",
        "detail": "Help humanely manage community cat colonies.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 180,
        "timeLabel": "3 hr",
        "where": "in_person"
      },
      {
        "id": 93,
        "action": "Share a special-needs cat",
        "detail": "Amplify a hard-to-place cat's adoption profile.",
        "type": "share_message",
        "howYouHelp": "voice",
        "minutes": 2,
        "timeLabel": "2 min",
        "where": "remote"
      }
    ]
  },
  {
    "id": 32,
    "name": "Friends of the Chicago River",
    "description": "Protects and restores the Chicago River system.",
    "whoTheyServe": "The Chicago River and public",
    "causeArea": "Environment",
    "neighborhood": "Chicagoland",
    "multiSite": true,
    "address": "Chicagoland (multiple sites)",
    "lat": 41.89709,
    "lng": -87.62791,
    "actions": [
      {
        "id": 94,
        "action": "Join a river cleanup",
        "detail": "Pull trash and invasive plants from the riverbank.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 180,
        "timeLabel": "3 hr",
        "where": "in_person"
      },
      {
        "id": 95,
        "action": "Log a wildlife sighting",
        "detail": "Report birds or turtles you see to their monitoring project.",
        "type": "community_science",
        "howYouHelp": "voice",
        "minutes": 10,
        "timeLabel": "10 min",
        "where": "either"
      },
      {
        "id": 96,
        "action": "Comment on a river-quality rule",
        "detail": "Submit a public comment supporting clean-water standards.",
        "type": "contact_official",
        "howYouHelp": "voice",
        "minutes": 10,
        "timeLabel": "10 min",
        "where": "remote"
      }
    ]
  },
  {
    "id": 33,
    "name": "Openlands",
    "description": "Protects natural and open spaces across the region.",
    "whoTheyServe": "Chicago's natural areas",
    "causeArea": "Environment",
    "neighborhood": "Loop",
    "multiSite": false,
    "address": "Loop, Chicago, IL",
    "lat": 41.8827,
    "lng": -87.6298,
    "actions": [
      {
        "id": 97,
        "action": "Plant trees on a work day",
        "detail": "Dig and plant on a neighborhood tree event.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 180,
        "timeLabel": "3 hr",
        "where": "in_person"
      },
      {
        "id": 98,
        "action": "Become a TreeKeeper",
        "detail": "Train to care for and advocate for urban trees.",
        "type": "skilled_task",
        "howYouHelp": "skill",
        "minutes": 240,
        "timeLabel": "4 hr",
        "where": "in_person"
      },
      {
        "id": 99,
        "action": "Sign the open-space petition",
        "detail": "Back protection for a threatened natural area.",
        "type": "sign_petition",
        "howYouHelp": "voice",
        "minutes": 2,
        "timeLabel": "2 min",
        "where": "remote"
      }
    ]
  },
  {
    "id": 34,
    "name": "Shedd Aquarium",
    "description": "Aquatic conservation, education, and rescue.",
    "whoTheyServe": "Aquatic life and the public",
    "causeArea": "Environment",
    "neighborhood": "Museum Campus",
    "multiSite": false,
    "address": "Museum Campus, Chicago, IL",
    "lat": 41.8623,
    "lng": -87.6167,
    "actions": [
      {
        "id": 100,
        "action": "Join a beach cleanup",
        "detail": "Clear plastic and debris from a Lake Michigan shoreline.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 120,
        "timeLabel": "2 hr",
        "where": "in_person"
      },
      {
        "id": 101,
        "action": "Do the Great Lakes action pledge",
        "detail": "Commit to plastic-reduction steps at home.",
        "type": "sign_petition",
        "howYouHelp": "voice",
        "minutes": 5,
        "timeLabel": "5 min",
        "where": "remote"
      },
      {
        "id": 102,
        "action": "Share a conservation tip",
        "detail": "Post one action people can take for the lakes.",
        "type": "share_message",
        "howYouHelp": "voice",
        "minutes": 2,
        "timeLabel": "2 min",
        "where": "remote"
      }
    ]
  },
  {
    "id": 35,
    "name": "Between Friends",
    "description": "Breaks the cycle of domestic violence.",
    "whoTheyServe": "Survivors of abuse",
    "causeArea": "Safety",
    "neighborhood": "Chicagoland",
    "multiSite": true,
    "address": "Chicagoland (multiple sites)",
    "lat": 41.85844,
    "lng": -87.62347,
    "actions": [
      {
        "id": 103,
        "action": "Assemble safety-kit bags",
        "detail": "Pack essentials for survivors leaving crisis.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 90,
        "timeLabel": "1 hr 30 min",
        "where": "in_person"
      },
      {
        "id": 104,
        "action": "Take the DV awareness training",
        "detail": "Learn to recognize and respond to abuse.",
        "type": "skilled_task",
        "howYouHelp": "skill",
        "minutes": 120,
        "timeLabel": "2 hr",
        "where": "either"
      },
      {
        "id": 105,
        "action": "Share the 24-hour hotline",
        "detail": "Post the confidential help line widely.",
        "type": "share_message",
        "howYouHelp": "voice",
        "minutes": 2,
        "timeLabel": "2 min",
        "where": "remote"
      }
    ]
  },
  {
    "id": 36,
    "name": "Apna Ghar",
    "description": "Domestic violence services for immigrant survivors.",
    "whoTheyServe": "Immigrant survivors",
    "causeArea": "Safety",
    "neighborhood": "Uptown",
    "multiSite": false,
    "address": "Uptown, Chicago, IL",
    "lat": 41.9664,
    "lng": -87.6551,
    "actions": [
      {
        "id": 106,
        "action": "Offer language interpretation",
        "detail": "Interpret for a survivor in your language.",
        "type": "skilled_task",
        "howYouHelp": "skill",
        "minutes": 30,
        "timeLabel": "30 min",
        "where": "either"
      },
      {
        "id": 107,
        "action": "Donate grocery gift cards",
        "detail": "Provide gift cards for families rebuilding.",
        "type": "donate_goods",
        "howYouHelp": "goods",
        "minutes": 10,
        "timeLabel": "10 min",
        "where": "remote"
      },
      {
        "id": 108,
        "action": "Share culturally-specific resources",
        "detail": "Amplify help info for immigrant communities.",
        "type": "share_message",
        "howYouHelp": "voice",
        "minutes": 2,
        "timeLabel": "2 min",
        "where": "remote"
      }
    ]
  },
  {
    "id": 37,
    "name": "Connections for Abused Women and their Children",
    "description": "Shelter and support for survivors and kids.",
    "whoTheyServe": "Survivors and their children",
    "causeArea": "Safety",
    "neighborhood": "Humboldt Park",
    "multiSite": false,
    "address": "Humboldt Park, Chicago, IL",
    "lat": 41.9042,
    "lng": -87.7014,
    "actions": [
      {
        "id": 109,
        "action": "Play with kids at the shelter",
        "detail": "Give children a fun, safe hour while parents get help.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 120,
        "timeLabel": "2 hr",
        "where": "in_person"
      },
      {
        "id": 110,
        "action": "Sort donated household goods",
        "detail": "Organize items for families setting up new homes.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 90,
        "timeLabel": "1 hr 30 min",
        "where": "in_person"
      },
      {
        "id": 111,
        "action": "Call on DV funding",
        "detail": "Urge legislators to fund shelters and hotlines.",
        "type": "contact_official",
        "howYouHelp": "voice",
        "minutes": 5,
        "timeLabel": "5 min",
        "where": "remote"
      }
    ]
  },
  {
    "id": 38,
    "name": "Chicago Books to Women in Prison",
    "description": "Sends free books to incarcerated women.",
    "whoTheyServe": "Incarcerated women",
    "causeArea": "Justice",
    "neighborhood": "Pilsen",
    "multiSite": false,
    "address": "Pilsen, Chicago, IL",
    "lat": 41.8564,
    "lng": -87.6564,
    "actions": [
      {
        "id": 112,
        "action": "Pack book requests",
        "detail": "Match donated books to letters and prep them to mail.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 120,
        "timeLabel": "2 hr",
        "where": "in_person"
      },
      {
        "id": 113,
        "action": "Donate paperbacks",
        "detail": "Drop off requested titles like dictionaries and novels.",
        "type": "donate_goods",
        "howYouHelp": "goods",
        "minutes": 15,
        "timeLabel": "15 min",
        "where": "either"
      },
      {
        "id": 114,
        "action": "Sponsor postage",
        "detail": "Fund shipping so more books get mailed.",
        "type": "fundraise",
        "howYouHelp": "time",
        "minutes": 5,
        "timeLabel": "5 min",
        "where": "remote"
      }
    ]
  },
  {
    "id": 39,
    "name": "Access Living",
    "description": "Disability rights, services, and independent living.",
    "whoTheyServe": "People with disabilities",
    "causeArea": "Disability",
    "neighborhood": "West Loop",
    "multiSite": false,
    "address": "West Loop, Chicago, IL",
    "lat": 41.8853,
    "lng": -87.6522,
    "actions": [
      {
        "id": 115,
        "action": "Call on accessible-transit funding",
        "detail": "Urge support for accessible public transit.",
        "type": "contact_official",
        "howYouHelp": "voice",
        "minutes": 5,
        "timeLabel": "5 min",
        "where": "remote"
      },
      {
        "id": 116,
        "action": "Help at an accessibility audit",
        "detail": "Assess a public space for barriers with their team.",
        "type": "skilled_task",
        "howYouHelp": "skill",
        "minutes": 120,
        "timeLabel": "2 hr",
        "where": "in_person"
      },
      {
        "id": 117,
        "action": "Share a disability-rights alert",
        "detail": "Amplify a time-sensitive advocacy ask.",
        "type": "share_message",
        "howYouHelp": "voice",
        "minutes": 2,
        "timeLabel": "2 min",
        "where": "remote"
      }
    ]
  },
  {
    "id": 40,
    "name": "Special Olympics Chicago",
    "description": "Year-round sports for athletes with disabilities.",
    "whoTheyServe": "Athletes with intellectual disabilities",
    "causeArea": "Disability",
    "neighborhood": "Chicagoland",
    "multiSite": true,
    "address": "Chicagoland (multiple sites)",
    "lat": 41.91145,
    "lng": -87.68175,
    "actions": [
      {
        "id": 118,
        "action": "Volunteer at a competition",
        "detail": "Time races, hand out medals, and cheer athletes on.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 240,
        "timeLabel": "4 hr",
        "where": "in_person"
      },
      {
        "id": 119,
        "action": "Coach or assist at practice",
        "detail": "Help run drills for a local team.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 90,
        "timeLabel": "1 hr 30 min",
        "where": "in_person"
      },
      {
        "id": 120,
        "action": "Share the Polar Plunge",
        "detail": "Amplify their signature fundraiser.",
        "type": "share_message",
        "howYouHelp": "voice",
        "minutes": 2,
        "timeLabel": "2 min",
        "where": "remote"
      }
    ]
  },
  {
    "id": 41,
    "name": "Best Buddies Illinois",
    "description": "Friendship and jobs for people with disabilities.",
    "whoTheyServe": "People with intellectual and developmental disabilities",
    "causeArea": "Disability",
    "neighborhood": "Chicagoland",
    "multiSite": true,
    "address": "Chicagoland (multiple sites)",
    "lat": 41.91112,
    "lng": -87.61259,
    "actions": [
      {
        "id": 121,
        "action": "Become a one-to-one buddy",
        "detail": "Build a year of friendship with a matched buddy.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 60,
        "timeLabel": "1 hr",
        "where": "either"
      },
      {
        "id": 122,
        "action": "Host an inclusive meetup",
        "detail": "Organize a casual group hangout.",
        "type": "attend_event",
        "howYouHelp": "time",
        "minutes": 120,
        "timeLabel": "2 hr",
        "where": "in_person"
      },
      {
        "id": 123,
        "action": "Share a job-coaching need",
        "detail": "Help connect a buddy to employment.",
        "type": "share_message",
        "howYouHelp": "voice",
        "minutes": 2,
        "timeLabel": "2 min",
        "where": "remote"
      }
    ]
  },
  {
    "id": 42,
    "name": "Leave No Veteran Behind",
    "description": "Employment and support for veterans.",
    "whoTheyServe": "Veterans",
    "causeArea": "Veterans",
    "neighborhood": "Bronzeville",
    "multiSite": false,
    "address": "Bronzeville, Chicago, IL",
    "lat": 41.8175,
    "lng": -87.6173,
    "actions": [
      {
        "id": 124,
        "action": "Mock-interview a veteran",
        "detail": "Run practice interviews and coach a job seeker.",
        "type": "skilled_task",
        "howYouHelp": "skill",
        "minutes": 60,
        "timeLabel": "1 hr",
        "where": "either"
      },
      {
        "id": 125,
        "action": "Assemble a transition kit",
        "detail": "Pack resources for a veteran re-entering civilian work.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 90,
        "timeLabel": "1 hr 30 min",
        "where": "in_person"
      },
      {
        "id": 126,
        "action": "Share a veteran job posting",
        "detail": "Amplify openings to your professional network.",
        "type": "share_message",
        "howYouHelp": "voice",
        "minutes": 2,
        "timeLabel": "2 min",
        "where": "remote"
      }
    ]
  },
  {
    "id": 43,
    "name": "Old Town School of Folk Music",
    "description": "Community music education for all ages.",
    "whoTheyServe": "Music learners",
    "causeArea": "Arts",
    "neighborhood": "Lincoln Square",
    "multiSite": false,
    "address": "Lincoln Square, Chicago, IL",
    "lat": 41.9686,
    "lng": -87.6895,
    "actions": [
      {
        "id": 127,
        "action": "Usher a community concert",
        "detail": "Greet guests and hand out programs at a show.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 180,
        "timeLabel": "3 hr",
        "where": "in_person"
      },
      {
        "id": 128,
        "action": "Donate a working instrument",
        "detail": "Give an instrument for their access program.",
        "type": "donate_goods",
        "howYouHelp": "goods",
        "minutes": 20,
        "timeLabel": "20 min",
        "where": "in_person"
      },
      {
        "id": 129,
        "action": "Share a free family concert",
        "detail": "Post an upcoming free event to your neighbors.",
        "type": "share_message",
        "howYouHelp": "voice",
        "minutes": 2,
        "timeLabel": "2 min",
        "where": "remote"
      }
    ]
  },
  {
    "id": 44,
    "name": "Chicago Public Library Foundation",
    "description": "Supports library programs across the city.",
    "whoTheyServe": "Library patrons and readers",
    "causeArea": "Education",
    "neighborhood": "Loop",
    "multiSite": false,
    "address": "Loop, Chicago, IL",
    "lat": 41.8827,
    "lng": -87.6298,
    "actions": [
      {
        "id": 130,
        "action": "Help at a summer reading event",
        "detail": "Run activities at a branch reading kickoff.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 120,
        "timeLabel": "2 hr",
        "where": "in_person"
      },
      {
        "id": 131,
        "action": "Read to kids at story time",
        "detail": "Lead a story-time session at a branch.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 45,
        "timeLabel": "45 min",
        "where": "in_person"
      },
      {
        "id": 132,
        "action": "Advocate for library funding",
        "detail": "Ask the city to protect branch hours and budgets.",
        "type": "contact_official",
        "howYouHelp": "voice",
        "minutes": 5,
        "timeLabel": "5 min",
        "where": "remote"
      }
    ]
  },
  {
    "id": 45,
    "name": "Chicago Votes",
    "description": "Youth-led democracy and voting access.",
    "whoTheyServe": "Young voters",
    "causeArea": "Civic",
    "neighborhood": "Chicagoland",
    "multiSite": true,
    "address": "Chicagoland (multiple sites)",
    "lat": 41.86922,
    "lng": -87.66685,
    "actions": [
      {
        "id": 133,
        "action": "Register voters at an event",
        "detail": "Sign up new voters at a community gathering.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 120,
        "timeLabel": "2 hr",
        "where": "in_person"
      },
      {
        "id": 134,
        "action": "Text-bank for turnout",
        "detail": "Send get-out-the-vote texts from your phone.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 30,
        "timeLabel": "30 min",
        "where": "remote"
      },
      {
        "id": 135,
        "action": "Share a registration deadline",
        "detail": "Post the deadline so no one misses it.",
        "type": "share_message",
        "howYouHelp": "voice",
        "minutes": 2,
        "timeLabel": "2 min",
        "where": "remote"
      }
    ]
  },
  {
    "id": 46,
    "name": "League of Women Voters of Chicago",
    "description": "Nonpartisan voter education and engagement.",
    "whoTheyServe": "Voters",
    "causeArea": "Civic",
    "neighborhood": "Loop",
    "multiSite": false,
    "address": "Loop, Chicago, IL",
    "lat": 41.8827,
    "lng": -87.6298,
    "actions": [
      {
        "id": 136,
        "action": "Staff a candidate forum",
        "detail": "Help run a nonpartisan community forum.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 180,
        "timeLabel": "3 hr",
        "where": "in_person"
      },
      {
        "id": 137,
        "action": "Distribute voter guides",
        "detail": "Hand out nonpartisan guides in your neighborhood.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 60,
        "timeLabel": "1 hr",
        "where": "either"
      },
      {
        "id": 138,
        "action": "Share the ballot explainer",
        "detail": "Post the plain-language guide to what's on the ballot.",
        "type": "share_message",
        "howYouHelp": "voice",
        "minutes": 2,
        "timeLabel": "2 min",
        "where": "remote"
      }
    ]
  },
  {
    "id": 47,
    "name": "Center on Halsted",
    "description": "Midwest's largest LGBTQ community center.",
    "whoTheyServe": "LGBTQ+ Chicagoans",
    "causeArea": "Community",
    "neighborhood": "Lakeview",
    "multiSite": false,
    "address": "Lakeview, Chicago, IL",
    "lat": 41.9403,
    "lng": -87.6438,
    "actions": [
      {
        "id": 139,
        "action": "Serve at the food pantry",
        "detail": "Stock and staff the LGBTQ-affirming food pantry.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 120,
        "timeLabel": "2 hr",
        "where": "in_person"
      },
      {
        "id": 140,
        "action": "Help run a youth program",
        "detail": "Support activities in the drop-in youth space.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 120,
        "timeLabel": "2 hr",
        "where": "in_person"
      },
      {
        "id": 141,
        "action": "Share a safe-space resource",
        "detail": "Amplify support info for LGBTQ youth.",
        "type": "share_message",
        "howYouHelp": "voice",
        "minutes": 2,
        "timeLabel": "2 min",
        "where": "remote"
      }
    ]
  },
  {
    "id": 48,
    "name": "Cabrini Green Legal Aid",
    "description": "Free legal help and record clearing.",
    "whoTheyServe": "People with records and low income",
    "causeArea": "Justice",
    "neighborhood": "Loop",
    "multiSite": false,
    "address": "Loop, Chicago, IL",
    "lat": 41.8827,
    "lng": -87.6298,
    "actions": [
      {
        "id": 142,
        "action": "Volunteer at an expungement clinic",
        "detail": "Help clients through record-clearing paperwork.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 180,
        "timeLabel": "3 hr",
        "where": "in_person"
      },
      {
        "id": 143,
        "action": "Offer pro-bono legal skills",
        "detail": "Take a case or research task if you're a lawyer.",
        "type": "skilled_task",
        "howYouHelp": "skill",
        "minutes": 120,
        "timeLabel": "2 hr",
        "where": "either"
      },
      {
        "id": 144,
        "action": "Share the free clinic schedule",
        "detail": "Post upcoming clinics so people can get help.",
        "type": "share_message",
        "howYouHelp": "voice",
        "minutes": 2,
        "timeLabel": "2 min",
        "where": "remote"
      }
    ]
  },
  {
    "id": 49,
    "name": "Chicago Community Bond Fund",
    "description": "Pays bond for people who can't afford it.",
    "whoTheyServe": "People held pretrial",
    "causeArea": "Justice",
    "neighborhood": "Chicagoland",
    "multiSite": true,
    "address": "Chicagoland (multiple sites)",
    "lat": 41.92475,
    "lng": -87.64874,
    "actions": [
      {
        "id": 145,
        "action": "Call on pretrial-justice policy",
        "detail": "Urge your rep to support ending cash bail harms.",
        "type": "contact_official",
        "howYouHelp": "voice",
        "minutes": 5,
        "timeLabel": "5 min",
        "where": "remote"
      },
      {
        "id": 146,
        "action": "Sign the end-money-bond petition",
        "detail": "Add your name to the campaign.",
        "type": "sign_petition",
        "howYouHelp": "voice",
        "minutes": 2,
        "timeLabel": "2 min",
        "where": "remote"
      },
      {
        "id": 147,
        "action": "Write to someone in jail",
        "detail": "Send a supportive letter to a person held pretrial.",
        "type": "volunteer_shift",
        "howYouHelp": "time",
        "minutes": 30,
        "timeLabel": "30 min",
        "where": "remote"
      }
    ]
  },
  {
    "id": 50,
    "name": "Cara Collective",
    "description": "Job training and coaching for people facing poverty.",
    "whoTheyServe": "People facing poverty and homelessness",
    "causeArea": "Workforce",
    "neighborhood": "Loop",
    "multiSite": false,
    "address": "Loop, Chicago, IL",
    "lat": 41.8827,
    "lng": -87.6298,
    "actions": [
      {
        "id": 148,
        "action": "Give a motivational talk",
        "detail": "Speak at the daily community affirmations session.",
        "type": "attend_event",
        "howYouHelp": "time",
        "minutes": 30,
        "timeLabel": "30 min",
        "where": "in_person"
      },
      {
        "id": 149,
        "action": "Mock-interview a participant",
        "detail": "Coach a job seeker with a practice interview.",
        "type": "skilled_task",
        "howYouHelp": "skill",
        "minutes": 60,
        "timeLabel": "1 hr",
        "where": "either"
      },
      {
        "id": 150,
        "action": "Refer an open role",
        "detail": "Connect a graduate to a job opening you know of.",
        "type": "share_message",
        "howYouHelp": "voice",
        "minutes": 5,
        "timeLabel": "5 min",
        "where": "remote"
      }
    ]
  }
];
