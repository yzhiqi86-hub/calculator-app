const display = document.getElementById("display");

function appendToDisplay(value) {
  if (display.textContent === "0" || display.textContent === "錯誤") {
    display.textContent = value;
  } else {
    display.textContent += value;
  }
}

function clearDisplay() {
  display.textContent = "0";
}

function deleteLast() {
  if (display.textContent === "錯誤") {
    clearDisplay();
    return;
  }

  display.textContent = display.textContent.slice(0, -1) || "0";
}

function calculate() {
  const expression = display.textContent;

  // 只允許數字、小數點和基本四則運算符號
  if (!/^[0-9+\-*/.]+$/.test(expression)) {
    display.textContent = "錯誤";
    return;
  }

  try {
    const result = Function('"use strict"; return (' + expression + ')')();

    if (!Number.isFinite(result)) {
      display.textContent = "錯誤";
      return;
    }

    display.textContent = Number(result.toPrecision(10)).toString();
  } catch {
    display.textContent = "錯誤";
  }
}
// Convert the current numeric expression to a percentage.
function calculatePercentage() {
  try {
    const expression = display.textContent;
    if (!/^[0-9+\-*/.]+$/.test(expression)) throw new Error('Invalid expression');
    const value = Function('"use strict"; return (' + expression + ')')();
    if (!Number.isFinite(value)) throw new Error('Invalid result');
    display.textContent = Number((value / 100).toPrecision(10)).toString();
  } catch {
    display.textContent = "錯誤";
  }
}
