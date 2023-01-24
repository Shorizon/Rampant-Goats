
// // //////// Hamburger menu on click event to pull out sidebar animation START /////////////
// document.querySelector(".hamburger-menu").addEventListener("click", () => {
//   document.querySelector(".container").classList.toggle("change")
// })
// //////// Hamburger menu on click event to pull out sidebar animation END /////////////



// //////// Switch color button functionality START /////////////
// const switchColorBtn = document.querySelector("#switch-color")
// const body = document.querySelector("body")
// const flashcard = document.querySelector(".flashcard")

// let bodyColors = ["#0081C9", "white"];
// let flashcardColors = ["#FFC93C", "purple"];
// let bodyColorIndex = 0;
// let flashcardColorIndex = 0;

// switchColorBtn.addEventListener("click", function() {
// body.style.backgroundColor = bodyColors[bodyColorIndex];
// flashcard.style.backgroundColor = flashcardColors[flashcardColorIndex];
// bodyColorIndex = (bodyColorIndex+1) % bodyColors.length;
// flashcardColorIndex = (flashcardColorIndex+1) % flashcardColors.length;
// });
// // //////// Switch color button functionality END /////////////


let next = 0;
let fLength;
let sub;

async function displayFlashcard(next, category) {
  const res = await fetch(`http://localhost:3000/flashcard/${category}`);
  const flashcard = await res.json();
  fLength = flashcard.length
  console.log(fLength)
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


const showButtons = Array.from(document.getElementsByClassName("sub-button"));



showButtons.forEach(e => {
  e.addEventListener('click', (f) => {
    sub = f.target.id
  })
  e.addEventListener('click', function () { displayFlashcard(next, sub) })
})


document.getElementById("next-button").onclick = function () {

  if (next < fLength - 1) {
    displayFlashcard((next = next + 1), sub)
  }
  else {
    console.log("there are no more flashcards left!!!")
  }

};

document.getElementById("previous-button").onclick = function () {

  if (next > 0) {
    displayFlashcard((next = next - 1), sub)
  }
  else {
    console.log("you are already at the starting flashcard!")

  }
};

