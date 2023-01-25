

let username, password = undefined;

document.getElementById("login").addEventListener('click', login )



async function login(event) {

    event.preventDefault()

    usernameform = document.getElementById("username")
    passwordform = document.getElementById("password")
  
    const res = await fetch(`http://localhost:3000/flashcard/login/${usernameform.value}/${passwordform.value}`);
    const currentUser = await res.json();
    const user = currentUser[0].username

    if(currentUser){
        alert(`logged in as : ${user}`)
        sessionStorage.setItem("user", user)
        window.location.replace("./index.html")
    }

}
