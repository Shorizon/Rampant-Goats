
//////// View flashcards in categories START /////////////
let arr = [];
let data = undefined;

document.getElementById('import').onclick = async function () {
  let files = document.getElementById('selectFiles').files;
  if (!files.length)
    return false;
  let scanner = new FileReader();

  scanner.onload = function (e) {
    let result = JSON.parse(e.target.result);
    for (let key in result) {
      for (let key2 in key) {
        data = result[key][key2]
        if (data != undefined)
          arr.push(data)
      }
    }
    sendData(arr);
    arr = []
  }
  
  scanner.readAsText(files.item(0));

};
//////// Read from uploaded json file End /////////////

////////// Send the fetch request over to the server START /////////////
async function sendData(arr) {

  console.log(arr.length + "check")
  

  for (let e of arr) {
    let data = {
      'content': e.content,
      'answer1': e.answer1,
      'answer2': e.answer2,
      'answer3': e.answer3,
      'answer4': e.answer4,
      'corAnswer': e.corAnswer,
      'category': e.category,
      'corIndex' : e.corIndex
    }

    
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

