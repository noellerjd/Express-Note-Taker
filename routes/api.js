const router = require("express").Router();
const fs = require("fs");
const db = require("../db/db.json");
const { v4: uuidv4 } = require("uuid");

router.get("/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send("Error: Bad Request");
    } else {
      res.json(JSON.parse(data));
    }
  });
});

router.post("/notes", (req, res) => {
  console.log(req.body);
  const { title, text } = req.body;

  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    var json = JSON.parse(data);
    json.push(req.body);

    fs.writeFile("./db/db.json", JSON.stringify(json), function (err) {
      if (err) {
        console.log(err);
      } else {
        const dbNotes = JSON.parse(data);
        dbNotes.push({ title, text, id: uuidv4() });

        fs.writeFile(
          "./db/db.json",
          JSON.stringify(dbNotes),
          "utf-8",
          (error) => {
            if (error) {
              console.log(error);
            }
          }
        );
        console.log("New note successfully added.");
        res.send("New note added.");
        res.status(200);
      }
    });
  });
});

module.exports = router;
