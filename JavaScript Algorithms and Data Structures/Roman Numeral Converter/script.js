document.addEventListener("DOMContentLoaded", () => {
  const convertBtn = document.getElementById("convert-btn");
  const numberInput = document.getElementById("number");
  const output = document.getElementById("output");
  const romanNumerals = {
    1000: "M",
    900: "CM",
    500: "D",
    400: "CD",
    100: "C",
    90: "XC",
    50: "L",
    40: "XL",
    10: "X",
    9: "IX",
    5: "V",
    4: "IV",
    1: "I"
  };

  const values = Object.keys(romanNumerals).map(Number).sort((a, b) => b - a);

  function convertToRoman(num) {
    let result = "";
    let remaining = num;

    for (const value of values) {
      while (remaining >= value) {
        result += romanNumerals[value];
        remaining -= value;
      }
      if (remaining === 0) break;
    }
    return result;
  }

  function handleConversion() {
    const num = numberInput.value.trim();
    const number = parseInt(num);
    if (!num || isNaN(number)) {
      output.textContent = "Please enter a valid number";
      return;
    }
    
    if (number < 1 || number >= 4000) {
      output.textContent = number < 1 
        ? "Please enter a number greater than or equal to 1"
        : "Please enter a number less than or equal to 3999";
      return;
    }

    output.textContent = convertToRoman(number);
  }

  convertBtn.addEventListener("click", handleConversion);
  numberInput.addEventListener("keypress", ({key}) => {
    if (key === "Enter") handleConversion();
  });
});
