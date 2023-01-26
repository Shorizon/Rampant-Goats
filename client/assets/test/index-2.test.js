/**
 * @jest-environment jsdom
 */

// const { JSDOM } = require("jsdom");
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../../index-2.html'), 'utf8').toString();
// const { document } = new JSDOM(html).window;
document.documentElement.innerHTML = html
const { increaseCount, updateProgress } = require("./functions.js")

test('increaseCount function should return 1', () => {
    expect(increaseCount()).toBe(1);
  });
  
test('updateProgress function should update the width and text of the progressBarFill', () => {
    // Mock element to represent the progressBarFill
    const progressBarFill = { style: { width: '0%' }, textContent: '' };
    // Call updateProgress function with a questionNum of 2
    updateProgress(2,progressBarFill);
    // Width and text of the progressBarFill have been updated
    expect(progressBarFill.style.width).toBe('40%');
    expect(progressBarFill.textContent).toBe('2/5');
});
  




// test("There is a thing in the document", () => {
//     const button = document.querySelector("#clicker");
//     expect(button).not.toBe(null);
// })

// test("testing adding and removing flip class", () => {
//     const card = document.getElementById("flashcard")
//     const subButton = document.getElementById("submit-button");
//     subButton.addEventListener("click", flipCard);
//     subButton.click();
//     expect(card.classList.contains("flip")).toBe(false)
// })
