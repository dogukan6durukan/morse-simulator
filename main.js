import { MORSE_ALPHABET } from './morse.js';

let input = document.querySelector(".input");
let output = document.querySelector(".output");
let button = document.querySelector("#button");
let restart = document.querySelector("#restart");
let backspace = document.querySelector("#backspace");

let clicked = 0;

let pressStart;
let gapTimer;

let tokens;
let audio = new Audio("beep-sound.mp3");

let warningInput = "Click the button to start";
let warningOutput = "Interpreted Morse will be here";

if(!clicked) {
 input.textContent = warningInput;
 output.textContent = warningOutput;
}

button.addEventListener("pointerdown", () => {
    if(!clicked) {
        clicked = 1;
        input.textContent = "";
        output.textContent = "";
    }
    pressStart = Date.now();
    audio.play();
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
    clicked = 0;
    input.textContent = warningInput;
    output.textContent = warningOutput;
})

backspace.addEventListener("click", () => {
    // if(input.textContent == "") {
    //     input.textContent = warningInput;
    //     output.textContent = warningOutput;
    // }
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
