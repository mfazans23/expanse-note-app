const button = document.getElementById("transaction__button");
const transactionText = document.getElementById("transaction__input--text");
const transactionAmount = document.getElementById("transaction__input--amount");
const historyEl = document.getElementById("history__list");
const balanceEl = document.getElementById("balance__value");
const incomeEl = document.getElementById("info__value--income");
const expanseEL = document.getElementById("info__value--expanse");

let income = 0,
  expanse = 0,
  balance = 0;
let transactions = [];

function calcIncomeExpanseBalance() {
  income = expanse = balance = 0;
  if (transactions.length > 0) {
    transactions.forEach((el) => {
      if (el["amount"] > 0) {
        income += el["amount"];
      } else {
        expanse += Math.abs(el["amount"]);
      }
      balance += el["amount"];
    });
  }
}

function updateUI() {
  incomeEl.innerHTML = `$${income}`;
  expanseEL.innerHTML = `$${expanse}`;
  balanceEl.innerHTML = `$${balance}`;

  historyEl.innerHTML = transactions
    .map((transaction) => {
      if (transaction["amount"] > 0) {
        return `<div class='history-list__item history-list__item--income' data-value='${transaction["amount"]}'>
        <span>${transaction["text"]}</span><span>${transaction["amount"]}</span><i class="fas fa-window-close"></i>
      </div>`;
      } else {
        return `<div class='history-list__item history-list__item--expanse' data-value='${transaction["amount"]}'>
        <span>${transaction["text"]}</span><span>${transaction["amount"]}</span><i class="fas fa-window-close"></i>
      </div>`;
      }
    })
    .join("");
  transactionText.value = "";
  transactionAmount.value = "";

  incomeEl.classList.add("animate");
  expanseEL.classList.add("animate");
  balanceEl.classList.add("animate");

  setTimeout(() => {
    incomeEl.classList.remove("animate");
    expanseEL.classList.remove("animate");
    balanceEl.classList.remove("animate");
  }, 700);
}

function addTransaction(text, amount) {
  const newTransaction = {
    text: text,
    amount: amount,
  };
  transactions.push(newTransaction);
}

function deleteTransaction(index) {
  transactions.splice(index, 1);
}

button.addEventListener("click", () => {
  const textInput = transactionText.value;
  const amountInput = parseInt(transactionAmount.value);

  if (textInput.length > 0 && amountInput !== 0 && !Number.isNaN(amountInput)) {
    addTransaction(textInput, amountInput);
    calcIncomeExpanseBalance();
    updateUI();
  } else {
    alert("Check your input");
  }
});

historyEl.addEventListener("click", (e) => {
  if (e.target.tagName == "I") {
    const historyListItem = e.path[1];

    const indexOfItem = [...historyEl.children].indexOf(historyListItem);
    deleteTransaction(indexOfItem);
    calcIncomeExpanseBalance();
    updateUI();
  }
});
