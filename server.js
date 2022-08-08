// necessary packages
const express = require("express");
const path = require("path");

const app = express();
const apiRoute = require("./routes/api");

// code to run api in browser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log(__dirname);

app.use("/api", apiRoute);
app.use(express.static("public"));

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});

// ensures that heroku will be able to add its own port once deployed.
app.listen(process.env.PORT || 3001);
