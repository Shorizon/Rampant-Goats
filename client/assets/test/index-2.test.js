/**
 * @jest-environment jsdom
 */

const { JSDOM } = require("jsdom");
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../../index-2.html'), 'utf8');
const { document } = new JSDOM(html).window;
const { flipCard } = require("./index-2.js")

test("testing adding and removing flip class", () => {
    const card = document.getElementById("flashcard")
    const subButton = document.getElementById("submit-button");
    subButton.addEventListener("click", flipCard);
    subButton.click();
    expect(card.classList.contains("flip")).toBe(true)
})
