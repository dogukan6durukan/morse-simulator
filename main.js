import { MORSE_ALPHABET } from './morse.js';

let status = document.querySelector("#status");
let result = document.querySelector(".result")
let input = document.querySelector(".input");
let output = document.querySelector(".output");
let button = document.querySelector("#button");
let restart = document.querySelector("#restart");
let backspace = document.querySelector("#backspace");
let symbols = document.querySelector(".symbols");
let words = document.querySelector(".words");

let tokens;

let restartStatus = 1;
let gapToken = 0;

let pressStart;
let gapTimer;

let warningInput = "Click the button to start";
let warningOutput = "Interpreted Morse will be here";

if(restartStatus) {
 input.textContent = warningInput;
 output.textContent = warningOutput;
 result.classList.add("result-begin");

}

button.addEventListener("pointerdown", () => {
    if(restartStatus) {
        restartStatus = 0;
        input.textContent = "";
        output.textContent = "";
        result.classList.replace("result-begin", "result-end");
    }
    pressStart = Date.now();
    clearTimeout(gapTimer);
});

button.addEventListener("pointerup", () => {
    const currentToken = ++gapToken;

    const duration = (Date.now() - pressStart) / 1000;

    if (duration > 0.25) {
        input.textContent += "-";
        status.textContent = "Long";
    } else {
        input.textContent += ".";
        status.textContent = "Short";
    }

    clearTimeout(gapTimer);

    gapTimer = setTimeout(() => {
        /* If timer is old doesn't work */
        if (currentToken !== gapToken) return;
        if (restartStatus) return;

        input.textContent += " / ";
    }, 1000);

    parseMorse();
});

restart.addEventListener("click", () => {
    restartStatus = 1;
    status.textContent = "";
    input.textContent = warningInput;
    output.textContent = warningOutput;
    result.classList.replace("result-end", "result-begin");

})

backspace.addEventListener("click", () => {
    if (input.textContent === warningInput) return;

    gapToken++; 
    clearTimeout(gapTimer);

    input.textContent = input.textContent.trim().slice(0, -1);

    if (input.textContent.length === 0) {
        restartStatus = 1;
        input.textContent = warningInput;
        output.textContent = warningOutput;
        result.classList.replace("result-end", "result-begin");
        return;
    }

    parseMorse();
});


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

function printCharacters() {
    let tokens = Object.keys(MORSE_ALPHABET);
    for(let token of tokens) {
        symbols.innerHTML += `<div class="symbol">${token}</div>`;
        words.innerHTML +=`<div class="word">${MORSE_ALPHABET[token]}</div>`;
        
    }
}
printCharacters();
