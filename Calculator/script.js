let btns = document.querySelectorAll(".btn");
let inputField = document.getElementById("input");

let currentExpression = "";
let openParenthesesCount = 0; // Tracks the number of open parentheses

// Helper function to check if a character is an operator (excluding dot and minus for special handling)
function isOperator(char) {
    return ['+', '*', '/', '%'].includes(char); // Exclude '-' and '.' here for specific logic
}

// Helper function to check if a character is a digit
function isDigit(char) {
    return char >= '0' && char <= '9';
}

btns.forEach(function(btn) {
    btn.addEventListener("click", function() {
        const buttonText = btn.textContent;
        const lastChar = currentExpression.slice(-1);
        const secondLastChar = currentExpression.slice(-2, -1);

        switch (buttonText) {
            case 'AC':
                currentExpression = "";
                inputField.value = "";
                openParenthesesCount = 0;
                break;

            case 'DEL':
                if (currentExpression.length > 0) {
                    const deletedChar = currentExpression.slice(-1);
                    currentExpression = currentExpression.slice(0, -1);
                    if (deletedChar === '(') {
                        openParenthesesCount--;
                    } else if (deletedChar === ')') {
                        openParenthesesCount++;
                    }
                    inputField.value = currentExpression;
                }
                break;

            case '=':
                if (currentExpression === "") {
                    inputField.value = "";
                    return;
                }
                // Ensure all parentheses are closed before evaluating
                if (openParenthesesCount > 0) {
                    inputField.value = "Error: Unclosed (";
                    currentExpression = ""; // Clear expression on error
                    openParenthesesCount = 0;
                    break;
                }

                try {
                    // Pre-process the expression to handle percentages correctly
                    // This regex finds numbers (integers or decimals) followed by a '%'
                    // and replaces them with (number / 100)
                    // It also handles cases like ')' immediately before '%'
                    let expressionToEval = currentExpression.replace(/(\d+\.?\d*|\))\s*%/g, (match, p1) => {
                        // If it's a closing parenthesis, apply the percentage to the result of the bracket
                        if (p1 === ')') {
                            return `* (1/100)`; // Convert ')' to ')*0.01'
                        }
                        // Otherwise, it's a number
                        return `(${p1} / 100)`;
                    });

                    // One last check to ensure no trailing operators (except for valid negative numbers)
                    if (isOperator(lastChar) && lastChar !== '%') { // % is handled above
                        expressionToEval = expressionToEval.slice(0, -1); // Remove trailing operator
                    }


                    const result = eval(expressionToEval); // Still using eval - security warning applies!
                    // Fix for results that are too long decimals
                    inputField.value = parseFloat(result.toFixed(10)); // Limit to 10 decimal places for display
                    currentExpression = result.toString(); // For chained operations
                    openParenthesesCount = 0; // Reset after successful calculation

                } catch (e) {
                    inputField.value = "Error";
                    currentExpression = ""; // Clear expression on error
                    openParenthesesCount = 0;
                }
                break;

            case '()': // Handle parentheses logic
                // If currentExpression is empty or last char is an operator or '('
                if (currentExpression === "" || isOperator(lastChar) || lastChar === '(' || lastChar === '.') { // Added dot
                    currentExpression += '(';
                    openParenthesesCount++;
                }
                // If there are open parentheses AND last char is a number or ')'
                else if (openParenthesesCount > 0 && (isDigit(lastChar) || lastChar === ')')) {
                    currentExpression += ')';
                    openParenthesesCount--;
                }
                // Otherwise (e.g., last char is a number but no open parens), open new parenthesis
                else {
                    currentExpression += '(';
                    openParenthesesCount++;
                }
                inputField.value = currentExpression;
                break;

            case '%':
                // Only allow % if the last character is a digit or a closing parenthesis
                if (isDigit(lastChar) || lastChar === ')') {
                    currentExpression += '%';
                    inputField.value = currentExpression;
                }
                // Else, do nothing or show an error
                break;

            default: // Handle numbers, operators (+, -, *, /), and dot (.)
                // Prevent consecutive operators (e.g., '++' or '+*')
                if (isOperator(buttonText) && isOperator(lastChar)) {
                    // Replace the last operator with the new one
                    currentExpression = currentExpression.slice(0, -1) + buttonText;
                }
                // Special case: allow '-' as a negative sign at start or after an operator/open parenthesis
                else if (buttonText === '-' && (currentExpression === "" || isOperator(lastChar) || lastChar === '(')) {
                    currentExpression += buttonText;
                }
                // Prevent operators at the very beginning (unless it's a negative sign, already handled)
                else if (isOperator(buttonText) && currentExpression === "") {
                    // Do nothing
                }
                // Prevent number after ')' without an operator (implied multiplication)
                else if (isDigit(buttonText) && lastChar === ')') {
                    currentExpression += '*' + buttonText; // Auto-insert multiplication
                }
                // Handle dot input
                else if (buttonText === '.') {
                    // Prevent dot if expression is empty or ends with operator/open parenthesis (unless starting with 0.)
                    if (currentExpression === "" || isOperator(lastChar) || lastChar === '(') {
                        currentExpression += '0.'; // Start with 0. if not preceded by a number
                    } else if (lastChar === '.') {
                        // Do nothing if last char is already a dot
                    } else {
                        // Check if the current number already has a decimal point
                        const parts = currentExpression.split(/[\+\-\*\/%()]/);
                        const lastPart = parts[parts.length - 1];
                        if (lastPart.includes('.')) {
                            // Do nothing if current number already has a dot
                        } else {
                            currentExpression += buttonText;
                        }
                    }
                }
                // Prevent opening parenthesis immediately after a number without an operator
                else if (buttonText === '(' && isDigit(lastChar)) {
                    currentExpression += '*' + buttonText; // Auto-insert multiplication
                    openParenthesesCount++;
                }
                else {
                    currentExpression += buttonText;
                }
                inputField.value = currentExpression;
                break;
        }

        // Always scroll to the right to show the latest input
        inputField.scrollLeft = inputField.scrollWidth;

        // For debugging
        console.log("Button clicked:", buttonText);
        console.log("Current Expression:", currentExpression);
        console.log("Open Parentheses:", openParenthesesCount);
    });
});