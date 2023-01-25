
const userSesh = document.getElementById("user-session")
const user = sessionStorage.getItem("user")

window.onload = function() {
    if (user){
        userSesh.textContent(`logged in as: ${user}`)
    };
  };
  

