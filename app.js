// ================== IMPORTS ==================
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4567;

const multer = require("multer");
const fs = require("fs");
const path = require("path");

// ================== FIREBASE ==================
const admin = require("firebase-admin");

// Load Firebase service account from env variable (for Render)
let serviceAccount;

if (process.env.FIREBASE_KEY_JSON) {
  serviceAccount = JSON.parse(process.env.FIREBASE_KEY_JSON);
} else {
  // Local fallback
  serviceAccount = require("./firebaseKey.json");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "bright-events-organization.appspot.com", // replace with your bucket name
});

const db = admin.firestore();
const bucket = admin.storage().bucket();

// ================== MULTER ==================
const upload = multer({ dest: "uploads/" });

// ================== EXPRESS CONFIG ==================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

// ================== ROUTES ==================
app.get("/", (req, res) => {
  res.render("index", { dateYear: new Date().getFullYear() });
});

["/home", "/landing", "/index"].forEach(route => {
  app.get(route, (req, res) => res.redirect("/"));
});

app.get("/news", (req, res) => res.render("news", { dateYear: new Date().getFullYear() }));
app.get("/contact", (req, res) => res.render("contact", { dateYear: new Date().getFullYear() }));
app.get("/request", (req, res) => res.render("request", { dateYear: new Date().getFullYear() }));

// ================== ADMIN ==================
app.get("/admin-option", async (req, res) => {
  try {
    const newsSnap = await db.collection("news").get();
    const fetchNews = newsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const contactsSnap = await db.collection("contacts").get();
    const fetchContacts = contactsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const requestsSnap = await db.collection("requests").get();
    const fetchRequests = requestsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    res.render("admin-option", { fetchNews, fetchContacts, fetchRequests });
  } catch (err) {
    console.error(err);
    res.render("error");
  }
});

app.get("/admin", (req, res) => res.render("admin"));

// ================== CONTACT & REQUEST POSTS ==================
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    await db.collection("contacts").add({
      name,
      email,
      message,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.render("error");
  }
});

app.post("/request", async (req, res) => {
  try {
    const { name, email, date, message } = req.body;

    await db.collection("requests").add({
      name,
      email,
      date,
      message,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.render("error");
  }
});

// ================== ERRORS ==================
app.use((req, res) => res.render("404"));

// ================== START SERVER ==================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
