let price = 19.5;
let cid = [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]];

const CURRENCY_UNIT = {
  "ONE HUNDRED": 100,
  TWENTY: 20,
  TEN: 10,
  FIVE: 5,
  ONE: 1,
  QUARTER: 0.25,
  DIME: 0.1,
  NICKEL: 0.05,
  PENNY: 0.01
};

const roundToTwoDecimals = (number) => Math.round(number * 100) / 100;

const calculateTotal = (items) => items.reduce((sum, [_, amount]) => sum + amount, 0);

function checkCashRegister(price, cash, registerContents) {
  const changeDue = roundToTwoDecimals(cash - price);
  const totalInRegister = calculateTotal(registerContents);

  if (totalInRegister < changeDue) {
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  }

  if (totalInRegister === changeDue) {
    return { status: "CLOSED", change: registerContents };
  }

  const registerMap = new Map(registerContents);
  const change = [];
  let remainingChange = changeDue;

  for (const [currency, unit] of Object.entries(CURRENCY_UNIT)) {
    const available = registerMap.get(currency) || 0;
    const maxUnits = Math.floor(remainingChange / unit);
    const unitsToUse = Math.min(maxUnits, Math.floor(available / unit));

    if (unitsToUse > 0) {
      const amountUsed = roundToTwoDecimals(unitsToUse * unit);
      change.push([currency, amountUsed]);
      remainingChange = roundToTwoDecimals(remainingChange - amountUsed);
    }
    if (remainingChange === 0) break;
  }

  return remainingChange > 0 
    ? { status: "INSUFFICIENT_FUNDS", change: [] }
    : { status: "OPEN", change };
}

const makePurchase = () => {
  const cashInput = document.getElementById("cash");
  const changeDisplay = document.getElementById("change-due");
  const cashAmount = parseFloat(cashInput.value);

  if (isNaN(cashAmount) || cashAmount < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  const roundedCash = roundToTwoDecimals(cashAmount);
  const roundedPrice = roundToTwoDecimals(price);

  if (roundedCash === roundedPrice) {
    changeDisplay.textContent = "No change due - customer paid with exact cash";
    return;
  }

  const { status, change } = checkCashRegister(price, cashAmount, cid);
  
  changeDisplay.textContent = status === "INSUFFICIENT_FUNDS"
    ? "Status: INSUFFICIENT_FUNDS"
    : `Status: ${status} ${change
        .filter(([, amount]) => amount > 0)
        .map(([currency, amount]) => `${currency}: $${amount}`)
        .join(" ")}`;
};

const handleInput = (e) => {
    if (e.type === 'click' || (e.type === 'keypress' && e.key === 'Enter')) {
        makePurchase();
    }
};
const purchaseBtn = document.getElementById("purchase-btn");
purchaseBtn.addEventListener('click', handleInput);
purchaseBtn.addEventListener('keypress', handleInput);