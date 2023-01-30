

function getUserInput() {


    let loanInput = document.getElementById('loanAmountInput').value;
    let termLengthInput = document.getElementById('termInput').value;
    let interestRateInput = document.getElementById('interestRateInput').value;
    loanInput = parseInt(loanInput);
    termLengthInput = parseInt(termLengthInput);
    interestRateInput = parseInt(interestRateInput);





    let monthlyPayment = monthlyPaymentCalculator(loanInput, termLengthInput, interestRateInput);

    console.log(monthlyPayment)
    
    const largeArray = interestRateCalculator(loanInput, termLengthInput, interestRateInput, monthlyPayment);
    

    



    displayMortgageTable(termLengthInput, monthlyPayment, largeArray);



  




}


function monthlyPaymentCalculator(loanAmount, termLength, interestRate) {

    // stepOne - interestRate / 1200
    let stepOne = interestRate / 1200;
    //
    let stepTwo = loanAmount * stepOne;

    let stepThree = 1 + stepOne;

    let negativeTerm = -Math.abs(termLength);

    let stepFour = Math.pow(stepThree, negativeTerm);

    let stepFive = 1 - stepFour;

    let stepSix = stepTwo / stepFive;


    return stepSix;








}

function interestRateCalculator(initialLoan, termLength, interestRate, monthlyPayment) {
    let parentArray = [];

    let principleArray = [];

    let interestArray = [];

    let balanceArray = [];

    let initialInterest = initialLoan * interestRate / 1200;

    let initialPrinciple = monthlyPayment - initialInterest;

    let firstNewBalance = initialLoan - initialPrinciple;


    balanceArray.unshift(firstNewBalance);




    for (let i = 1; i < termLength; i++) {


        let nextInterest = firstNewBalance * interestRate / 1200;

        let nextPrinciple = monthlyPayment - nextInterest;

        firstNewBalance -= nextPrinciple;

        principleArray.push(nextPrinciple);

        interestArray.push(nextInterest);

        balanceArray.push(firstNewBalance);

    }

    principleArray.unshift(initialPrinciple);
    interestArray.unshift(initialInterest);

    console.log(principleArray);
    console.log(interestArray);
    console.log(balanceArray);
    


    parentArray.push(principleArray);
    parentArray.push(interestArray);
    parentArray.push(balanceArray);



  
    return parentArray;




}


function displayMortgageTable(termLength, monthlyPayment, parentArray) {


    console.log(parentArray);

    let pArray = parentArray.shift();

    let iArray = parentArray.shift();

    let balanceArray = parentArray.shift();













    let tableBody = document.getElementById('tableEvent');
    const tableRowTemplate = document.getElementById('eventTableRowTemplate');
    tableBody.innerHTML = '';



    for (let i = 1; i < termLength; i++) {
        let eventRow = document.importNode(tableRowTemplate.content, true);
        let tableCells = eventRow.querySelectorAll('td');



        tableCells[0].textContent = i;
        tableCells[1].textContent = monthlyPayment;
        tableCells[2].textContent = pArray[i - 1];
        tableCells[3].textContent = iArray[i - 1];
        tableCells[4].textContent = balanceArray[i - 1];


        tableBody.appendChild(eventRow);



    }

  




       


}













function displayTotals() {

}



