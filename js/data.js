// ═══════════════════════════════════════════════════
//  data.js — Static data for SportsFest 2026
//  GLA University Sports Portal
// ═══════════════════════════════════════════════════

const eventsData = [
  { id:1,  name:"Cricket Tournament",    emoji:"🏏", category:"outdoor", type:"team",       status:"ongoing",
    venue:"Main Ground",       date:"May 10–12", time:"9:00 AM",  coordinator:"Dr. Ramesh Kumar",  maxTeams:8,
    description:"Inter-department T20 cricket tournament. Each department fields one team of 11 players.",
    rules:["11 players + 2 substitutes per team","T20 format (20 overs)","Department eligibility required","Umpire decision is final"] },

  { id:2,  name:"Football (5-a-side)",   emoji:"⚽", category:"outdoor", type:"team",       status:"upcoming",
    venue:"Football Ground",   date:"May 14",    time:"10:00 AM", coordinator:"Prof. Sneha Patel",    maxTeams:10,
    description:"Fast-paced 5-a-side football knockout across departments.",
    rules:["5 players + 2 subs","Two 10-minute halves","Futsal rules apply","Fair play is mandatory"] },

  { id:3,  name:"Badminton (Singles)",   emoji:"🏸", category:"indoor",  type:"individual", status:"upcoming",
    venue:"Gymnasium",         date:"May 13",    time:"11:00 AM", coordinator:"Prof. Anita Sharma",   maxParticipants:32,
    description:"Singles badminton knockout open to all students.",
    rules:["Best of 3 sets (21 points)","Standard BWF rules","Sports attire compulsory","Shuttlecocks provided"] },

  { id:4,  name:"Table Tennis",          emoji:"🏓", category:"indoor",  type:"individual", status:"upcoming",
    venue:"Recreation Hall",   date:"May 13",    time:"2:00 PM",  coordinator:"Mr. Vikram Singh",      maxParticipants:32,
    description:"Singles table tennis championship, open to all departments.",
    rules:["Best of 5 sets (11 points)","ITTF rules","Bats provided","No coaching during match"] },

  { id:5,  name:"100m Sprint",           emoji:"🏃", category:"outdoor", type:"individual", status:"completed",
    venue:"Athletics Track",   date:"May 9",     time:"8:00 AM",  coordinator:"Mr. Arun Tiwari",       maxParticipants:20,
    description:"Flat 100-metre sprint on the college athletics track.",
    rules:["Running shoes mandatory","False start = disqualification","Electronic timing used","3 heats + finals"] },

  { id:6,  name:"Volleyball",            emoji:"🏐", category:"outdoor", type:"team",       status:"upcoming",
    venue:"Volleyball Court",  date:"May 15",    time:"4:00 PM",  coordinator:"Dr. Priya Nair",        maxTeams:8,
    description:"6-a-side volleyball tournament across departments.",
    rules:["6 players per team","Best of 3 sets","FIVB rules apply","Mixed teams allowed"] },

  { id:7,  name:"Chess Championship",    emoji:"♟️", category:"indoor",  type:"individual", status:"completed",
    venue:"Seminar Hall",      date:"May 8",     time:"10:00 AM", coordinator:"Prof. Mehta",            maxParticipants:24,
    description:"Rapid chess using Swiss pairing system.",
    rules:["15 min + 10 sec increment","FIDE rapid rules","Mobiles not allowed","Touch-move strictly applies"] },

  { id:8,  name:"Tug of War",            emoji:"💪", category:"outdoor", type:"team",       status:"upcoming",
    venue:"Main Ground",       date:"May 15",    time:"5:00 PM",  coordinator:"Mr. Ravi Das",           maxTeams:8,
    description:"Classic team strength event — best of three rounds.",
    rules:["8 players per team","Best of 3 pulls","Spiked shoes not allowed","Rope provided"] },

  { id:9,  name:"Relay Race (4×100m)",   emoji:"🔄", category:"outdoor", type:"team",       status:"upcoming",
    venue:"Athletics Track",   date:"May 12",    time:"4:30 PM",  coordinator:"Mr. Arun Tiwari",        maxTeams:10,
    description:"4×100m relay race for departments.",
    rules:["4 runners per team","Exchanges in designated zones","Spikes allowed","One attempt per team"] },

  { id:10, name:"Carrom (Doubles)",      emoji:"🎯", category:"indoor",  type:"team",       status:"ongoing",
    venue:"Recreation Hall",   date:"May 10–11", time:"12:00 PM", coordinator:"Mrs. Kavya Reddy",       maxTeams:16,
    description:"Doubles carrom following standard ICF rules.",
    rules:["Standard carrom rules","Best of 3 boards","Pocket queen first","No spectator interference"] },

  { id:11, name:"Long Jump",             emoji:"🤸", category:"outdoor", type:"individual", status:"upcoming",
    venue:"Athletics Field",   date:"May 14",    time:"2:00 PM",  coordinator:"Mr. Arun Tiwari",        maxParticipants:20,
    description:"Classic track and field long jump event.",
    rules:["3 attempts each","Best jump counts","Proper shoes required","Sand pit maintained by officials"] },

  { id:12, name:"Basketball (3-on-3)",   emoji:"🏀", category:"outdoor", type:"team",       status:"upcoming",
    venue:"Basketball Court",  date:"May 16",    time:"3:00 PM",  coordinator:"Prof. James",            maxTeams:8,
    description:"Street 3-on-3 basketball knockout tournament.",
    rules:["3 players + 1 sub","First to 21 or 10 min","FIBA 3×3 rules","Losing team eliminated"] }
];

