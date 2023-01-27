let username, password, verPassword = undefined;

document.getElementById("login").addEventListener('click', login)
document.getElementById("sign-up-button").addEventListener('click', signUp)



async function login(event) {

    event.preventDefault()

    usernameform = document.getElementById("username")
    passwordform = document.getElementById("password")

    const res = await fetch(`http://localhost:3000/flashcard/login/${usernameform.value}/${passwordform.value}`);
    const currentUser = await res.json();
    const user = currentUser[0].username

    if (currentUser) {
        alert(`logged in as : ${user}`)
        sessionStorage.setItem("user", user)
        window.location.replace("../HTML/landing-page.html")
    }

}

async function signUp(event) {
    event.preventDefault()
    username = document.getElementById("username-signup").value
    password = document.getElementById("password-signup").value
    verPassword = document.getElementById("verPassword-signup").value

    if (password == verPassword) {
        let user = {
            "username": username,
            "password": password
        }
       
        const options = {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }
    
          const response = await fetch(`http://localhost:3000/flashcard/signup`, options)
          
          if (response.status == 201) {
            console.log("received")
          }

    } else {
        alert("please check your credential")
    }
    
   


}
