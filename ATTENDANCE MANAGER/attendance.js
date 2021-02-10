const subject = document.querySelector('.subject'); //Subject name
const addSubject = document.querySelector('.add'); //Add function
const list = document.querySelector('.list'); //list to be printed
const minPercentage = document.querySelector('.minPercent');

let subjectList = JSON.parse(localStorage.getItem("details")) || [];

showDetails();


addSubject.addEventListener("click", function(){
    if (subject.value==="" || minPercentage.value==="") {
        alert("Please enter a valid value!");
    }
    else {
        AddSubjectFunc();
    }
});
minPercentage.addEventListener("keyup", function(event) {
    if (event.key === "Enter"){
        if (subject.value==="" || minPercentage.value==="") {
            alert("Please enter a valid value!");
        }
        else {
            AddSubjectFunc();
        }
    }
});

// minPercentage.addEventListener("invalid", function() {
//     alert("Enter a valid name");
// });


function AddSubjectFunc() {
    let subjectDetails = {
        subjectName : subject.value,
        daysAttended : 0,
        totalDays : 0,
        percentage : 0,
        min_percent :  minPercentage.value
    }
    subjectList.push(subjectDetails);
    showDetails();
    clear([subject, minPercentage]);
}

console.log(subjectList);

function showDetails(value) {
    clearList();
    subjectList.forEach( (subjectDetails, index) => {
        const entry = `<li id="${index}">
                        <div class="subjectName"> ${subjectDetails.subjectName} </div>
                        
                        <div class="daysAttended"> ${subjectDetails.daysAttended} </div>
                        <div class="totalDays"> ${subjectDetails.totalDays} </div>
                        <div class="percentage"> ${subjectDetails.percentage} </div>
                        <div class="checkBoxes"> 
                            <label for="done">
                                Attended
                            </label>
                            <input name="done" type="radio" id="Attended" required>
                            <label for="done">
                                Bunked
                            </label>
                            <input name="done" type="radio" id="Bunked" required>
                        </div>
                        <div id="delete"></div>
                        </li>`
        list.insertAdjacentHTML ("afterBegin", entry);
        if (subjectDetails.totalDays != 0) {
        if (parseFloat(subjectDetails.percentage) < subjectDetails.min_percent) {
            console.log("adding");
            document.querySelector('.percentage').classList.add('min-percentage');
        }
        else{
            console.log("removing");
            document.querySelector('.percentage').classList.remove('min-percentage');

        }
    }
    })
    localStorage.setItem("details", JSON.stringify(subjectList));
}

list.addEventListener("click", function(event) {
    console.log(event);
    // let minPercentage = 
    if (event.path[0].id == "Attended") {
        subjectList[event.path[2].id].totalDays++;
        subjectList[event.path[2].id].daysAttended++;
        var tDays =subjectList[event.path[2].id].totalDays;
        var attended= subjectList[event.path[2].id].daysAttended;
        // var minimumPercent = subjectList[event.path[2].id].min_percent;
        subjectList[event.path[2].id].percentage = parseFloat((attended/tDays)*100).toFixed(2);
        // if (subjectList[event.path[2].id].percentage <minimumPercent) {
        //     event.path[0].parentNode.previousElementSibling.classList.add('.min-percentage');
        // }
        // else {
        //     event.path[0].parentNode.previousElementSibling.classList.remove('.min-percentage');
        // }
    }
    else if (event.path[0].id == "Bunked") {
        subjectList[event.path[2].id].totalDays++;
        var tDays =subjectList[event.path[2].id].totalDays;
        var attended= subjectList[event.path[2].id].daysAttended;
        //var minimumPercent = subjectList[event.path[2].id].min_percent;
        subjectList[event.path[2].id].percentage = parseFloat((attended/tDays)*100).toFixed(2);
        // if (subjectList[event.path[2].id].percentage < minimumPercent) {
        //     x=1;
        // }
        // else {
        //     event.path[0].parentNode.previousElementSibling.classList.remove('min-percentage');
        // }
    }
    clearList();
    showDetails();
});

function clear( inputs) {
    inputs.forEach(element => {
        element.value="";
    })
}

function clearList(x) {
   list.innerHTML="";
}

list.addEventListener("click", Delete);


function Delete(event){
    // const targetBtn = event.target;
    // const entry = targetBtn.parentNode;
      console.log(event.path[1].id);
    if( event.target.id == "delete" ){
        subjectList.splice( event.path[1].id, 1);
        clearList();
        showDetails();
    }
}
