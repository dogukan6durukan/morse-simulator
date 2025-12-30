import { MORSE_ALPHABET } from './morse.js';

let input = document.querySelector(".input");
let output = document.querySelector(".output");
let button = document.querySelector("#button");

let pressStart;
let gapTimer;

button.addEventListener("mousedown", () => {
    pressStart = Date.now();
    clearTimeout(gapTimer);
});

button.addEventListener("mouseup", () => {
    const duration = (Date.now() - pressStart) / 1000;

    if (duration > 0.25) {
        input.textContent += "-";
    } else {
        input.textContent += ".";
    }

    parseMorse();

    gapTimer = setTimeout(() => {
        input.textContent += " / ";
    }, 1000);
});

function parseMorse() {
    let tokens = input.textContent.trim().split(" / ");
    let result = "";

    for (let token of tokens) {
        if (MORSE_ALPHABET[token]) {
            result += MORSE_ALPHABET[token];
        }
    }

    output.textContent = result;
}
