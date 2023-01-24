const card = document.getElementById("flashCard")
card.addEventListener("click", flipCard)

function flipCard(){
    card.classList.toggle("flip")
}
