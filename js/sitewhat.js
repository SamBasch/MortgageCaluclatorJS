

function getUserInput() {


    let loanInput = document.getElementById('loanAmountInput').value;
    let termLengthInput = document.getElementById('termInput').value;
    let interestRateInput = document.getElementById('interestRateInput').value;
    loanInput = parseInt(loanInput);
    termLengthInput = parseInt(termLengthInput);
    interestRateInput = parseInt(interestRateInput);





    let monthlyPayment = monthlyPaymentCalculator(loanInput, termLengthInput, interestRateInput);
    
    interestRateCalculator(loanInput, termLengthInput, interestRateInput, monthlyPayment);

    displayMortgageTable(termLengthInput, monthlyPayment);

    calculateTotals();

    displayOverview( mon);

   
  




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
    let largeArray = [];

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


    largeArray.push(principleArray);
    largeArray.push(interestArray);
    largeArray.push(balanceArray);
    



    localStorage.setItem("sb-data", JSON.stringify(largeArray));

    return;




}


function calculateTotals() {


    let largeArray = JSON.parse( localStorage.getItem('sb-data') );

    let principleArray = largeArray.shift();

    let interestArray = largeArray.shift();




    let runningTotalInterestArray = [];
    
    let totalsArray = [];

    let totalPrincple = 0;

    let totalInterest = 0;









    for (let i = 0; i < principleArray.length; i++) {

            totalPrincple += principleArray[i];
            
    }




    for (let i = 0; i < interestArray.length; i++) {

        totalInterest += interestArray[i];
        runningTotalInterestArray.push(totalInterest);
    }






    totalsArray.unshift(totalPrincple);
    totalsArray.unshift(totalInterest);


  


    localStorage.setItem("totalsData", JSON.stringify(totalsArray));

    localStorage.setItem("runningTotalInterestData", JSON.stringify(runningTotalInterestArray));
    

return;

    

}


function displayMortgageTable(termLength, monthlyPayment) {


    let largeArray = JSON.parse( localStorage.getItem('sb-data') );

    let runningInterestArray = JSON.parse( localStorage.getItem('runningTotalInterestData') );

    let pArray = largeArray.shift();

    let iArray = largeArray.shift();

    let balanceArray = largeArray.shift();













    let tableBody = document.getElementById('tableEvent');
    const tableRowTemplate = document.getElementById('eventTableRowTemplate');
    tableBody.innerHTML = '';



    for (let i = 1; i <= termLength; i++) {
        let eventRow = document.importNode(tableRowTemplate.content, true);
        let tableCells = eventRow.querySelectorAll('td');



        tableCells[0].textContent = i;
        tableCells[1].textContent = monthlyPayment.toLocaleString();
        tableCells[2].textContent = pArray[i - 1].toLocaleString();
        tableCells[3].textContent = iArray[i - 1].toLocaleString();
        tableCells[4].textContent = runningInterestArray[i - 1].toLocaleString();
        tableCells[5].textContent = balanceArray[i - 1].toLocaleString();


        tableBody.appendChild(eventRow);



    }

    return;



       


}





function displayOverview(monthlyPayment) {
        let montlyPaymentSection = document.getElementById('monthyDisplay')
}



