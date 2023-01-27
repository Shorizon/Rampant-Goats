
async function fetchCard(category) {
    const res = await fetch(`http://localhost:3000/flashcard/${category}`);
    const flashcard = await res.json();
    return flashcard}
// "jest": {
//     "setupFilesAfterEnv": [
//         "<rootDir>/setupTests.js"
//     ]
// }

function replaceContent(i, card){
    const next = i
    const flashcard= card
  const contentElement = document.querySelector("#content");
  const backContentElement = document.getElementById("backContent");
  const answer1Element = document.querySelector("#answer1");

  const corAnswer = document.querySelector("#corAnswer");

  contentElement.textContent = flashcard[next]["content"];
  backContentElement.textContent = flashcard[next]["content"];
  answer1Element.textContent = flashcard[next]["answer1"];
 
  corAnswer.textContent = flashcard[next]["corAnswer"];
}



function updateProgress() {
  const progressBarFill = document.querySelector('.progress-bar-fill')
  progressBarFill.style.width = "100%"
  progressBarFill.textContent = (("3/5"))
}

function switchColor() {
  const switchColorBtn = document.querySelector("#switch-color")
  const body = document.querySelector("body")
  const flashcard = document.querySelector(".flashcard")

  let bodyColors = ["#0081C9", "white", "#58B09C"];
  let flashcardColors = ["#FFC93C", "purple", "#58B09C"];
  let bodyColorIndex = 0;
  let flashcardColorIndex = 0;

  switchColorBtn.addEventListener("click", function () {
  body.style.backgroundColor = bodyColors[bodyColorIndex];
  flashcard.style.backgroundColor = flashcardColors[flashcardColorIndex];
  bodyColorIndex = (bodyColorIndex + 1) % bodyColors.length;
  flashcardColorIndex = (flashcardColorIndex + 1) % flashcardColors.length;
 });
}


function flipCard() {
  let fLength = flashcard.length;
  const card = document.getElementById("flashcard")
  card.classList.toggle("flip")
  let radiobuttons = document.getElementsByName("answer")
  let i = 0;
  radiobuttons.forEach((e) => {
    if (e.checked) {
      if (i == correct) {
        scoreboard++;
      }
      e.checked = false;
    }
    i++;
  })

  if (3 == fLength){
    let br = document.createElement("br")
    let span = document.createElement("span")
    span.style.fontWeight = ("bold")
    let textnode = document.createTextNode("Congratulations you scored: 5 out of 5");
    corAnswer.appendChild(br)
    corAnswer.appendChild(br)
    span.appendChild(textnode)
    corAnswer.appendChild(span)
    
  }
}



    if (typeof exports !== 'undefined') {
        module.exports = {
            fetchCard,
            replaceContent,
            updateProgress,
            switchColor,
            flipCard
        };
    }

