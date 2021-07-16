//Requiring the relevant libraries 
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
let notes = JSON.parse(fs.readFileSync(path.join(__dirname, "./db/db.json" ), "utf8"))
console.log(notes)

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Establishing the port
const PORT = process.env.PORT || 3001;
app.use(express.static("public"))

//Created route for notes page
app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "./public/notes.html"))
}) 

//Parsed api/notes page
app.get("/api/notes", function(req, res){
    
    res.json(notes)
    console.log(notes)
})

//Created route for the homepage
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "./public/index.html"))
}) 

//Creates and stores a new note
app.post("/api/notes", function(req, res) {

    let addNote = req.body;
    let thisID = notes.length;

    addNote["id"] = thisID +1;
    thisID++;
    
    notes.push(addNote);
    console.log(addNote);

    fs.writeFile("db/db.json", JSON.stringify(notes), function (err) {
        if (err) {
            console.log("error")
            return console.log(err);
        }
    })
    return res.status(200).send("Note Added");
})

//Deletes a note
app.delete("/api/notes/:id", function(req, res) {
    notes.splice(req.params.id, 1);
    
    fs.writeFile("db/db.json", JSON.stringify(notes), function (err) {
        if (err) {
            console.log("error")
            return console.log(err);
        }
    })
});

//Shows that the server is now listenting on the given port
app.listen(PORT, function () {
    console.log('Note Taker is listening on port ' + PORT);
})




