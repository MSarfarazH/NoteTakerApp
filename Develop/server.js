//Requiring the relevant libraries 
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

//Establishing the port
const PORT = process.env.PORT || 3001;
app.use(express.static("public"))

//Created route for notes page
app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "./public/notes.html"))
}) 

//Created route for api/notes page
app.get("/api/notes", function(req, res){
    const notes = fs.readFileSync(path.join(__dirname, "./db/db.json" ), "utf8")
    console.log(notes)
    res.json(JSON.parse(notes))
})

//Created route for the homepage
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "./public/index.html"))
}) 

//Shows that the server is now listenting on the given port
app.listen(PORT, function () {
    console.log('Note Taker is listening on port ' + PORT);
})




