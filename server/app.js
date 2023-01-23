const express = require('express');
const cors = require('cors');
const logger = require("./logger");
const flashcard = require('./flashcard');
const app = express();

app.use(cors());
app.use(express.json())
app.use(logger);

app.get("/", (req, res) => {
    res.send(`Welcome to the rampant-goats API! There are ${flashcard.length} available.`);
})


app.get('/flashcard', (req, res) => {
    res.json(flashcard);
})

app.get('/flashcard/:category', (req, res) => {
    const category = req.params["category"];
    const filtered = flashcard.filter(q => q["category"] == category);

    if (flashcard) {
        res.json(flashcard);
    } else {
        res.status(404).json({
            error: "There is no flashcard with such category"
        })
    }
})

app.post("/flashcard", (req, res) => {
    const newFlashcard = req.body;
    const missingField = ["content", "answer1","answer2","answer3","answer4","corAnswer","category"].some(fc => !Object.hasOwn(newFlashcard, fc));

    if (missingField) {
        res.status(400).json({
            "error": "your flashcard is missing something!"
        })
    } else {
        flashcard.push(newFlashcard);
        res.status(201).json(newFlashcard);
    }
})


module.exports = app;
