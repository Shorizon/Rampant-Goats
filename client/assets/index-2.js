
// // //////// Hamburger menu on click event to pull out sidebar animation START /////////////
document.querySelector(".hamburger-menu").addEventListener("click", () => {
  document.querySelector(".container").classList.toggle("change")
})
// //////// Hamburger menu on click event to pull out sidebar animation END /////////////


//////// Switch color button functionality START /////////////
const switchColorBtn = document.querySelector("#switch-color")
const body = document.querySelector("body")
const flashcard = document.querySelector(".flashcard")

let bodyColors = ["#0081C9", "white"];
let flashcardColors = ["#FFC93C", "purple"];
let bodyColorIndex = 0;
let flashcardColorIndex = 0;

switchColorBtn.addEventListener("click", function () {
  body.style.backgroundColor = bodyColors[bodyColorIndex];
  flashcard.style.backgroundColor = flashcardColors[flashcardColorIndex];
  bodyColorIndex = (bodyColorIndex + 1) % bodyColors.length;
  flashcardColorIndex = (flashcardColorIndex + 1) % flashcardColors.length;
});
//////// Switch color button functionality END /////////////

//////// View flashcards in categories START /////////////
let next = 0;
let fLength;
let sub;
let arr = [];

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
//////// View flashcards in categories END /////////////

//////// Submit button revels back of flashcard /////////////


const card = document.getElementById("flashcard")
const subButton = document.getElementById("submit-button")
subButton.addEventListener("click", flipCard)


function flipCard(){
    card.classList.toggle("flip")
}
//////// Submit button revels back of flashcard /////////////


//////// Go to the nextprevious flashcard START /////////////
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
////// Go to the nextprevious flashcard END /////////////

//////// Read from uploaded json file START /////////////

document.getElementById('import').onclick = async function () {
  let files = document.getElementById('selectFiles').files;
  if (!files.length)
    return false;
  let scanner = new FileReader();

  scanner.onload = function (e) {
    let result = JSON.parse(e.target.result);
    for (let key in result) {
      for (let key2 in key) {
        let data = result[key][key2]
        if (data != undefined)
          arr.push(data)
          console.log(data)
        
      }
    }
  }
  scanner.readAsText(files.item(0));
  sendData(arr)

};
//////// Read from uploaded json file End /////////////


////////// Send the fetch request over to the server START /////////////
async function sendData(arr) {

  console.log(arr.length)
  if (!arr.length) return
  let data = {};

  for (let e of arr) {
    data = {
      'content': e.content,
      'answer1': e.answer1,
      'answer2': e.answer2,
      'answer3': e.answer3,
      'answer4': e.answer4,
      'corAnswer': e.corAnswer,
      'category': e.category
    }

    console.log(data)
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }

    const response = await fetch("http://localhost:3000/flashcard", options)

    if (response.status == 201) {
      console.log("received")
    }
  }
}
////////// Send the fetch request over to the server END /////////////
