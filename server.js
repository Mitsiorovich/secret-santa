const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = "j";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const DATA_FILE = path.join(__dirname, "data", "assignments.json");

/* ---------- HELPERS ---------- */

function readAssignments() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
  } catch {
    return {};
  }
}

function writeAssignments(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function randomCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

/* ---------- CHARACTERS ---------- */
/** PASTE YOUR FULL ORIGINAL ARRAY HERE (unchanged) */
const characters = [
  {
    id: 1,
    name: "Ιάσονας",
    location: "Γκράβα",
    image: "/images/brave.png",
    description:
      "Μαθητής ΕΠΑΛ τελευταίου θρανίου που οδηγεί χωρίς δίπλωμα κωλοφτιαγμένο GLX και τα έχει με μια καγκουρόγκομενα."
  },
  {
    id: 2,
    name: "Αντώνης",
    location: "Γλυφάδα",
    image: "/images/antonis.png",
    description:
      "Γιάπης μεσίτης των νοτίων προαστίων. Νομίζει ότι ο κόσμος του ανήκει, κάνει σολάριουμ και λεύκανση. Είναι man of value και παρακολουθεί MOS."
  },
  {
    id: 3,
    name: "Yuri",
    location: "Λιόσια",
    image: "/images/yuri.png",
    description:
      "Ρωσοπόντιος κλειδαράς στα Λιόσια. Μια φορά είχε πέσει από τον 3ο μια πολυκατοικίας και δεν έπαθε γρατζουνιά. Πίνει Amstel το πρωί. Άν του δώσεις λίγα παραπάνω σου ανοίγει τον γείτονα."
  },
  {
    id: 4,
    name: "Mia",
    location: "Tsingtao",
    image: "/images/mia.png",
    description:
      "Κινέζα τουρίστρια που ενθουσιάζεται με καθετί ελληνικό. Της πουλήσανε 9 ευρώ σουβλάκι στην Πλάκα. Βγάζει photo με selfie-stick σε κάθε στενό, κυκλοφορεί με καπέλο ομπρελίτσα για να μην καεί."
  },
  {
    id: 5,
    name: "Χαρά",
    location: "Κουκάκι",
    image: "/images/xara.png",
    description:
      "Θεραπεύτρια που ακολουθεί εναλλακτικές θεραπείες, αναζητά τον βαθύτερο εαυτό της μέσω της αστρολογίας και πιστεύει σε πνεύματα και ενέργειες."
  },
  {
    id: 6,
    name: "Ramona",
    location: "Καλλιθέα",
    image: "/images/ramona.png",
    description:
      "50χρονη κωλομπαρού, σε προσεγγίζει στο μπαρ, σου πλασάρει συναδέλφισσες, οδηγάει Mercedes κι εσύ όχι. Αν σου σφίξει το χέρι, στο έχει λιώσει."
  },
  {
    id: 7,
    name: "Εύη",
    location: "Αργυρούπολη",
    image: "/images/evi.png",
    description:
      "Healthy lifestyle coach, social media influencer, travel enthusiast, jogging lover. Στέλνει φωτογραφίες τις πατούσες της που και που για εξτραδάκια"
  },
  {
    id: 8,
    name: "Διαμαντής",
    location: "Νέο Ηράκλειο",
    image: "/images/diamantis.png",
    description:
      "25άρης που οδηγάει το ταξί του πατέρα του. Θα είχε κάνει καριέρα στο ποδόσφαιρο αν δεν είχε πάθει μηνίσκο. Κάθε Σάββατο τον βρίσκεις Πικ Απ και Bank Job προσπαθώντας να πάρει κούρσες."
  },
  {
    id: 9,
    name: "Νελλάκι",
    location: "Περισσός",
    image: "/images/nellaki.png",
    description:
      "OnlyFans εργάτρια, που το παίζει Παναθηναικός για να βρίσκει πελάτες, περιμένει έναν άτακτο βαζελάκο να την \"βάλει στη θέση της\"."
  },
  {
    id: 10,
    name: "DJ Σαματάς (δηλ. Σταμάτης)",
    location: "Χίλτον",
    image: "/images/samatas.png",
    description:
      "45άρης DJ στο Τσέλσι, αποτυχημένος hip-hopάς. Καβατζώνει αναπτήρες από όσους κάθονται στην μπάρα και κάνει ότι δεν ξέρει πού πήγαν. Έχει στείλει 10 φορές στο Νελλάκι."
  },
  {
    id: 11,
    name: "Δανάη",
    location: "Αγία Παρασκευή (αλλά δηλώνει Εξάρχεια)",
    image: "/images/danah.png",
    description:
      "Φοράει μεταγιόν που αγόρασε από πάγκο έξω από πανηγύρι στην Ικαρία. Αράζει Εξάρχεια με μπύρα, golden virginia καβατζωτό, και ακούει Μάλαμα και Παπακωνσταντίνου."
  },
  {
    id: 12,
    name: "Samir",
    location: "Ομόνοια",
    image: "/images/samir.png",
    description:
      "Πωλητής ειδών τεχνολογίας που κανείς δεν ξέρει πώς και από πού τα προμηθεύτηκε και αν παίζουν. Αν τον ζορίζεις, σού κάνει έκπτωση 80%."
  },
  {
    id: 13,
    name: "Έφη",
    location: "Περιστέρι",
    image: "/images/efi.png",
    description:
      "Νυχού, επαγγελματίας κουτσομπόλα της γειτονιάς. Γνωρίζει ότι έχεις χωρίσει πριν το μάθεις εσύ. Οδηγάει Fiat 500 σαν σωστή νοικοκυρά."
  },
  {
    id: 14,
    name: "Κώτσος",
    location: "Κολωνός",
    image: "/images/kotsos.png",
    description:
      "Ιδιοκτήτης κάβας, βρωμάει τσιγάρο από χιλιόμετρα. Χρωστάει σε ό,τι κινείται. Κόβει το ποτό και τα φρούτα όποτε θέλει."
  },
  
];

/* ---------- CORE LOGIC ---------- */

function usedIds(assignments, type) {
  return Object.values(assignments)
    .map(a => a[type]?.id)
    .filter(Boolean);
}

function availableCharacters(assignments, type) {
  const used = new Set(usedIds(assignments, type));
  return characters.filter(c => !used.has(c.id));
}

/* ======================================================
   API ROUTES
   ====================================================== */

app.get("/api/characters", (req, res) => {
  res.json(characters);
});

// START (optional validation hook)
app.post("/api/start", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Missing name" });
  res.json({ name });
});

