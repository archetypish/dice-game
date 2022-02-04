// initial state of the game
let player1Score = 0;
let player2Score = 0;
let isPlayer1Turn = true;
let round = 1;
let doubleOrNothingArray = [0, 2];

const rollBtn = document.getElementById("rollBtn");
const doubleOrNothingBtn = document.getElementById("doubleOrNothingBtn");
const resetBtn = document.getElementById("resetBtn");
const dOnNotification = document.getElementById("dOn-notification");
const diceRollPlayer1 = document.getElementById("dice-roll-player1");
const diceRollPlayer2 = document.getElementById("dice-roll-player2");
const player1 = document.getElementById("player1");
const player2 = document.getElementById("player2");
const player1Scoreboard = document.getElementById("player1Scoreboard");
const player2Scoreboard = document.getElementById("player2Scoreboard");
const message = document.getElementById("message");
let id = null;
const carouselItems = document.getElementsByClassName("carousel-item");

let cowChanceAppearing = Math.floor(Math.random() * 2);
console.log(cowChanceAppearing);
rollBtn.addEventListener("click", function () {
  diceRollAnimation();
});

doubleOrNothingBtn.addEventListener("click", function () {
  diceRollAnimation((isDoubleOrNothing = true));
});

function rollGamePlay(isDoubleOrNothing = false) {
  message.textContent = `Round ${round}`;
  let randomRoll = 0;
  let updatedRoll = 0;
  // non-first round and chances are that cow appears
  if (round != 1 && cowChanceAppearing) {
    randomRoll = Math.floor(Math.random() * 7 + 1);
    if (randomRoll === 7) {
      cowChanceAppearing = 0;
    }
  } else {
    randomRoll = Math.floor(Math.random() * 6 + 1);
  }

  // double or nothing flow
  if (isDoubleOrNothing && randomRoll != 7) {
    const randomIndexNumber = Math.floor(Math.random() * 2);
    updatedRoll = randomRoll * doubleOrNothingArray[randomIndexNumber];
  } else {
    updatedRoll = randomRoll;
  }
  // For turn, update dice, and score
  if (isPlayer1Turn) {
    // update dice

    // before updating the dice, we want to show animation of all images
    // runAnimation()
    // diceRollAnimation();
    // change the css designs somehow

    updateDice(diceRollPlayer1, diceRollPlayer2, updatedRoll, randomRoll);

    // update score
    if (updatedRoll != 7) {
      player1Score += updatedRoll;
      player1Scoreboard.textContent = "Score: " + player1Score;
    } else {
      player1Score = 0;
      player1Scoreboard.textContent = "Score: " + player1Score;
    }

    // switch turn
    switchTurn(player2, player1);
  } else {
    // update dice
    // diceRollPlayer1.innerHTML = "";
    // diceRollPlayer2.innerHTML = `<img src="images/${randomRoll}.png" alt="roll">`;
    updateDice(diceRollPlayer2, diceRollPlayer1, updatedRoll, randomRoll);

    // update score
    if (updatedRoll != 7) {
      player2Score += updatedRoll;
      player2Scoreboard.textContent = "Score: " + player2Score;
    } else {
      player2Score = 0;
      player2Scoreboard.textContent = "Score: " + player2Score;
    }

    // switch turn
    switchTurn(player1, player2);

    // update round numbers since both the players have played their turn
    round += 1;

    // since the round is done, check if the game is finished

    // game is under progress
    if (player1Score < 20 && player2Score < 20) {
      if (player1Score > player2Score) {
        message.textContent = `Round ${round}: Player 1 is leading`;
      } else if (player1Score === player2Score) {
        message.textContent = `Round ${round}: Scores Tie`;
      } else {
        message.textContent = `Round ${round}: Player 2 is leading`;
      }
    } else {
      // game is finished
      player1.style.boxShadow = "none";
      if (player1Score > player2Score) {
        message.textContent = `Player 1 wins!`;
        id = decorateWinningPlayer(player1);
      } else if (player1Score === player2Score) {
        message.textContent = `Score Ties!`;
      } else {
        message.textContent = `Player 2 wins!`;
        id = decorateWinningPlayer(player2);
      }

      // make these design changes if the game is finished
      message.style.color = "rgba(236, 31, 226, 0.973)";
      rollBtn.style.display = "none";
      doubleOrNothingBtn.style.display = "none";
      resetBtn.style.display = "block";
    }
  }
}

function updateDice(player1DiceRoll, player2DiceRoll, updatedRoll, randomRoll) {
  if (updatedRoll != 0) {
    player1DiceRoll.innerHTML = `<img src="images/${randomRoll}.png" alt="roll">`;
    player2DiceRoll.innerHTML = "";
  } else {
    player1DiceRoll.innerHTML = `<p>You got nothing!</p>`;
    player2DiceRoll.innerHTML = "";
  }
}

resetBtn.addEventListener("click", function () {
  resetGame();
});

function resetGame() {
  clearInterval(id);
  message.textContent = "Let the game begin!";
  player1Score = 0;
  player2Score = 0;
  player1Scoreboard.textContent = player1Score;
  player2Scoreboard.textContent = player2Score;
  // isPlayer1Turn = true;
  round = 1;
  diceRollPlayer1.textContent = "-";
  diceRollPlayer2.textContent = "-";
  switchTurn(player1, player2, (reset = true));
  message.style.color = "rgb(4, 0, 255)";
  rollBtn.style.display = "block";
  doubleOrNothingBtn.style.display = "block";
  resetBtn.style.display = "none";
  cowChanceAppearing = Math.floor(Math.random() * 2);
}

function switchTurn(one, two, reset = false) {
  if (!reset) {
    isPlayer1Turn = !isPlayer1Turn;
    one.style.boxShadow =
      "-0.2em -0.2em 0.4em 0 rgba(236, 31, 226, 0.973), 0.2em 0.2em 0.4em rgba(236, 31, 226, 0.973)";
    two.style.boxShadow = "none";
  } else {
    one.style.boxShadow =
      "-0.2em -0.2em 0.4em 0 rgba(236, 31, 226, 0.973), 0.2em 0.2em 0.4em rgba(236, 31, 226, 0.973)";
    two.style.boxShadow = "none";
  }
}
// myAnimation();
// animations
function diceRollAnimation(isDoubleOrNothing = false) {
  let id = null;
  let pos = 0;
  clearInterval(id);
  // console.log(id);
  id = setInterval(diceFrame, 250);
  function diceFrame() {
    if (pos == 5) {
      clearInterval(id);
      rollGamePlay(isDoubleOrNothing);
      // carouselItems[out - 1].style.display = "block";
      carouselItems[pos].style.display = "none";
    } else {
      carouselItems[pos].style.display = "none";
      pos++;
      carouselItems[pos].style.display = "block";
    }
  }
}
function decorateWinningPlayer(player) {
  let id = null;
  let pos = 0;
  id = setInterval(lights, 1000);
  function lights() {
    if (pos === 1) {
      player.style.boxShadow = "none";
      message.style.color = "rgb(4, 0, 255)";
      pos = 0;
    } else {
      player.style.boxShadow =
        "-0.2em -0.2em 0.4em 0 rgba(236, 31, 226, 0.973), 0.2em 0.2em 0.4em rgba(236, 31, 226, 0.973)";
      message.style.color = "rgba(236, 31, 226, 0.973)";
      pos++;
    }
  }
  return id;
}
