const expenseBtn = document.querySelector('.expense-tab');
const incomeBtn = document.querySelector('.income-tab');
const investmentBtn = document.querySelector('.investment-tab');
const allBtn = document.querySelector('.all-tab');

const expenseUL = document.querySelector('#expense-list');
const incomeUL = document.querySelector('#income-list');
const investmentUL = document.querySelector('#investment-list');
const allUL = document.querySelector('#all-list');

const expenseList = document.querySelector('#expense-list .list');
const incomeList = document.querySelector('#income-list .list');
const investmentList = document.querySelector('#investment-list .list');
const allList = document.querySelector('#all-list .list');

const expenseDesc = document.querySelector('#expense-title-input');
const expenseAmount = document.querySelector('#expense-amount-input');
const incomeDesc = document.querySelector('#income-title-input');
const incomeAmount = document.querySelector('#income-amount-input');
const investmentDesc = document.querySelector('#investment-title-input');
const investmentAmount = document.querySelector('#investment-amount-input');

const addExpense = document.querySelector('.add-expense');
const addExpense1 = document.querySelector('#expense-amount-input');
const addIncome = document.querySelector('.add-income');
const addIncome1 = document.querySelector('#income-amount-input');
const addInvestment = document.querySelector('.add-investment');
const addInvestment1 = document.querySelector('#investment-amount-input');

const balance = document.querySelector('.balance-value');

var totalExpense = parseInt(localStorage.getItem("totalExpense")) || 0;
var totalIncome = parseInt(localStorage.getItem("totalIncome")) || 0;
var totalInvestment = parseInt(localStorage.getItem("totalInvestment")) || 0;

let entriesList = JSON.parse(localStorage.getItem("entries")) || [];
update();


expenseBtn.addEventListener('click', function(){
    active(expenseBtn);
    inactive([incomeBtn, allBtn, investmentBtn]);
    expenseUL.classList.remove("hide");
    //show(expenseUL);
    //hide([incomeUL, allUL]);
    incomeUL.classList.add("hide");
    allUL.classList.add("hide");
    investmentUL.classList.add("hide");

});

incomeBtn.addEventListener('click', function(){
    //show(incomeUL);
    //hide([expenseUL, allUL]);
    incomeUL.classList.remove("hide");
    allUL.classList.add("hide");
    expenseUL.classList.add("hide");
    investmentUL.classList.add("hide");
    active(incomeBtn);
    inactive([expenseBtn, investmentBtn, allBtn]);
});

investmentBtn.addEventListener('click', function(){
    //show(incomeUL);
    //hide([expenseUL, allUL]);
    investmentUL.classList.remove("hide");
    allUL.classList.add("hide");
    expenseUL.classList.add("hide");
    incomeUL.classList.add("hide");
    active(investmentBtn);
    inactive([expenseBtn, incomeBtn, allBtn]);
});

allBtn.addEventListener('click', function(){
    active(allBtn);
    inactive([incomeBtn, expenseBtn, investmentBtn]);
    incomeUL.classList.add("hide");
    expenseUL.classList.add("hide");
    investmentUL.classList.add("hide");
    allUL.classList.remove("hide");


    // show(allUL);
    // hide([incomeUL, expenseUL]);
});

function active( el ) {
    el.classList.add("active");
}

function inactive( elArray ) {
    elArray.forEach(element => {
        element.classList.remove("active");
    });
}

function show( el ) {
    el.classList.remove("hide");
}

function hide( elArray ) {
    elArray.forEach(element => {
        element.classList.add("hide");
    });
}

function toAddExpense () {
    let entry = {
        type : "expense",
        desc : expenseDesc.value,
        amount : parseInt(expenseAmount.value)
    }
    entriesList.push(entry);
    totalExpense += parseInt(expenseAmount.value);
    update();
    clear([ expenseDesc, expenseAmount]);
}

addExpense.addEventListener("click", toAddExpense);
addExpense1.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        toAddExpense();
    }
});

// Check later if we can update
// addExpense.addEventListener("invalid", function() {
//     alert("please put valid values!");
// });

