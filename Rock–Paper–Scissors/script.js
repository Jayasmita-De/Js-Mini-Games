// Tomorrow you'll add:
// 4. Score update
// 5. Restart functionality

fetch("header.html")
  .then((res) => res.text())
  .then((data) => (document.getElementById("header").innerHTML = data));

fetch("footer.html")
  .then((res) => res.text())
  .then((data) => (document.getElementById("footer").innerHTML = data));

let yourGesture = document.getElementById("yourGesture");
let computerGesture = document.getElementById("computerGesture");
let yourScore = document.getElementById("you-score");
let computerScore = document.getElementById("computer-score");
let roundNo = document.getElementById("round-no");
let result = document.getElementById("result");
let interfaceImg = document.getElementById("interfaceImg");

let userPoints = 0;
let computerPoints = 0;

let round = 10;
roundNo.textContent = `Attempts Left: ${round}`;

let gameOver = false; // global flag

function decider(userChoice) {
  if (gameOver) return; // agar game over hai toh aur click ignore kar

  const computerChoice = Math.floor(Math.random() * 3) + 1;
  const choices = ["Rock", "Paper", "Scissors"];
  const computerPick = choices[computerChoice - 1];

  // gestures update
  yourGesture.src = `./assets/${userChoice}Left.png`;
  computerGesture.src = `./assets/${computerPick}Right.png`;

  // round decrement
  round--;
  roundNo.textContent = `Attempts Left: ${round}`;

  // score logic
  if (userChoice === computerPick) {
    // draw
  } else if (
    (userChoice === "Rock" && computerPick === "Scissors") ||
    (userChoice === "Paper" && computerPick === "Rock") ||
    (userChoice === "Scissors" && computerPick === "Paper")
  ) {
    userPoints++;
  } else {
    computerPoints++;
  }

  yourScore.textContent = `You: ${userPoints}`;
  computerScore.textContent = `Computer: ${computerPoints}`;

  // ✅ win check
  if (userPoints === 3 || computerPoints === 3) {
    if (userPoints > computerPoints) {
      interfaceImg.src = "./assets/Favicon.png";
      interfaceImg.classList.add("winner-img");
      result.textContent = "🎉 You Win!";
    } else {
      interfaceImg.src = "./assets/cuteBot.png";
      interfaceImg.classList.add("winner-img");
      result.textContent = "💻 Computer Wins!";
    }
    document.getElementById("you").style.display = "none";
    document.getElementById("computer").style.display = "none";
    gameOver = true; // freeze game
  }
}

function restart() {
  yourGesture.src = "./assets/Favicon.png";
  computerGesture.src = "./assets/cuteBot.png";
  round = 10;
  roundNo.textContent = `Attempts Left: ${round}`;
  userPoints = 0;
  computerPoints = 0;
  yourScore.textContent = `You: 0`;
  computerScore.textContent = `Computer: 0`;
  result.textContent = "";
  gameOver = false; // reset game state
  document.getElementById("you").style.display = "block";
  document.getElementById("computer").style.display = "block";
  interfaceImg.classList.remove("winner-img");
}

document.getElementById("rock").addEventListener("click", () => {
  decider("Rock");
});

document.getElementById("paper").addEventListener("click", () => {
  decider("Paper");
});

document.getElementById("scissors").addEventListener("click", () => {
  decider("Scissors");
});

document.getElementById("newGame").addEventListener("click", () => {
  restart();
  console.log("clicked in new game");
});
