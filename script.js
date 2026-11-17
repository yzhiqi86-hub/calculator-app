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

let memoryValue = 0;
function currentNumber() {
  const expression = display.textContent;
  if (!/^[0-9+\-*/.]+$/.test(expression)) throw new Error('Invalid expression');
  const value = Function('"use strict"; return (' + expression + ')')();
  if (!Number.isFinite(value)) throw new Error('Invalid number');
  return value;
}
function updateMemoryIndicator() {
  document.getElementById('memory-indicator').textContent = memoryValue === 0 ? '' : 'M: ' + memoryValue;
}
function memoryAdd() {
  try { memoryValue += currentNumber(); updateMemoryIndicator(); clearDisplay(); }
  catch { display.textContent = '錯誤'; }
}
function memorySubtract() {
  try { memoryValue -= currentNumber(); updateMemoryIndicator(); clearDisplay(); }
  catch { display.textContent = '錯誤'; }
}
function memoryRecall() { display.textContent = String(memoryValue); }
function memoryClear() { memoryValue = 0; updateMemoryIndicator(); }

// Trigonometric functions use degrees; log is base 10.
function scientificCalc(operation) {
  try {
    const value = currentNumber();
    let result;
    switch (operation) {
      case 'sin': result = Math.sin(value * Math.PI / 180); break;
      case 'cos': result = Math.cos(value * Math.PI / 180); break;
      case 'tan': if (Math.abs(Math.cos(value * Math.PI / 180)) < 1e-12) throw new Error('Undefined'); result = Math.tan(value * Math.PI / 180); break;
      case 'log': if (value <= 0) throw new Error('Domain'); result = Math.log10(value); break;
      case 'sqrt': if (value < 0) throw new Error('Domain'); result = Math.sqrt(value); break;
      case 'pow': result = value * value; break;
      default: return;
    }
    if (!Number.isFinite(result)) throw new Error('Invalid result');
    display.textContent = Number(result.toPrecision(10)).toString();
  } catch { display.textContent = '錯誤'; }
}

function applyScientificSelection() {
  const operation = document.getElementById('scientific-operation').value;
  if (operation) scientificCalc(operation);
}
