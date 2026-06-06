import { createPlayer } from "./player.js";
import { board } from "./gameboard.js";

//player objects
const players = [createPlayer("Player 1", "X"), createPlayer("Player 2", "O")];

//active player
let activePlayer = players[0];

//turn dictator

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
      console.log("winner");
      return true;
    }
  }
}
