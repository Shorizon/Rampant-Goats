const express = require('express');
const cors = require('cors');
const logger = require("./logger");
const app = express();
const flashcard = require("./flashcard");
const userList = require("../server/assets/account-hold");

app.use(cors());
app.use(express.json())
app.use(logger);

const noDuplicates = flashcard.filter((v, i, a) => a.findIndex(v2 => ['content', 'corAnswer'].every(k => v2[k] === v[k])) === i) 

app.get(`/flashcard/login/:username/:password`, (req, res) => {
    const username = req.params["username"];
    const password = req.params["password"];

    const exists = userList.filter(u => u["username"] == username && u["password"] == password)

    console.log(exists)
    if(exists.length){
        res.json(exists)
    } else{
        res.status(404).json({
            error: "username and password do not match"
        })
    }

})


app.get("/", (req, res) => {
    res.send(noDuplicates);
})

app.get('/flashcard', (req, res) => {
    
    res.json(noDuplicates);
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

app.post("/flashcard/signup", (req, res) => {
    const newUser = req.body;
    const missingField = ["username", "password"].some(fc => !Object.hasOwn(newUser, fc));
    
    const found  = userList.filter(q => q["username"] == newUser.username)

    if (missingField) {
        res.status(400).json({
            "error": "username or password field missing"
        })
    } else {
        
        if(found.length > 0){
            res.status(409).json({
                "error": "ID is already taken"
            })
        }

        userList.push(newUser);
        res.status(201).json(newUser);
    }

})

module.exports = app;
