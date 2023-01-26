/**
 * @jest-environment jsdom
 */

// const { JSDOM } = require("jsdom");
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../../index-2.html'), 'utf8').toString();
// const { document } = new JSDOM(html).window;
document.documentElement.innerHTML = html
const { flipCard } = require("../index-2.js")

test("There is a thing in the document", () => {
    const button = document.querySelector("#clicker");
    expect(button).not.toBe(null);
})

test("testing adding and removing flip class", () => {
    const card = document.getElementById("flashcard")
    const subButton = document.getElementById("submit-button");
    subButton.addEventListener("click", flipCard);
    subButton.click();
    expect(card.classList.contains("flip")).toBe(false)
})
