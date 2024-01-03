// DOM elements
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let user1 = document.getElementById("firstuser");
let user2 = document.getElementById("seconduser");
let user = document.querySelector(".user");
let user_but = document.getElementById("userbtn");
let p1name = document.getElementById("p1name");
let p2name = document.getElementById("p2name");
let turn = document.getElementById("turn");

// Game variables
let countTurn = 0; // Count the turns
let turnO = true; // Player turns (X or O)
let count = 0; // To track draws
var ply1, ply2; // Player names

// Winning patterns for the tic-tac-toe grid
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Function to start the game
const startgame = () => {
  // Check if both player names are entered
  if (user1.value.trim() !== "" && user2.value.trim() !== "") {
    user.classList.add("hide");
    ply1 = user1.value;
    ply2 = user2.value;
    p1name.innerText = user1.value;
    p2name.innerText = user2.value;
    if (countTurn < 9) {
      turn.innerText = `${ply2} Turn ( O )`;
    }
    console.log(`Player 1: ${ply1}, Player 2: ${ply2}`);
    document.querySelector(".tictactoe").classList.remove("hide");
  } else {
    alert("Please enter names for both players.");
  }
};

// Function to reset the game
const resetGame = () => {
  turnO = true;
  count = 0;
  countTurn = 0;
  turn.innerText = `${ply2} Turn ( O )`;
  enableBoxes();
  msgContainer.classList.add("hide");
};

// Event listeners for each box on the tic-tac-toe grid
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      // Player O's turn
      box.innerText = "O";
      if (countTurn < 9) {
        turn.innerText = `${ply1} Turn ( X )`;
        countTurn++;
      }
      turnO = false;
    } else {
      // Player X's turn
      box.innerText = "X";
      turnO = true;
      if (countTurn < 9) {
        turn.innerText = `${ply2} Turn ( O )`;
        countTurn++;
      }
    }
    box.disabled = true;
    count++;

    // Check for a winner or draw
    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
  });
});

// Function to handle a draw
const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Function to disable all boxes
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

// Function to enable all boxes
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

// Function to display the winner
const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

// Function to check for a winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;
    let ply1 = user1.value;
    let ply2 = user2.value;
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        if (pos1Val === "O") {
          showWinner(ply1);
        } else {
          showWinner(ply2);
        }
        return true;
      }
    }
  }
};

// Event listeners for New Game and Reset buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
user_but.addEventListener("click", startgame);
