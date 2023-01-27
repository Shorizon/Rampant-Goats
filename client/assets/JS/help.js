const button = document.querySelector("#feedback-btn");
const input = document.querySelector("#textarea");
button.addEventListener("click", ()=>{
    if (input.value !== ""){
    alert("Thank you for your feedback.");
    location.reload()
} else {
    alert("Please write feedback before submitting!")
}
    
});

