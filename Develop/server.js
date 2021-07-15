const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3001;
app.use(express.static("public"))

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "./public/notes.html"))
}) 





