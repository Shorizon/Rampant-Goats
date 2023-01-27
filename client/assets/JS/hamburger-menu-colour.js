
// // //////// Hamburger menu on click event to pull out sidebar animation START /////////////
document.querySelector(".hamburger-menu").addEventListener("click", () => {
    document.querySelector(".container").classList.toggle("change")
  })
  
  /////////// Hamburger menu on click event to pull out sidebar animation END /////////////
  
  
  
  
  ////// Switch color button functionality START ///////////////
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
  
  ////// Switch color button functionality END /////////////
