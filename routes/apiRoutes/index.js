const fs = require("fs");
const path = require("path");
const router = require("express").Router();

function read () {
    results = fs.readFileSync(path.join(__dirname, "../../db/db.json"))
    results = JSON.parse(results)

    return results
}

router.get('/notes', (req, res) => {
    const data = read()
    res.json(data);
});

function createNewNote (body, noteArray) {
    const note = body;
    noteArray.push(note);
    fs.writeFileSync(
      path.join(__dirname, '../../db/db.json'),
      JSON.stringify( noteArray , null, 2)
    );
    return note;
}

router.post('/notes', (req, res) => {
    body =req.body
    noteArray = read();
    req.body.id = noteArray.length.toString();
    createNewNote(body, noteArray)

    res.json(noteArray);
});

module.exports = router;