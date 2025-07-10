const input = document.getElementById("input");
const buttons = document.querySelectorAll(".btn");
let currentInput = "";
let openParentheses = 0;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonText = button.textContent;

    if (buttonText === "AC") {
      currentInput = "";
      openParentheses = 0;
    } else if (buttonText === "DEL") {
      currentInput = currentInput.slice(0, -1);
    } else if (buttonText === "=") {
      try {
        let expression = currentInput.replace(/%/g, "/100");
        currentInput = eval(expression).toString();
      } catch (e) {
        currentInput = "Error";
      }
    } else if (buttonText === "()") {
      if (currentInput === "" || isOperator(currentInput.slice(-1))) {
        currentInput += "(";
        openParentheses++;
      } else if (openParentheses > 0) {
        currentInput += ")";
        openParentheses--;
      } else {
        currentInput += "*(";
        openParentheses++;
      }
    } else {
      currentInput += buttonText;
    }
    input.value = currentInput;
  });
});

function isOperator(char) {
  return ["+", "-", "*", "/"].includes(char);
}
