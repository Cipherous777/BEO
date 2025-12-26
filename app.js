// ================== IMPORTS ==================
const express = require("express");
const app = express();
const PORT = 4567;

const multer = require("multer");
const fs = require("fs");
const path = require("path");

// ================== FIREBASE ==================
const admin = require("firebase-admin");
const serviceAccount = require("./firebaseKey.json"); // REQUIRED

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "YOUR_PROJECT_ID.appspot.com", // REQUIRED
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

app.get("/news", (req, res) => {
  res.render("news", { dateYear: new Date().getFullYear() });
});

app.get("/contact", (req, res) => {
  res.render("contact", { dateYear: new Date().getFullYear() });
});

app.get("/request", (req, res) => {
  res.render("request", { dateYear: new Date().getFullYear() });
});

// ================== ADMIN ==================
// ================== ADMIN ==================
app.get("/admin-option", async (req, res) => {
  try {
    // Fetch news
    const newsSnap = await db.collection("news").get();
    const fetchNews = newsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Fetch contacts
    const contactsSnap = await db.collection("contacts").get();
    const fetchContacts = contactsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Fetch requests
    const requestsSnap = await db.collection("requests").get();
    const fetchRequests = requestsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Render the admin page with all data
    res.render("admin-option", { fetchNews, fetchContacts, fetchRequests });
  } catch (err) {
    console.error(err);
    res.render("error");
  }
});

app.get("/admin", (req,res)=>{
  res.render("admin")
})
app.get("/admin-option", (req,res)=>{
  res.render("admin-option")
})
// ================== IMAGE UPLOAD (FIREBASE ONLY) ==================

app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save to Firestore collection "contacts"
    await db.collection("contacts").add({
      name,
      email,
      message,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.redirect("/"); // back to home
  } catch (err) {
    console.error(err);
    res.render("error");
  }
});
app.post("/request", async (req, res) => {
  try {
    const { name, email, date, message } = req.body;

    // Save to Firestore collection "requests"
    await db.collection("requests").add({
      name,
      email,
      date,
      message,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.redirect("/"); // back to home
  } catch (err) {
    console.error(err);
    res.render("error");
  }
});


// ================== ERRORS ==================
app.use((req, res) => {
  res.render("404");
});

// ================== START SERVER ==================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
