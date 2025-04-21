const dingSound = new Audio("soundAnimation/dingSound.wav");
let number;

const restartGameBtn = document.querySelector("#restartGame");
const randomNumDisplayBox = document.querySelector(".randomNumDisplayBox h1");

restartGameBtn.addEventListener("click", restartGame);

// Restart the game
function restartGame() {
  // Create an array from 1 to 90
  number = Array.from({ length: 90 }, (_, i) => i + 1);

  // Render Number boxes
  const boxContainer = document.querySelector("#boxContainer");
  boxContainer.innerHTML = "";
  number.forEach((items) => {
    boxContainer.innerHTML += `<button type="button" class="btn btn-success" id="${items}">${items}</button>`;
  });

  // Shuffle the array
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap
    }
  }

  shuffleArray(number);
  console.log(number);

  const btns = document.querySelectorAll("button");
  for (btn of btns) {
    btn.classList.remove("btn-danger");
  }
  randomNumDisplayBox.innerText = "";
}

restartGame();

function getUniqueNumber() {
  if (number.length === 0) {
    alert("Game Over"); // All used
    restartGame();
    return null; // Prevent further code from running
  } else {
    return number.pop(); // or shift() if you want in shuffled order
  }
}

// Generate unique Number
const generateNumber = document.querySelector("#generateNumber");
generateNumber.addEventListener("click", () => {
  let uniqeNum = getUniqueNumber();

  if (!uniqeNum) return; // Safeguard if game restarted

  dingSound.play();

  const uniquBox = document.getElementById(uniqeNum);
  if (uniquBox) {
    uniquBox.classList.add("btn-danger","animate-pop");
    setTimeout(() => {
        uniquBox.classList.remove("animate-pop");
      }, 500);
  }
  randomNumDisplayBox.innerText = uniqeNum;
  randomNumDisplayBox.classList.add("animate-pop");
  setTimeout(() => {
    randomNumDisplayBox.classList.remove("animate-pop");
  }, 500);
});
