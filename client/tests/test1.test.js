const {fetchCard, replaceContent} = require('./test1.js')
global.fetch = require('jest-fetch-mock')

const fs = require("fs");
window.document.body.innerHTML = fs.readFileSync("../assets/HTML/flashcards.html")

describe("replaceContent", () => {

    afterEach(()=> {
        window.document.body.innerHTML = fs.readFileSync("../assets/HTML/flashcards.html")
    })

    test('check if replace changes HTML text content', ()=>{
       
        
let card = [{
    
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
let i = 0

replaceContent(i, card)

expect(contentElement.textContent).toBe("Who painted Mona Lisa");

 i =1
 replaceContent(i, card)

 expect(contentElement.textContent).toBe("How old was Mary Queen of Scots when she became queen?");

    })
})






describe("fechCard", () => {
    
    afterEach(() => {
        fetch.resetMocks();
    })

test('it fetches data from the API', async() =>{
    fetch.mockResponseOnce(JSON.stringify({
    
        content : "Who painted Mona Lisa",
        answer1 : "Michelangelo",
        answer2 : "Leonardo Da Vinci",
        answer3 : "Donatello",
        answer4 : "Raphael",
        corAnswer : "Leonardo Da Vinci",
        category : "Arts",
        corIndex : 1
        
    }));


    const data = await fetchCard();
    
    expect(data).toEqual({ content : "Who painted Mona Lisa",
    answer1 : "Michelangelo",
    answer2 : "Leonardo Da Vinci",
    answer3 : "Donatello",
    answer4 : "Raphael",
    corAnswer : "Leonardo Da Vinci",
    category : "Arts",
    corIndex : 1})
}

)})
