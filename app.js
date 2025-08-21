// importing modules
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 4567;
const URL =
  "mongodb+srv://kidolmogo:QWERTY1234@cluster0.aepdt.mongodb.net/BEO?retryWrites=true&w=majority&appName=Cluster0";
const contacts = require("./models/contacts");
const requests = require("./models/requests");
const adminSchema = require("./models/admin");
// middleware
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());

// routing
app.get("/", (req, res) => {
  const date = new Date();
  const dateYear = date.getFullYear();
  res.render("index", { dateYear });
});
app.get("/home", (req, res) => {
  res.redirect("/");
});
app.get("/landing", (req, res) => {
  res.redirect("/");
});
app.get("/index", (req, res) => {
  res.redirect("/");
});
app.get("/admin", (req, res) => {
  res.render("admin");
});
app.get("/news", (req, res) => {
  const date = new Date();
  const dateYear = date.getFullYear();
  res.render("news", { dateYear });
});
app.get("/admin-option", async (req, res) => {
  const fetchRequests = await requests.find();
  const fetchContacts = await contacts.find();
  res.render("admin-option", { fetchRequests, fetchContacts });
});
app.get("/about", (req, res) => {
  const date = new Date();
  const dateYear = date.getFullYear();
  res.render("about", { dateYear });
});
app.get("/request", (req, res) => {
  const date = new Date();
  const dateYear = date.getFullYear();
  res.render("request", { dateYear });
});
app.get("/portfolio", (req, res) => {
  const date = new Date();
  const dateYear = date.getFullYear();
  const portfolioData = [
    {
      title: "Bright Mom Pregnant Carnival 1",
      association: "June 12, 2025",
      imgSrc: "/Images/BMPC-1.jpg",
      description: "Details about BMPC-1.",
    },
    {
      title: "Bright Mom Pregnant Carnival 2",
      association: "June 13, 2025",
      imgSrc: "/Images/BMPC-2.jpg",
      description: "Details about BMPC-2.",
    },
    {
      title: "Bright Mom Pregnant Carnival 3",
      association: "June 14, 2025",
      imgSrc: "/Images/BMPC-3.jpg",
      description:
        "The Pregnant Carnival supports maternal health by providing expert advice, wellness activities, and community connections.",
    },
  ];

  res.render("portfolio", { dateYear, portfolioData });
});
app.get("/contact", (req, res) => {
  const date = new Date();
  const dateYear = date.getFullYear();
  res.render("contact", { dateYear });
});
app.get("/sorry", (req, res) => {
  res.render("sorry");
});
app.use((req, res) => {
  res.render("404");
});

// mongodb connection
async function mongodbConnect() {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 20000, // optional
    });
    console.log("MongoDB connection established.");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

mongodbConnect();

// posting
app.post("/request", async (req, res) => {
  try {
    const { name, email, date, message } = req.body;
    console.log(name);
    const requestData = new requests({
      name,
      email,
      date,
      message,
    });

    await requestData.save();
    res.redirect("/");
  } catch (err) {
    res.render("error");
    console.log(`An error has occured ${err}`);
  }
})
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const contactData = new contacts({
      name,
      email,
      message,
    });
    await contactData.save();
    res.redirect("/");
  } catch (err) {
    res.render("error");
    console.log(`An error has occured ${err}`);
  }
});
// listening port
app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON ${PORT}`);
});
