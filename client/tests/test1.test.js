const {fetchCard, replace} = require('./test1.js')
global.fetch = require('jest-fetch-mock')
// require('./setupTests');
const fs = require("fs");
window.document.body.innerHTML = fs.readFileSync("./client/index-2.html")

describe("replace", () => {

    test('check if replace changes HTML text content', ()=>{
        // document.body.innerHTML = '<section class="main-container">        <div class="flashcard" id="flashcard">            <div class="front">                <form class="flashcard-form">                    <label class="flashcard-name" id="content"></label><br>                    <div class = "answer-section">                        <input type="radio" name="answer"><label id="answer1">Change this text</label><br>                        <input type="radio" name="answer"><label id="answer2">Change this text</label><br>                        <input type="radio" name="answer"><label id="answer3">Change this text</label> <br>                        <input type="radio" name="answer"><label id="answer4">Change this text</label><br>                    </div>                </form>                <button id="submit-button">Submit</button>                   <button id="next-button-front">Next</button><button id="previous-button-front">Previous</button></div> <div class = "back"><label class="flashcard-name" id = "backContent"></label><br><label class="corAnswer" id = "corAnswer"></label><br><button id="next-button-back">Next</button><button id="previous-button-back">Previous</button> </div> </div></section>';
        
let flashcard = [{
    
    content : "Who painted Mona Lisa",
    answer1 : "Michelangelo",
    answer2 : "Leonardo Da Vinci",
    answer3 : "Donatello",
    answer4 : "Raphael",
    corAnswer : "Leonardo Da Vinci",
    category : "Arts",
    corIndex : 1
    
},{
    content : "How old was Mary Queen of Scots when she became queen?",
    answer1 : "1 year old",
    answer2 : "10 years old",
    answer3 : "6 days old",
    answer4 : "On the day she was born",
    corAnswer : "6 days old",
    category : "History",
    corIndex : 2
}]
const contentElement = document.querySelector("#content");
let next = 0

replace(next, flashcard)

expect(contentElement.textContent).toBe("Who painted Mona Lisa");



    })



})






// describe("fechCard", () => {
    
//     afterEach(() => {
//         fetch.resetMocks();
//     })

// test('it fetches data from the API', async() =>{
//     fetch.mockResponseOnce(JSON.stringify({
    
//         content : "Who painted Mona Lisa",
//         answer1 : "Michelangelo",
//         answer2 : "Leonardo Da Vinci",
//         answer3 : "Donatello",
//         answer4 : "Raphael",
//         corAnswer : "Leonardo Da Vinci",
//         category : "Arts",
//         corIndex : 1
        
//     }));


//     const data = await fetchCard();
    
//     expect(data).toEqual({ content : "Who painted Mona Lisa",
//     answer1 : "Michelangelo",
//     answer2 : "Leonardo Da Vinci",
//     answer3 : "Donatello",
//     answer4 : "Raphael",
//     corAnswer : "Leonardo Da Vinci",
//     category : "Arts",
//     corIndex : 1})
// }

// )})