// DRAW (only available)
app.get("/api/draw", (req, res) => {
  const type = req.query.type;
  if (!["me", "target"].includes(type)) {
    return res.status(400).json({ error: "Invalid type" });
  }

  const assignments = readAssignments();
  const pool = availableCharacters(assignments, type);

  if (!pool.length) {
    return res.status(409).json({
      error: "Δεν υπάρχουν άλλες διαθέσιμες κάρτες."
    });
  }

  res.json(pool[Math.floor(Math.random() * pool.length)]);
});

// SAVE (full original rules: unique name, no self, race-condition check)
app.post("/api/save", (req, res) => {
  const assignments = readAssignments();
  const { name, me, target } = req.body;

  if (!name || !me || !target) {
    return res.status(400).json({ error: "Μη έγκυρα δεδομένα." });
  }

  // ❌ unique player name (case-insensitive)
  const names = Object.values(assignments).map(a => a.name.toLowerCase());
  if (names.includes(String(name).toLowerCase())) {
    return res.status(409).json({
      error: "Υπάρχει ήδη συμμετοχή με αυτό το όνομα."
    });
  }

  // ❌ cannot buy for yourself
  if (me.id === target.id) {
    return res.status(400).json({
      error: "Δεν μπορείς να αγοράσεις δώρο στον εαυτό σου."
    });
  }

  // ❌ race condition (server authoritative)
  if (
    usedIds(assignments, "me").includes(me.id) ||
    usedIds(assignments, "target").includes(target.id)
  ) {
    return res.status(409).json({
      error: "Κάποια κάρτα δεν είναι πλέον διαθέσιμη."
    });
  }

  const code = randomCode();

  assignments[code] = {
    name,
    me,
    target,
    createdAt: new Date().toISOString()
  };

  writeAssignments(assignments);

  res.json({ code, data: assignments[code] });
});

// RESULT (lookup by code)
app.get("/api/result/:code", (req, res) => {
  const assignments = readAssignments();
  const data = assignments[req.params.code];

  if (!data) {
    return res.status(404).json({ error: "Μη έγκυρος κωδικός." });
  }

  res.json({ code: req.params.code, data });
});

// RECOVERY (by code)
app.post("/api/mission", (req, res) => {
  const assignments = readAssignments();
  const result = assignments[req.body.code];

  if (!result) {
    return res.status(404).json({ error: "Μη έγκυρος κωδικός." });
  }

  res.json(result);
});

// ADMIN LOGIN
app.post("/api/admin/login", (req, res) => {
  if (req.body.password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Λάθος κωδικός." });
  }
  res.json({ token: ADMIN_PASSWORD });
});

app.get("/api/admin", (req, res) => {
  if (req.query.token !== ADMIN_PASSWORD) {
    return res.status(403).json({ error: "Access denied" });
  }

  const assignmentsObj = readAssignments();

  // 🔑 CONVERT OBJECT → ARRAY HERE (ONCE, CORRECTLY)
  const assignments = Object.entries(assignmentsObj).map(
    ([code, value]) => ({
      code,
      ...value
    })
  );

  res.json({
    assignments,
    total: assignments.length,
    remainingMe: availableCharacters(assignmentsObj, "me").length,
    remainingTarget: availableCharacters(assignmentsObj, "target").length
  });
});


// ADMIN DELETE (frees cards)
app.delete("/api/admin/:code", (req, res) => {
  if (req.query.token !== ADMIN_PASSWORD) {
    return res.status(403).json({ error: "Access denied" });
  }

  const assignments = readAssignments();
  delete assignments[req.params.code];
  writeAssignments(assignments);

  res.json({ success: true });
});

/* ---------- SPA FALLBACK (Express 4/5 safe) ---------- */
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`🎄 Secret Santa running at http://localhost:${PORT}`);
});
