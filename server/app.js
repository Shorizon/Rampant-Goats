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



module.exports = app;
