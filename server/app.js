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




module.exports = app;