const announcements = [
  { title:"Cricket semi-final rescheduled", text:"Due to weather, semi-finals moved to May 11 at 3:00 PM.", date:"May 9, 2026" },
  { title:"Registration closes soon",       text:"Volleyball & Basketball registration closes May 13 at 11:59 PM.", date:"May 8, 2026" },
  { title:"Prize Ceremony — May 16",        text:"Prize distribution at 6:00 PM in the College Auditorium.", date:"May 7, 2026" }
];

const scheduleData = {
  "May 9, 2026 — Day 1": [
    { time:"8:00 AM",  name:"100m Sprint",            venue:"Athletics Track",  status:"completed" },
    { time:"10:00 AM", name:"Chess Championship",      venue:"Seminar Hall",     status:"completed" },
    { time:"9:00 AM",  name:"Cricket Tournament (R1)", venue:"Main Ground",      status:"completed" }
  ],
  "May 10–11, 2026 — Days 2–3": [
    { time:"9:00 AM",  name:"Cricket QF / SF",         venue:"Main Ground",      status:"ongoing" },
    { time:"12:00 PM", name:"Carrom Doubles",          venue:"Recreation Hall",  status:"ongoing" }
  ],
  "May 12, 2026 — Day 4": [
    { time:"9:00 AM",  name:"Cricket Final",           venue:"Main Ground",      status:"upcoming" },
    { time:"4:30 PM",  name:"Relay Race (4×100m)",     venue:"Athletics Track",  status:"upcoming" }
  ],
  "May 13, 2026 — Day 5": [
    { time:"11:00 AM", name:"Badminton Singles",       venue:"Gymnasium",        status:"upcoming" },
    { time:"2:00 PM",  name:"Table Tennis",            venue:"Recreation Hall",  status:"upcoming" }
  ],
  "May 14, 2026 — Day 6": [
    { time:"10:00 AM", name:"Football 5-a-side",       venue:"Football Ground",  status:"upcoming" },
    { time:"2:00 PM",  name:"Long Jump",               venue:"Athletics Field",  status:"upcoming" }
  ],
  "May 15–16, 2026 — Final Days": [
    { time:"4:00 PM",  name:"Volleyball",              venue:"Volleyball Court", status:"upcoming" },
    { time:"5:00 PM",  name:"Tug of War",              venue:"Main Ground",      status:"upcoming" },
    { time:"3:00 PM",  name:"Basketball 3-on-3",       venue:"Basketball Court", status:"upcoming" },
    { time:"6:00 PM",  name:"Prize Ceremony",          venue:"Auditorium",       status:"upcoming" }
  ]
};

const resultsData = [
  { name:"100m Sprint",        emoji:"🏃",
    results:[{pos:"🥇",name:"Rohit Verma (CS)",   score:"10.8s"   },
             {pos:"🥈",name:"Aakash Mehta (IT)",  score:"11.1s"   },
             {pos:"🥉",name:"Suresh Kumar (ME)",   score:"11.4s"   }] },
  { name:"Chess Championship", emoji:"♟️",
    results:[{pos:"🥇",name:"Priya Singh (CS)",   score:"3.0 / 3" },
             {pos:"🥈",name:"Rahul Das (EC)",      score:"2.5 / 3" },
             {pos:"🥉",name:"Neha Patel (IT)",     score:"2.0 / 3" }] }
];

const teamMembers = [
  { name:"Dr. Ramesh Kumar", role:"Faculty Coordinator", emoji:"👨‍🏫" },
  { name:"Priya Sharma",     role:"Student Head",        emoji:"👩‍🎓" },
  { name:"Arjun Tiwari",     role:"Event Manager",       emoji:"🧑‍💼" },
  { name:"Sneha Reddy",      role:"Secretary",           emoji:"👩‍💼" },
  { name:"Vikram Singh",     role:"Logistics Head",      emoji:"👨‍💼" },
  { name:"Kavya Nair",       role:"Media & PR",          emoji:"👩‍💻" }
];
