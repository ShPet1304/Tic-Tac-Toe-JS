import { createPlayer } from "./player.js";
import { board } from "./gameboard.js";
import { gridCreator, endGame } from "./display-controller.js";

//player objects
const players = [createPlayer("Player 1", "X"), createPlayer("Player 2", "O")];

export let activePlayer;
export let gameRunning = true;

function starterPlayer() {
  players.forEach((player) => {
    const starter = players.findIndex((start) => start.getMarker() === "X");
    activePlayer = players[starter];
  });
}

//player switcher
function playerSwitcher() {
  if (activePlayer == players[0]) {
    activePlayer = players[1];
  } else if (activePlayer == players[1]) {
    activePlayer = players[0];
  }
}

//turn dictator
function turnDictator() {
  const status = winnerChecker();
  switch (status) {
    case "changeTurn":
      playerSwitcher();
      break;

    case "tie":
      setTimeout(() => {
        gridCreator();
        board.reset();
        gameRunning = true;
      }, 200);
      console.log("It's a tie - Game Over");
      break;

    case "winner":
      endGame();
      setTimeout(() => {
        gridCreator();
        board.reset();
        gameRunning = true;
      }, 200);
      console.log("Game Over");
      break;

    default:
      return;
      break;
  }
}

//winner checker
function winnerChecker() {
  const currentBoard = board.getter();

  const winningCombinations = [
    { id: 0, first: 0, second: 1, third: 2 },
    { id: 1, first: 0, second: 3, third: 6 },
    { id: 2, first: 1, second: 4, third: 7 },
    { id: 3, first: 2, second: 5, third: 8 },
    { id: 4, first: 0, second: 4, third: 8 },
    { id: 5, first: 2, second: 4, third: 6 },
    { id: 6, first: 3, second: 4, third: 5 },
    { id: 7, first: 6, second: 7, third: 8 },
  ];

  for (const winner of winningCombinations) {
    if (
      activePlayer.getMarker() == currentBoard[winner.first] &&
      activePlayer.getMarker() == currentBoard[winner.second] &&
      activePlayer.getMarker() == currentBoard[winner.third]
    ) {
      gameRunning = false;
      return "winner";
    }
  }

  if (currentBoard.every((val) => val !== "")) {
    gameRunning = false;
    return "tie";
  }
  if (gameRunning === true) {
    return "changeTurn";
  } else {
    return;
  }
}

//marker placer
export function placeMarker(position) {
  const currentBoard = board.getter();
  if (currentBoard[position] == "" && gameRunning === true) {
    board.place(position, activePlayer.getMarker());
    turnDictator();
  } else {
    console.log("try another spot");
  }
}

starterPlayer();
