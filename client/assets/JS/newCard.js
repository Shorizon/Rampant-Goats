let question = document.getElementById("content");
let answer1 = document.getElementById("ans1");
let answer2 = document.getElementById("ans2");
let answer3 = document.getElementById("ans3");
let answer4 = document.getElementById("ans4");
let corAnswer = document.getElementById("cor");
let corIndex = document.getElementById("indCor");
let category = document.getElementById("cat");
let data = {};
let arrCat = ["History","Art","Music","English"]


document.getElementById("create").addEventListener('click', newCard)


async function newCard() {

    if (question.value, answer1.value, answer2.value, answer3.value, answer4.value, corAnswer.value, corIndex.value, category.value != undefined) {
        
        if (isNaN(corIndex.value) != false || parseInt(corIndex.value) > 3 || parseInt(corIndex.value) < 0){
            alert("the correct index should be between 0 and 3")
            corIndex.value = ""
            return
        
        }

        if(!arrCat.includes(capitalize(category.value))){
            alert("please choose a category between: History,Art,Music and English")
            category.value= ""
            return
        }

        if(corAnswer.value == answer1.value || corAnswer.value == answer3.value || corAnswer.value == answer3.value){
            
        }else{
            alert("please enter a correct answer that is the same as one of the given answers")
            corAnswer.value= ""
            return
        }



        data = {
            'content': question.value,
            'answer1': answer1.value,
            'answer2': answer2.value,
            'answer3': answer3.value,
            'answer4': answer4.value,
            'corAnswer': corAnswer.value,
            'category': category.value,
            'corIndex': parseInt(corIndex.value)
        }

        console.log(data)
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
            alert("list of flashcards has been successfully updated!!!")
            location.reload();
        }


    } else {
        alert("please fill in the form with the correct information")
    }




}

function capitalize(s)
{
    return s[0].toUpperCase() + s.slice(1);
}
