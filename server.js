// imports
const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
// => ejs
let ejs = require("ejs");

// utils imports
const getDay = require("./utils/date");

// constants
const app = express();
app.set("view engine", "ejs");
const dayItems = ["Buy Food", "Cook Food", "Eat Food"];
const workItems = [];

// static files
app.use(express.static("public"));
// middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  // choose the format u want :) => day or whole date
  const day = getDay.getDate();
  // const day = getDay.getDay();

  res.render("list", { title: day, items: dayItems });
});

app.post("/", (req, res) => {
  const { newItem, identifier } = req.body;

  // the data has sent to the server from the button form
  if (identifier == "Work List") {
    workItems.push(newItem);
    res.redirect("/work");
  } else {
    dayItems.push(newItem);
    res.redirect("/");
  }
});

// work route

app.get("/work", (req, res) => {
  res.render("list", { title: "Work List", items: workItems });
});

app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
