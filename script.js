// ==========================================
// STEP 1: DOM Elements Selection (Elements ko select karna)
// ==========================================
const balanceEl = document.getElementById("netBalance");
const incomeEl = document.getElementById("totalIncome");
const expenseEl = document.getElementById("totalExpense");
const transactionForm = document.getElementById("transactionForm");
const descInput = document.getElementById("descInput");
const amountInput = document.getElementById("amountInput");
const transactionList = document.getElementById("transactionList");
const noTransactions = document.getElementById("noTransactions");

// ==========================================
// STEP 2: Global Array & LocalStorage Setup
// ==========================================
// LocalStorage se saved data load karein, agar na ho toh empty array rakhein
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// ==========================================
// STEP 3: Form Submit & New Transaction Add Karna
// ==========================================
transactionForm.addEventListener("submit", (e) => {
    // Page refresh hone se rokein
    e.preventDefault();

    const description = descInput.value.trim();
    const amount = Number.parseFloat(amountInput.value);

    if (!description || Number.isNaN(amount) || amount === 0) {
        alert("Please enter a valid description and amount.");
        return;
    }

    // Naya transaction object banayein
    const newTransaction = {
        id: Date.now(), // Unique ID time ke zariye
        desc: description,
        amount
    };

    // Array me push karein
    transactions.push(newTransaction);

    // LocalStorage aur UI update karein
    updateLocalStorage();
    init();

    // Input fields ko clear karein
    descInput.value = "";
    amountInput.value = "";
});

// ==========================================
// STEP 5 & 6: App Initialization & UI Rendering
// ==========================================
function init() {
    // Purani list clear karein taaki duplicate entries na hon
    transactionList.innerHTML = "";

    // Check karein ke transactions hain ya nahi
    if (transactions.length === 0) {
        transactionList.hidden = true;
        noTransactions.hidden = false;
    } else {
        transactionList.hidden = false;
        noTransactions.hidden = true;
        // Har transaction ke liye DOM element banayein (forEach loop)
        transactions.forEach(addTransactionDOM);
    }

    // Totals aur balance calculate karein
    updateValues();
}

// DOM me single transaction item (`<li>`) create karna
function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? "-" : "+";
    // Negative hone par red theme, positive hone par green theme
    const itemClass = transaction.amount < 0 ? "border-rose-200 bg-rose-50/50" : "border-emerald-200 bg-emerald-50/50";
    const textClass = transaction.amount < 0 ? "text-rose-600" : "text-emerald-600";

    const li = document.createElement("li");
    li.className = `flex min-w-0 justify-between items-center gap-2 px-3 sm:px-4 py-2 border rounded-lg ${itemClass}`;
    li.innerHTML = `
        <span class="min-w-0 flex-1 break-words text-gray-700 font-medium">${transaction.desc}</span>
        <div class="flex shrink-0 items-center gap-2 sm:gap-3">
            <span class="${textClass} break-all text-right font-bold">${sign}$${Math.abs(transaction.amount)}</span>
            <button onclick="removeTransaction(${transaction.id})" class="text-gray-400 hover:text-red-500 font-bold cursor-pointer">×</button>
        </div>
    `;
    transactionList.appendChild(li);
}

// ==========================================
// STEP 4: Calculations (`reduce` aur `filter` methods)
// ==========================================
function updateValues() {
    const amounts = transactions.map(t => t.amount);

    // reduce() ka use karke total net balance nikalna
    const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
    
    // filter() aur reduce() ka use karke total income nikalna (> 0)
    const income = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => acc + item, 0)
        .toFixed(2);

    // filter() aur reduce() ka use karke total expense nikalna (< 0)
    const expense = (
        amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0) * -1
    ).toFixed(2);

    // HTML elements par values show karna
    balanceEl.textContent = `$${total}`;
    incomeEl.textContent = `+$${income}`;
    expenseEl.textContent = `-$${expense}`;
}

// ==========================================
// STEP 6: Transaction Remove Karna (`filter` method)
// ==========================================
function removeTransaction(id) {
    // Us ID ke ilawa baaki saari transactions ka naya array banana
    transactions = transactions.filter(t => t.id !== id);
    
    // LocalStorage aur UI update karna
    updateLocalStorage();
    init();
}

// ==========================================
// STEP 7: LocalStorage Syncing
// ==========================================
function updateLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// App load hote hi pehli baar run karne ke liye
init();
