fetch("header.html")
  .then((res) => res.text())
  .then((data) => (document.getElementById("header").innerHTML = data));

let random = Math.floor(Math.random() * 100) + 1;
let limit = 10;

const result = document.getElementById("result");
const attempts = document.getElementById("attempts");
const img = document.getElementById("statusImg");

// Pehle hi attempts count dikhado
attempts.textContent = `Attempts Left: ${limit}`;

document.getElementById("check").addEventListener("click", () => {
  let guess = Number(document.getElementById("guess").value);

  // ✅ Input validation
  if (guess < 1 || guess > 100 || isNaN(guess)) {
    result.textContent = "⚠️ Please enter a valid number between 1 and 100!";
    img.src = "./assets/error.png"; // optional error image
    return;
  }

  if (limit <= 0) {
    result.textContent = `❌ Game Over! The number was ${random}`;
    img.src = "./assets/error.png";
    return;
  }

  if (guess === random) {
    result.textContent = "🎉 Congrats! You guessed it!";
    img.src = "./assets/win.png";
    confetti({
      particleCount: 150,
      spread: 150,
      origin: { y: 0.2 }, // upar se niche
    });
    result.style.backgroundColor = "rgba(167, 252, 110, 1)";
    return; // game ends if correct
  } else if (guess >= random - 5 && guess <= random + 5) {
    result.textContent = "🔥 Too Close!";
    img.src = "./assets/close.png";
    result.style.backgroundColor = "rgba(178, 253, 188, 1)";
  } else if (guess > random) {
    result.textContent = "📈 Too High!";
    img.src = "./assets/high.png";
    result.style.backgroundColor = "rgba(255, 111, 111, 1)";
  } else {
    result.textContent = "📉 Too Low!";
    img.src = "./assets/low.png";
    result.style.backgroundColor = "rgba(127, 180, 241, 1)";
  }

  // Decrease attempts
  limit--;
  attempts.textContent = `Attempts Left: ${limit}`;
});

document.getElementById("restart").addEventListener("click", () => {
  random = Math.floor(Math.random() * 100) + 1;
  limit = 10;
  attempts.textContent = `Attempts Left: ${limit}`;
  result.textContent = "";
  guess.value = "";
  img.src = "./assets/start.png";
});
