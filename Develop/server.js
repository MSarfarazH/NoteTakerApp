const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3001;
app.use(express.static("public"))

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "./public/notes.html"))
}) 
app.get("/api/notes", function(req, res){
    const notes = fs.readFileSync(path.join(__dirname, "./db/db.json" ), "utf8")
    console.log(notes)
    res.json(JSON.parse(notes))
})