function toAddIncome () {
    let entry = {
        type : "income",
        desc : incomeDesc.value,
        amount : parseInt(incomeAmount.value)
    }
    entriesList.push(entry);
    totalIncome += parseInt(incomeAmount.value);
    update();
    clear([ incomeDesc, incomeAmount]);
}

addIncome.addEventListener("click", toAddIncome);
addIncome1.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        toAddIncome();
    }
});

function toAddInvestment() {
    let entry = {
        type : "investment",
        desc : investmentDesc.value,
        amount : parseInt(investmentAmount.value)
    }
    entriesList.push(entry);
    totalInvestment += parseInt(investmentAmount.value);
    update();
    clear([ investmentDesc, investmentAmount]);
}

addInvestment.addEventListener("click", toAddInvestment);
addInvestment1.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        toAddInvestment();
    }
});


function clear( elArray ){
    elArray.forEach(element=>{
        element.value = "";
    })
}

var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
var d = new Date();
document.querySelector('.month h3').innerHTML =  `${monthNames[d.getMonth()]} ${d.getFullYear()}`;


function show(list, type, desc, amount, index) {
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    var d = new Date();
    const entry = ` <li id="${index}" class="${type}">
                    <div class="date"> ${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()} </div>
                    <div class="entry"> 
                    <div class = "desc"> ${desc} : </div>
                    <div class="amount"> ${amount} </div>
                    <div id="delete"></div>
                    </li> `;
    list.insertAdjacentHTML ("afterBegin", entry);
}

function update() {

    let finalAmount = Math.abs(totalIncome-(totalInvestment+totalExpense));
    let sign = ((totalExpense+totalInvestment)<=totalIncome) ? "₹" : "-₹";

    balance.innerHTML = `${sign}${finalAmount}`;
    document.querySelector('.expense-amount .value').innerHTML = `₹${totalExpense}`;
    document.querySelector('.income-amount .value').innerHTML = `₹${totalIncome}`;
    document.querySelector('.investment-amount .value').innerHTML = `₹${totalInvestment}`;

    clearList([ expenseList, incomeList, investmentList, allList]);
    entriesList.forEach ( (entry, index) => {
        if (entry.type=="expense")
            show(expenseList, entry.type, entry.desc, entry.amount, index);
        else if (entry.type=="income")
                show(incomeList, entry.type, entry.desc, entry.amount, index); 
        else if (entry.type == "investment")
                show (investmentList, entry.type, entry.desc, entry.amount, index);
        
        show(allList, entry.type, entry.desc, entry.amount, index);
    });

    pieChart (totalExpense, totalIncome, totalInvestment);

    localStorage.setItem("entries", JSON.stringify(entriesList));
    localStorage.setItem("totalExpense", totalExpense);
    localStorage.setItem("totalIncome", totalIncome);
    localStorage.setItem("totalInvestment", totalInvestment);
 }

 function clearList (Array) {
    Array.forEach(element => {
        element.innerHTML = "";
    })
}

console.log(entriesList);


//CHART
function pieChart(expense=0, income=0, investment=0) {
    let myChart = document.getElementById('chart').getContext('2d');
    let chart = new Chart(myChart, {
        type : 'pie',
        data : {
            labels : ['Expense', 'Income', 'Investment'],
            datasets : [{ 
                data : [expense, income, investment],
                backgroundColor : [ '#ff3030', 'green', '#fdee87'],
                hoverBackgrounColor : [ '#ff000', '006918', '#fee227'],
                borderWidth : [0,0,0]
            }]
        
        },
        options : {
            legend : {
                display: false
            },
            layout : {
                padding : {
                    top : 20
                }
            }
        }
        });
    }


expenseList.addEventListener("click", Delete);
incomeList.addEventListener("click", Delete);
investmentList.addEventListener("click", Delete);
allList.addEventListener("click", Delete);


function Delete(event){
    if( event.target.id == "delete" ){
        let amount = (parseInt(event.path[2].childNodes[3].children[1].innerText));
        entriesList.splice( event.path[2].id, 1);
        if (event.path[2].className == 'expense') {
            totalExpense-=amount;
        } 
        else if (event.path[2].className == 'income') {
            totalIncome-=amount;
        } 
        else if (event.path[2].className == 'investment') {
            totalInvestment-=amount;
        } 
        update();
    }
}



