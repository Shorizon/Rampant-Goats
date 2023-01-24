const express = require('express');
const cors = require('cors');
const logger = require("./logger");
const app = express();
const flashcard = require("./flashcard")

app.use(cors());
app.use(express.json())
app.use(logger);

const noDuplicates = flashcard.filter((v, i, a) => a.findIndex(v2 => ['content', 'corAnswer'].every(k => v2[k] === v[k])) === i) 



app.get("/", (req, res) => {
    res.send(noDuplicates);
})


app.get('/flashcard', (req, res) => {
    
    res.json(flashcard.filter((v, i, a) => a.findIndex(v2 => ['content', 'corAnswer'].every(k => v2[k] === v[k])) === i));
    console.log(flashcard)
    
})

app.get('/flashcard/random', (req, res) => {
   
    res.json(flashcard[Math.floor(Math.random() * flashcard.length)]);
    
})

app.get('/flashcard/:category', (req, res) => {
    const category = req.params["category"];
    const filtered = noDuplicates.filter(q => q["category"] == category);

    if (filtered) {
        res.json(filtered);
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
