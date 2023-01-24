const flashCard = document.getElementById("#flashCard")
flashCard.addEventListener("click", flipCard)

function flipCard(){
    flipCard.classList.toggle("flip")
}
