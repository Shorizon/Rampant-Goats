
async function displayFlashcard() {
    const res = await fetch("http://localhost:3000/flashcard");
    const flashcard = await res.json();
    const contentElement = document.querySelector("#content");
    const answer1Element = document.querySelector("#answer1");
    const answer2Element = document.querySelector("#answer2");
    const answer3Element = document.querySelector("#answer3");
    const answer4Element = document.querySelector("#answer4");
    contentElement.textContent = flashcard[0]["content"];
    answer1Element.textContent = flashcard[0]["answer1"];
    answer2Element.textContent = flashcard[0]["answer2"];
    answer3Element.textContent = flashcard[0]["answer3"];
    answer4Element.textContent = flashcard[0]["answer4"];
    
  }



const show = document.querySelector("#show-button");
show.addEventListener('click', displayFlashcard);



