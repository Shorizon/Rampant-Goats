const {fetchCard, replaceContent, updateProgress, switchColor} = require('./test1.js')
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






describe("fetchCard", () => {
    
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


describe("Progress bar", () => {

    test("The progress bar is in the document", () => {
        const progressBarFill = document.querySelector('.progress-bar-fill')
        expect(progressBarFill).not.toBe(null)
    })

    test("The progress bar's width and content can be dynamically changed", () => {
        const progressBarFill = document.querySelector('.progress-bar-fill')
        progressBarFill.style.width = "100%"
        progressBarFill.textContent = (("3/5"))
        updateProgress();
        expect(progressBarFill.style.width).toBe("100%");
        expect(progressBarFill.textContent).toBe("3/5");
    });
})

describe("Progress bar", () => {

    test("The progress bar is in the document", () => {
        const progressBarFill = document.querySelector('.progress-bar-fill')
        expect(progressBarFill).not.toBe(null)
    })

    test("The progress bar's width and content can be dynamically changed", () => {
        const progressBarFill = document.querySelector('.progress-bar-fill')
        progressBarFill.style.width = "100%"
        progressBarFill.textContent = (("3/5"))
        updateProgress();
        expect(progressBarFill.style.width).toBe("100%");
        expect(progressBarFill.textContent).toBe("3/5");
    });
})

describe("Testing if hamburger menu works", () => {

    test("Test if hamburger menu exists", () => {
        const hamburger = document.querySelector(".hamburger-menu")
        const container = document.querySelector(".container")
        expect(hamburger).not.toBe(null)
        expect(container).not.toBe(null)
    })

    test("Test if hamburger menu responds to event listener and adds change class", () => {
        const hamburger = document.querySelector(".hamburger-menu")
        const container = document.querySelector(".container")
        hamburger.addEventListener("click", () => {
            container.classList.toggle("change")
          })
    })

})

describe("Test if the switch color button changes the color of the HTML body", () => {

    test("Test if the body, button and flashcard exist", () => {
        const switchColorBtn = document.querySelector("#switch-color")
        const body = document.querySelector("body")
        const flashcard = document.querySelector(".flashcard")
        expect(switchColorBtn).not.toBe(null)
        expect(body).not.toBe(null)
        expect(flashcard).not.toBe(null)
    })

    test("Does the switch color button change the color of the body and flashcard", () => {
        const switchColorBtn = document.querySelector("#switch-color")
        const body = document.querySelector("body")
        const flashcard = document.querySelector(".flashcard")
        let bodyColor = body.style.backgroundColor
        let flashcardColor = flashcard.style.backgroundColor
        switchColor()
        expect(bodyColor).not.toBe("green")
        expect(flashcardColor).not.toBe("green")
       })
   })
