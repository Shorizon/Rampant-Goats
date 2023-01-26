
// // //////// Hamburger menu on click event to pull out sidebar animation START /////////////
document.querySelector(".hamburger-menu").addEventListener("click", () => {
  document.querySelector(".container").classList.toggle("change")
})

/////////// Hamburger menu on click event to pull out sidebar animation END /////////////




////// Switch color button functionality START ///////////////
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

////// Switch color button functionality END /////////////

//////// View flashcards in categories START /////////////
let next = 0;
let fLength, sub, counterQ, correct = undefined;
let scoreboard = 0;

const queryParams = new URLSearchParams(window.location.search);
const cat = queryParams.get("category")

async function displayFlashcard(next, category) {
  const res = await fetch(`http://localhost:3000/flashcard/${category}`);
  const flashcard = await res.json();
  fLength = flashcard.length;
  counterQ = next + 1
  const contentElement = document.querySelector("#content");
  const backContentElement = document.getElementById("backContent");
  const answer1Element = document.querySelector("#answer1");
  const answer2Element = document.querySelector("#answer2");
  const answer3Element = document.querySelector("#answer3");
  const answer4Element = document.querySelector("#answer4");
  const corAnswer = document.querySelector("#corAnswer");

  contentElement.textContent = flashcard[next]["content"];
  backContentElement.textContent = flashcard[next]["content"];
  answer1Element.textContent = flashcard[next]["answer1"];
  answer2Element.textContent = flashcard[next]["answer2"];
  answer3Element.textContent = flashcard[next]["answer3"];
  answer4Element.textContent = flashcard[next]["answer4"];
  corAnswer.textContent = flashcard[next]["corAnswer"];
  correct = flashcard[next]["corIndex"]


  updateProgress(counterQ)
  checkEnd()
}
displayFlashcard(next, cat)

/////////// Progress bar live update START /////////////
const progressBarFill = document.querySelector('.progress-bar-fill');

function updateProgress(questionNum) {
  progressBarFill.style.width = (questionNum * (0.2 * 100)) + '%';
  progressBarFill.textContent = ((`${counterQ}/${fLength}`))

}
/////////// Progress bar live update END /////////////

//////// Submit button revels back of flashcard /////////////

const card = document.getElementById("flashcard")
const subButton = document.getElementById("submit-button")
subButton.addEventListener("click", flipCard)


function flipCard() {
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

  if (counterQ == fLength){
    let br = document.createElement("br")
    let span = document.createElement("span")
    span.style.fontWeight = ("bold")
    let textnode = document.createTextNode(`Congratulation you scored: ${scoreboard} out of ${fLength}`);
    corAnswer.appendChild(br)
    corAnswer.appendChild(br)
    span.appendChild(textnode)
    corAnswer.appendChild(span)
    
  }
}

//////// Go to the nextprevious flashcard START /////////////

const nextButtonBack = document.getElementById("next-button-back")
const nextButton = document.getElementById("next-button-front")
let savedNext = nextButton.style;
let savedNextBack = nextButtonBack.style;

nextButton.addEventListener('click', nextCard)
nextButtonBack.addEventListener('click', function () { flipCard(); nextCard() })
function nextCard() {

  if (next < fLength - 1) {
    displayFlashcard((next = next + 1), cat)
  }
  else {
    alert("there are no more flashcards left!!!")
  }

};


previousButton = document.getElementById("previous-button-front")
previousButtonBack = document.getElementById("previous-button-back")

previousButton.addEventListener('click', previousCard);
previousButtonBack.addEventListener('click', function () { flipCard(); previousCard() })

function previousCard() {

  if (next > 0) {
    displayFlashcard((next = next - 1), cat)
    
  }
  else {
    console.log("you are already at the starting flashcard!")

  }
};
////// Go to the nextprevious flashcard END /////////////


function checkEnd(){
  if (counterQ >= fLength ){
    nextButton.disabled = true;
    nextButtonBack.disabled = true;
    nextButtonBack.style.visibility='hidden';
    nextButton.style.backgroundColor = "gray"
    nextButton.style.color = "white"
  
   }else{   
     nextButton.disabled = false;
     nextButton.style = savedNext;
     nextButtonBack.disabled = false;
     nextButtonBack.style.visibility='visible';
     
   }
}
