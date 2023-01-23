
var next = 0;
var fLength = 0;
async function displayFlashcard(next) {
  const res = await fetch("http://localhost:3000/flashcard");
  const flashcard = await res.json();
  fLength = flashcard.length
  const contentElement = document.querySelector("#content");
  const answer1Element = document.querySelector("#answer1");
  const answer2Element = document.querySelector("#answer2");
  const answer3Element = document.querySelector("#answer3");
  const answer4Element = document.querySelector("#answer4");



  contentElement.textContent = flashcard[next]["content"];
  answer1Element.textContent = flashcard[next]["answer1"];
  answer2Element.textContent = flashcard[next]["answer2"];
  answer3Element.textContent = flashcard[next]["answer3"];
  answer4Element.textContent = flashcard[next]["answer4"];
}

const show = document.querySelector("#show-button");
show.addEventListener('click', displayFlashcard(next));

document.getElementById("next-button").onclick = function () {
  if (next++ < fLength) {
    displayFlashcard(next++)
  }
  else {
    console.log("there are no more flashcards left!!!")
  }
};


