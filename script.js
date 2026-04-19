let levels = [
  { letters: ["C","A","T","D","O","G","B","A","T"], words: ["CAT","DOG","BAT"] },
  { letters: ["P","E","N","P","E","T","S","E","T"], words: ["PEN","PET","SET"] }
];

let level = 0;
let score = 0;
let selected = [];
let isTouch = false;

const board = document.getElementById("board");
const currentWord = document.getElementById("currentWord");

function loadLevel() {
  board.innerHTML = "";
  selected = [];

  document.getElementById("level").innerText = level + 1;

  levels[level].letters.forEach(letter => {
    let cell = document.createElement("div");
    cell.className = "cell";
    cell.innerText = letter;

    cell.addEventListener("touchstart", start);
    cell.addEventListener("touchmove", move);
    cell.addEventListener("touchend", check);

    board.appendChild(cell);
  });
}

function start(e) {
  isTouch = true;
  clearSelection();
  add(e.target);
}

function move(e) {
  let touch = e.touches[0];
  let el = document.elementFromPoint(touch.clientX, touch.clientY);
  if(el && el.classList.contains("cell")) {
    add(el);
  }
}

function check() {
  isTouch = false;

  let word = selected.join("");

  if(levels[level].words.includes(word)) {
    score += 10;
    document.getElementById("score").innerText = score;

    document.querySelectorAll(".active").forEach(c => {
      c.classList.remove("active");
      c.classList.add("correct");
    });
  } else {
    document.querySelectorAll(".active").forEach(c => {
      c.classList.remove("active");
    });
  }

  selected = [];
  currentWord.innerText = "";
}

function add(el) {
  if(!el.classList.contains("active") && !el.classList.contains("correct")) {
    el.classList.add("active");
    selected.push(el.innerText);
    currentWord.innerText = selected.join("");
  }
}

function clearSelection() {
  document.querySelectorAll(".cell").forEach(c => c.classList.remove("active"));
  selected = [];
  currentWord.innerText = "";
}

function nextLevel() {
  if(level < levels.length - 1) {
    level++;
    loadLevel();
  } else {
    alert("You finished all levels!");
  }
}

loadLevel();
