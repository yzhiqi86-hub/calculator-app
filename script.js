"use strict";
const display = document.getElementById("display");
const indicator = document.getElementById("memory-indicator");
let memoryValue = 0;
let freshResult = false;

function formatNumber(value) {
  if (!Number.isFinite(value)) throw new Error("Invalid number");
  const rounded = Number(value.toPrecision(12));
  return Object.is(rounded, -0) ? "0" : String(rounded);
}

// Recursive-descent arithmetic parser; no eval or Function constructor.
function evaluate(expression) {
  const input = expression.replace(/\s+/g, "");
  if (!input || !/^[0-9.+*/-]+$/.test(input)) throw new Error("Invalid expression");
  let pos = 0;
  function number() {
    const start = pos;
    while (pos < input.length && /[0-9.]/.test(input[pos])) pos++;
    const token = input.slice(start, pos);
    if (!/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(token)) throw new Error("Invalid number");
    return Number(token);
  }
  function unary() {
    if (input[pos] === "+") { pos++; return unary(); }
    if (input[pos] === "-") { pos++; return -unary(); }
    return number();
  }
  function term() {
    let value = unary();
    while (input[pos] === "*" || input[pos] === "/") {
      const op = input[pos++];
      const right = unary();
      if (op === "/" && right === 0) throw new Error("Divide by zero");
      value = op === "*" ? value * right : value / right;
    }
    return value;
  }
  function sum() {
    let value = term();
    while (input[pos] === "+" || input[pos] === "-") {
      const op = input[pos++];
      const right = term();
      value = op === "+" ? value + right : value - right;
    }
    return value;
  }
  const result = sum();
  if (pos !== input.length || !Number.isFinite(result)) throw new Error("Invalid expression");
  return result;
}
function currentValue() { return evaluate(display.textContent); }
function showError() { display.textContent = "錯誤"; freshResult = true; }
function appendToDisplay(value) {
  if (!/^[0-9.+*/-]$/.test(value)) return;
  const current = display.textContent;
  if (current === "錯誤" || (freshResult && /[0-9.]/.test(value))) {
    display.textContent = value === "." ? "0." : value;
  } else if (current === "0" && /[0-9]/.test(value)) {
    display.textContent = value;
  } else if (current === "0" && value === ".") {
    display.textContent = "0.";
  } else {
    display.textContent += value;
  }
  freshResult = false;
}
function clearDisplay() { display.textContent = "0"; freshResult = false; }
function deleteLast() {
  if (display.textContent === "錯誤") return clearDisplay();
  display.textContent = display.textContent.slice(0,-1) || "0";
  freshResult = false;
}
function calculate() {
  try { display.textContent = formatNumber(currentValue()); freshResult = true; }
  catch { showError(); }
}
function calculatePercentage() {
  try { display.textContent = formatNumber(currentValue() / 100); freshResult = true; }
  catch { showError(); }
}
function updateMemoryIndicator() {
  indicator.textContent = memoryValue === 0 ? "" : "M: " + formatNumber(memoryValue);
}
function memoryAdd() {
  try { memoryValue = evaluate(formatNumber(memoryValue) + "+" + formatNumber(currentValue())); updateMemoryIndicator(); clearDisplay(); }
  catch { showError(); }
}
function memorySubtract() {
  try { memoryValue = evaluate(formatNumber(memoryValue) + "-" + formatNumber(currentValue())); updateMemoryIndicator(); clearDisplay(); }
  catch { showError(); }
}
function memoryRecall() { display.textContent = formatNumber(memoryValue); freshResult = true; }
function memoryClear() { memoryValue = 0; updateMemoryIndicator(); }
function scientificCalc(operation) {
  try {
    const x = currentValue();
    const rad = x * Math.PI / 180;
    let result;
    switch (operation) {
      case "sin": result = Math.sin(rad); break;
      case "cos": result = Math.cos(rad); break;
      case "tan":
        if (Math.abs(Math.cos(rad)) < 1e-12) throw new Error("Undefined tangent");
        result = Math.tan(rad); break;
      case "log":
        if (x <= 0) throw new Error("Log domain");
        result = Math.log10(x); break;
      case "sqrt":
        if (x < 0) throw new Error("Square root domain");
        result = Math.sqrt(x); break;
      case "pow": result = x * x; break;
      default: return;
    }
    display.textContent = formatNumber(result);
    freshResult = true;
  } catch { showError(); }
}
function applyScientificSelection() {
  scientificCalc(document.getElementById("scientific-operation").value);
}
document.addEventListener("keydown", (event) => {
  if (event.target instanceof HTMLElement && ["SELECT","INPUT","TEXTAREA"].includes(event.target.tagName)) return;
  if (/^[0-9.+*/-]$/.test(event.key)) { event.preventDefault(); appendToDisplay(event.key); }
  else if (event.key === "Enter" || event.key === "=") { event.preventDefault(); calculate(); }
  else if (event.key === "Backspace") { event.preventDefault(); deleteLast(); }
  else if (event.key === "Escape") { event.preventDefault(); clearDisplay(); }
  else if (event.key === "%") { event.preventDefault(); calculatePercentage(); }
});
