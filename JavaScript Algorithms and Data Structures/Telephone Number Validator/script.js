document.addEventListener("DOMContentLoaded", function () {
  const userInput = document.getElementById("user-input");
  const checkBtn = document.getElementById("check-btn");
  const clearBtn = document.getElementById("clear-btn");
  const resultsDiv = document.getElementById("results-div");

  function validatePhoneNumber() {
    const number = userInput.value.trim();
    if (!number) {
      alert("Please provide a phone number");
      return;
    }
    const cleanNumber = number.replace(/\s+/g, "");
    const phoneRegex = /^(1\s?)?(\(\d{3}\)|\d{3})[-]?\d{3}[-]?\d{4}$/;
    const isValid = phoneRegex.test(cleanNumber);
    resultsDiv.textContent = `${
      isValid ? "Valid" : "Invalid"
    } US number: ${number}`;
  }

  checkBtn.addEventListener("click", validatePhoneNumber);

  clearBtn.addEventListener("click", () => {
    userInput.value = "";
    resultsDiv.textContent = "";
  });

  userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") validatePhoneNumber();
  });
});
