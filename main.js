"use strict";
// Variable Declarations
const btnNewGame = document.querySelector(".new-game");
const btnHold = document.querySelector(".hold");
const btnRoll = document.querySelector(".roll-dice");
const diceRollOutput = document.querySelector(".dice--roll");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const currentScore0 = document.querySelector(".current-score--0");
const currentScore1 = document.querySelector(".current-score--1");
const player0Tot = document.querySelector("#score--0");
const player1Tot = document.querySelector("#score--1");
const allBtn = document.querySelector(".btn");
let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let isPlaying = true;

// functions

function randNum() {
  return Math.trunc(Math.random() * 6) + 1;
} //generates randum number from 1 - 6

function switchPlayer() {
  document.querySelector(`.current-score--${activePlayer}`).textContent = 0;
  currentScore = 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
  if (activePlayer === 0) activePlayer = 1;
  else activePlayer = 0;
} //switches player when hold btn is clicked or when current player rolls a 1

function disableAllBtn() {
  btnRoll.removeEventListener("click", playGame, true);
  btnHold.removeEventListener("click", btnHoldFunction, true);
} //disables the btn after a winner has emerged

let playGame = function (e) {
  e.preventDefault();
  let randNumber = randNum();
  diceRollOutput.src = `./img/dice-${randNumber}.png`;
  if (randNumber === 1) {
    switchPlayer();
    // activePlayer = activePlayer === 0 ? 1 : 0;
  } else {
    currentScore += randNumber;
    document.querySelector(`.current-score--${activePlayer}`).textContent =
      currentScore;
  }
  console.log(randNumber);
}; // dice roll function

let btnHoldFunction = function (e) {
  e.preventDefault();
  scores[activePlayer] += currentScore;
  document.querySelector(`#score--${activePlayer}`).textContent =
    scores[activePlayer];

  if (scores[activePlayer] > 100) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--active");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
    diceRollOutput.style.display = "none";
    disableAllBtn();
  } else {
    switchPlayer();
  }
}; //what should occur when the hold btn is clicked

function resetGame() {
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  player0Tot.textContent = 0;
  player1Tot.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  btnRoll.addEventListener("click", playGame, true);
  btnHold.addEventListener("click", btnHoldFunction, true);
  diceRollOutput.style.display = "block";
} //resets game back to init

// end of functions

btnRoll.addEventListener("click", playGame, true);
btnHold.addEventListener("click", btnHoldFunction, true);
btnNewGame.addEventListener("click", function () {
  resetGame();
});