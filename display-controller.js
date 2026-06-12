import { placeMarker, activePlayer, gameRunning } from "./controller.js";
import { board } from "./gameboard.js";

const container = document.querySelector(".grid-container");
const currentBoard = board.getter();

export function gridCreator() {
  const gridAmmount = 9;
  container.innerHTML = "";
  for (let i = 0; i < gridAmmount; i++) {
    const grid = document.createElement("div");
    grid.classList.add("grid-cell");
    grid.id = i;
    grid.innerText = board.getter()[i];
    container.appendChild(grid);
  }
  markerPlacer();
}

function markerPlacer() {
  const blocks = document.querySelectorAll(".grid-cell");
  blocks.forEach((block) => {
    const cell = parseInt(block.id, 10);
    let cellLocked = false;
    block.innerText = "";
    if (gameRunning === false) {
      cellLocked = false;
    }
    block.addEventListener("click", () => {
      placeMarker(cell);
      block.innerText = board.getter()[cell];
      cellLocked = true;
    });
    block.addEventListener("mouseenter", function () {
      if (cellLocked === false && gameRunning === true) {
        block.innerText = activePlayer.getMarker();
        if (activePlayer.getMarker() === "X") {
          block.style.color = "red";
        } else if (activePlayer.getMarker() === "O") {
          block.style.color = "blue";
        }
      }

      block.addEventListener("mouseleave", function () {
        if (cellLocked === false) {
          block.innerText = "";
          block.style.color = "black";
        }
      });
    });
  });
}

export function endGame() {
  if (gameRunning == false) {
    document.querySelector(".grid-container").style.display = "none";
    document.querySelector(".form-container").style.display = "none";
    document.querySelector(".gameOver-screen").style.display = "block";
  }
}

function gameFlow() {
  const start = document.querySelector(".startGame-button");
  const restart = document.querySelector(".restart");
  const form = document.querySelector(".form-container");

  restart.addEventListener("click", () => {
    form.style.display = "flex";
    document.querySelector(".gameOver-screen").style.display = "none";
  });

  start.addEventListener("click", () => {
    form.style.display = "none";
    document.querySelector(".grid-container").style.display = "grid";
    gridCreator();
  });
}

gameFlow();
