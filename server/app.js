const express = require('express');
const cors = require('cors');
const logger = require("./logger");
const app = express();
const flashcard = require("./flashcard");
const userList = require("../server/assets/account-hold");

app.use(cors());
app.use(express.json())
app.use(logger);
let noDuplicates;

function noDupli(noDuplicates) {
    return noDuplicates = flashcard.filter((v, i, a) => a.findIndex(v2 => ['content', 'corAnswer'].every(k => v2[k] === v[k])) === i);
}


app.get('/flashcard', (req, res) => {

    if (noDupli(noDuplicates).length > 0) {
        res.status(200).json(noDupli(noDuplicates));
    } else {
        res.status(400).json({ error: "flashcards are missing." })
    }

})

app.get('/flashcard/:category', (req, res) => {
    const category = req.params["category"];
    const filtered = noDupli(noDuplicates).filter(q => q["category"] == category);

    if (filtered.length > 0) {
        res.status(200).json(filtered);
    } else {
        res.status(404).json({
            error: `There is no flashcard with such category: ${category}`
        })
    }
})

app.get(`/flashcard/login/:username/:password`, (req, res) => {
    const username = req.params["username"];
    const password = req.params["password"];
    const exists = userList.filter(u => u["username"] == username && u["password"] == password)

    if (exists.length) {
        exists.password = ""
        res.status(200).json(exists)
    } else {
        res.status(404).json({
            error: "username and password do not match"
        })
    }

})

app.post("/flashcard", (req, res) => {
    const newFlashcard = req.body;
    const missingField = ["content", "answer1", "answer2", "answer3", "answer4", "corAnswer", "category", "corIndex"].some(fc => !Object.hasOwn(newFlashcard, fc));

    if (missingField ){
        res.status(400).json({
            "error": "your flashcard is missing something!"
        })
    } else {
        flashcard.push(newFlashcard);
        res.status(201).json(newFlashcard);
    }
})

app.post("/flashcard/signup", (req, res) => {
    const newUser = req.body;
    const missingField = ["username", "password"].some(fc => !Object.hasOwn(newUser, fc));

    const found = userList.filter(q => q["username"] == newUser.username)
    if (found.length > 0) {
        res.status(409).json({
            "error": "ID is already taken"
        })
    }

    userList.push(newUser);
    console.log(newUser)
    res.status(201).json({ "message": "all good!" });


})

module.exports = { app };
