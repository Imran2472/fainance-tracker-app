const incomeParent = document.getElementById('incomeParent');
const salaryTitleInput = document.getElementById('salaryTitle');
const salaryAmountInput = document.getElementById('salaryAmount');
const IncomeDateInput = document.getElementById('IncomeDate');
const userMsgInput = document.getElementById('userMsg');
const totalIncome = document.getElementById('totalIncome');
const selectOptionParent = document.getElementById('select-option');


function addIncomeEle() {

    const salaryTitle = salaryTitleInput.value;
    const salaryAmount = salaryAmountInput.value;
    const IncomeDate = IncomeDateInput.value;
    const userMsg = userMsgInput.value;

    if (salaryTitle.length > 0 && IncomeDate.length > 0) {

        // create Element
        const incomeInputResultDivEle = document.createElement('div');
        const incomeInfoEle = document.createElement('div');
        const incomeIcon = document.createElement('i');
        const incomeInfo = document.createElement('div');
        const incomeInfoUpper = document.createElement('div');
        const div = document.createElement('div');
        const p = document.createElement('p');
        const incomeInfoLower = document.createElement('div');
        const incomeInfoLowerAmountDiv1 = document.createElement('div');
        const amount = document.createElement('p');
        const incomeInfoLowerAmountDiv2 = document.createElement('div');
        const dateIcon = document.createElement('i');
        const date = document.createElement('p');
        const incomeInfoLowerAmountDiv3 = document.createElement('div');
        const msgIcon = document.createElement('i');
        const msg = document.createElement('p');
        const deleteBtn = document.createElement('button');
        const deleteIcon = document.createElement('i');

        // build relation & add classes
        incomeParent.appendChild(incomeInputResultDivEle);
        incomeInputResultDivEle.classList.add('income-input-result-div-ele');
        incomeInputResultDivEle.appendChild(incomeInfoEle);
        incomeInfoEle.classList.add('income-info-ele');
        incomeInfoEle.appendChild(incomeIcon);
        incomeIcon.classList.add('income-icon');

        if(selectOptionParent.value == 'Salary'){
            incomeIcon.classList.add('-wallet-3-line');

        }else if(selectOptionParent.value == 'Freelancing'){
            incomeIcon.classList.add('ri-money-dollar-circle-line');

        }else if(selectOptionParent.value == 'Investiment'){
            incomeIcon.classList.add('ri-hand-coin-line');

        }else if(selectOptionParent.value == 'Stocks'){
            incomeIcon.classList.add('ri-stock-fill');

        }else if(selectOptionParent.value == 'Bitcoin'){
            incomeIcon.classList.add('ri-btc-fill');

        }else if(selectOptionParent.value == 'Bank Transfer'){
            incomeIcon.classList.add('ri-bank-fill');

        }else if(selectOptionParent.value == 'Youtube'){
            incomeIcon.classList.add('ri-youtube-fill');

        }else{
            incomeIcon.classList.add('ri-copper-coin-fill');
        }

        incomeInfoEle.appendChild(incomeInfo);
        incomeInfo.classList.add('income-info');
        incomeInfo.appendChild(incomeInfoUpper);
        incomeInfoUpper.classList.add('income-info-upper');
        incomeInfoUpper.appendChild(div);
        incomeInfoUpper.appendChild(p);
        p.innerHTML = salaryTitle;
        incomeInfo.appendChild(incomeInfoLower);
        incomeInfoLower.classList.add('income-info-lower');
        incomeInfoLower.appendChild(incomeInfoLowerAmountDiv1);
        incomeInfoLowerAmountDiv1.classList.add('income-info-lower-amount');
        incomeInfoLowerAmountDiv1.appendChild(amount);
        amount.innerHTML = `$ ${salaryAmount}`;
        incomeInfoLower.appendChild(incomeInfoLowerAmountDiv2);
        incomeInfoLowerAmountDiv2.classList.add('income-info-lower-amount');
        incomeInfoLowerAmountDiv2.appendChild(dateIcon);
        dateIcon.classList.add('ri-calendar-fill');
        incomeInfoLowerAmountDiv2.appendChild(date);
        date.innerHTML = IncomeDate;
        incomeInfoLower.appendChild(incomeInfoLowerAmountDiv3);
        incomeInfoLowerAmountDiv3.classList.add('income-info-lower-amount');
        incomeInfoLowerAmountDiv3.appendChild(msgIcon);
        msgIcon.classList.add('ri-chat-3-fill');
        incomeInfoLowerAmountDiv3.appendChild(msg);
        msg.innerHTML = userMsg;
        incomeInputResultDivEle.appendChild(deleteBtn);
        deleteBtn.classList.add('del-income-ele');
        deleteBtn.appendChild(deleteIcon);
        deleteIcon.classList.add('ri-delete-bin-7-fill');
        deleteBtn.setAttribute('onclick', 'deleteIncomeEle(this)')

        let totalIncomeval = parseInt(totalIncome.innerHTML);
        let salaryAmountNum = parseInt(salaryAmount);
        totalIncomeval = totalIncomeval + salaryAmountNum;
        totalIncome.innerHTML = totalIncomeval;

        salaryTitleInput.value = "";
        salaryAmountInput.value = "";
        IncomeDateInput.value = "";
        userMsgInput.value = "";

    }else{
        alert("Please fill all required fields");
    }

}

function deleteIncomeEle(ele){
    div = ele.parentElement;
    div.remove();
}