const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = "j";

/* ---------- EXPRESS ---------- */

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

/* ---------- DATA ---------- */

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
      "Γιάπης μεσίτης των νοτίων προαστίων. Νομίζει ότι ο κόσμος του ανήκει, κάνει σολάριουμ και λεύκανση και πιστεύει ότι πέτυχε επειδή είναι έξυπνος και όχι μουνόπανο."
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
      "Κινέζα τουρίστρια που ενθουσιάζεται με καθετί ελληνικό και νομίζει ότι η Ελλάδα είναι μόνο οι Κυκλάδες. Βγάζει photo με selfie-stick σε κάθε στενό, κυκλοφορεί με καπέλο ομπρελίτσα για να μην καεί."
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
    name: "Σωτήρης",
    location: "Γιάννενα",
    image: "/images/sotiris.png",
    description:
      "Μύωπας φωτογράφος πουλιών, ακολουθεί το National Geographic απ΄το 1990. Η καλύτερή του δουλειά έχει τίτλο \"Από τους δεινοσαύρους στις κότες\"."
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
      "25άρης ταρίφας που θα είχε κάνει καριέρα στο ποδόσφαιρο αν δεν είχε πάθει μηνίσκο. Κάθε Σάββατο τον βρίσκεις στο Deep μεθυσμένο να κερνάει σφηνάκια."
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
    name: "Καίτη",
    location: "Αγία Παρασκευή",
    image: "/images/kaiti.png",
    description:
      "Μεσοαστικής τάξης πλουσιομάνα που νομίζει ότι ο γιοκάς της τους πατάει όλους και είναι ιδιοφυΐα, αλλά αυτός ακόμη μετράει με τα δάχτυλα. Πηγαίνει κομμωτήριο 3 φορές τον μήνα γιατί την ανανεώνει."
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
    name: "Μανώλης",
    location: "Κυψέλη",
    image: "/images/manolis.png",
    description:
      "Δάσκαλος καράτε με μέσο όρο 2 μαθητευόμενους (μεσήλικες και άνω) τον μήνα, πιστεύει σθεναρά ότι το καράτε είναι η καλύτερη πολεμική τέχνη και σου μαθαίνει πράγματα για τη ζωή που δεν μπορείς να μάθεις πουθενά αλλού. Ζητάει δανεικά από τη μάνα του για να την βγάλει."
  },
  {
    id: 14,
    name: "Κώτσος",
    location: "Κολωνός",
    image: "/images/kotsos.png",
    description:
      "Ιδιοκτήτης κάβας, ζέχνει αλκοόλ από χιλιόμετρο, με μακρύ νύχι μικρού δακτύλου για να κάνει αποτελεσματικά τις ανασκαφές του. Πιστεύει ότι θα πιάσει την καλή από τα φρουτάκια."
  },
  {
    id: 15,
    name: "Ramona",
    location: "Καλλιθέα",
    image: "/images/ramona.png",
    description:
      "50χρονη κωλομπαρού, σε προσεγγίζει στο μπαρ, σου πλασάρει συναδέλφισσες, οδηγάει Mercedes κι εσύ όχι. Αν σου σφίξει το χέρι, στο έχει λιώσει."
  }
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

/* ---------- ROUTES ---------- */

// INDEX
app.get("/", (req, res) => {
  res.render("index");
});

// START
app.post("/start", (req, res) => {
  res.render("pick", { name: req.body.name });
});

// DRAW (ΜΟΝΟ διαθέσιμες)
app.get("/draw", (req, res) => {
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

// SAVE
app.post("/save", (req, res) => {
  const assignments = readAssignments();
  const { name, me, target } = req.body;

  if (!name || !me || !target) {
    return res.status(400).send("Μη έγκυρα δεδομένα.");
  }

  // ❌ ίδιο username
  const names = Object.values(assignments).map(a =>
    a.name.toLowerCase()
  );
  if (names.includes(name.toLowerCase())) {
    return res
      .status(409)
      .send("Υπάρχει ήδη συμμετοχή με αυτό το όνομα.");
  }

  // ❌ ίδιος χαρακτήρας
  if (me.id === target.id) {
    return res
      .status(400)
      .send("Δεν μπορείς να αγοράσεις δώρο στον εαυτό σου.");
  }

  // ❌ race condition
  if (
    usedIds(assignments, "me").includes(me.id) ||
    usedIds(assignments, "target").includes(target.id)
  ) {
    return res
      .status(409)
      .send("Κάποια κάρτα δεν είναι πλέον διαθέσιμη.");
  }

  const code = randomCode();

  assignments[code] = {
    name,
    me,
    target,
    createdAt: new Date().toISOString()
  };

  writeAssignments(assignments);
  res.redirect(`/result/${code}`);
});

// RESULT  ✅ (ΑΥΤΟ ΕΛΕΙΠΕ)
app.get("/result/:code", (req, res) => {
  const assignments = readAssignments();
  const data = assignments[req.params.code];

  if (!data) {
    return res.status(404).send("Μη έγκυρος κωδικός.");
  }

  res.render("result", {
    data,
    code: req.params.code
  });
});

// RECOVERY
app.get("/mission", (req, res) => {
  res.render("mission", { result: null });
});

app.post("/mission", (req, res) => {
  const assignments = readAssignments();
  res.render("mission", {
    result: assignments[req.body.code] || null
  });
});

// ADMIN LOGIN
app.get("/admin-login", (req, res) => {
  res.render("admin-login", { error: null });
});

app.post("/admin-login", (req, res) => {
  if (req.body.password !== ADMIN_PASSWORD) {
    return res.render("admin-login", {
      error: "Λάθος κωδικός."
    });
  }
  res.redirect(`/admin?token=${ADMIN_PASSWORD}`);
});

// ADMIN
app.get("/admin", (req, res) => {
  if (req.query.token !== ADMIN_PASSWORD) {
    return res.status(403).send("Access denied");
  }

  const assignments = readAssignments();

  res.render("admin", {
    assignments,
    remainingMe: availableCharacters(assignments, "me").length,
    remainingTarget: availableCharacters(assignments, "target").length,
    token: ADMIN_PASSWORD
  });
});

// ADMIN DELETE
app.post("/admin/delete/:code", (req, res) => {
  if (req.query.token !== ADMIN_PASSWORD) {
    return res.status(403).send("Access denied");
  }

  const assignments = readAssignments();
  delete assignments[req.params.code];
  writeAssignments(assignments);

  res.redirect(`/admin?token=${ADMIN_PASSWORD}`);
});

/* ---------- SERVER ---------- */

app.listen(PORT, () => {
  console.log(`🎄 Secret Santa running at http://localhost:${PORT}`);
});

app.get("/check-image-types", (req, res) => {
  const results = characters.map(c => {
    const imagePath = path.join(__dirname, "public", c.image);
    const buffer = fs.readFileSync(imagePath);
    
    // Check file signature (magic bytes)
    let actualType = "unknown";
    if (buffer[0] === 0xFF && buffer[1] === 0xD8) {
      actualType = "JPEG";
    } else if (buffer[0] === 0x89 && buffer[1] === 0x50) {
      actualType = "PNG";
    }
    
    return {
      name: c.name,
      declaredExt: path.extname(c.image),
      actualType: actualType,
      size: buffer.length
    };
  });
  
  res.json(results);
});