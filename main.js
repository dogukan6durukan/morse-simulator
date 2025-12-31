import { MORSE_ALPHABET } from './morse.js';

let input = document.querySelector(".input");
let output = document.querySelector(".output");
let button = document.querySelector("#button");
let restart = document.querySelector("#restart");
let backspace = document.querySelector("#backspace");

let pressStart;
let gapTimer;

let tokens;

button.addEventListener("pointerdown", () => {
    pressStart = Date.now();
    clearTimeout(gapTimer);
});

button.addEventListener("pointerup", () => {
    const duration = (Date.now() - pressStart) / 1000;

    if (duration > 0.25) {
        input.textContent += "-";
    } else {
        input.textContent += ".";
    }

    gapTimer = setTimeout(() => {
        input.textContent += " / ";
    }, 1000);

    parseMorse();
    
});

restart.addEventListener("click", () => {
    input.textContent = "";
    output.textContent = "";
})

backspace.addEventListener("click", () => {
    input.textContent = input.textContent.trim().slice(0, -1);
    parseMorse();
})



function parseMorse() {
    tokens = input.textContent.trim().split(" / ");
    let result = "";

    for (let token of tokens) {
        if (MORSE_ALPHABET[token]) {
            result += MORSE_ALPHABET[token] + " ";
        } else {
            result += "";
        }
    }

    output.textContent = result;
}
