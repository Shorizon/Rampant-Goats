
async function fetchCard(category) {
    const res = await fetch(`http://localhost:3000/flashcard/${category}`);
    const flashcard = await res.json();
    return flashcard}
// "jest": {
//     "setupFilesAfterEnv": [
//         "<rootDir>/setupTests.js"
//     ]
// }

function replace(){
    
  const contentElement = document.querySelector("#content");
  const backContentElement = document.getElementById("backContent");
  const answer1Element = document.querySelector("#answer1");

  const corAnswer = document.querySelector("#corAnswer");

  contentElement.textContent = flashcard[next]["content"];
  backContentElement.textContent = flashcard[next]["content"];
  answer1Element.textContent = flashcard[next]["answer1"];
 
  corAnswer.textContent = flashcard[next]["corAnswer"];
}



    if (typeof exports !== 'undefined') {
        module.exports = {
            fetchCard,
            replace
        };
    }

