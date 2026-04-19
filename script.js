
// ---------------- LEVEL DATA ----------------
const levels = [
    {
        letters: ["A","P","P","L","E"],
        words: ["apple", "pal", "lap", "ape", "pep"],
        hint: "A fruit 🍎"
    },
    {
        letters: ["T","R","E","E","S"],
        words: ["tree", "see", "rest", "set", "tees"],
        hint: "Nature 🌳"
    },
    {
        letters: ["C","A","R","E","R"],
        words: ["care", "race", "car", "are", "ear"],
        hint: "Movement / concern 🚗"
    }
];

let currentLevel = 0;
let score = 0;
let found = [];
let time = 60;
let lives = 3;
let timer;

// ---------------- LOAD LEVEL ----------------
function loadLevel() {
    let level = levels[currentLevel];

    found = [];
    time = 60;
    lives = 3;

    document.getElementById("level").innerText = "Level " + (currentLevel + 1);
    document.getElementById("letters").innerText = level.letters.join(" ");
    document.getElementById("foundWords").innerHTML = "";
    document.getElementById("message").innerText = "";
    
    updateStats();

    startTimer();
}

// ---------------- TIMER ----------------
function startTimer() {
    clearInterval(timer);

    timer = setInterval(() => {
        time--;
        document.getElementById("timer").innerText = "⏱ Time: " + time;

        if (time <= 0) {
            clearInterval(timer);
            gameOver("Time Up!");
        }
    }, 1000);
}

// ---------------- CHECK WORD ----------------
function checkWord() {
    let input = document.getElementById("input").value.toLowerCase();
    let level = levels[currentLevel];

    if (level.words.includes(input) && !found.includes(input)) {

        found.push(input);
        score++;

        document.getElementById("message").innerText = "✔ Correct!";

        let li = document.createElement("li");
        li.innerText = input;
        document.getElementById("foundWords").appendChild(li);

    } else {
        lives--;
        document.getElementById("message").innerText = "❌ Wrong!";
    }

    document.getElementById("input").value = "";
    updateStats();

    if (lives <= 0) {
        gameOver("No Lives Left!");
    }

    if (found.length === level.words.length) {
        levelComplete();
    }
}

// ---------------- HINT SYSTEM ----------------
function showHint() {
    alert("💡 Hint: " + levels[currentLevel].hint);
}

// ---------------- NEXT LEVEL ----------------
function nextLevel() {
    currentLevel++;

    if (currentLevel >= levels.length) {
        document.body.innerHTML = "<h1>🏆 YOU COMPLETED WORDQUEST PRO!</h1><h2>Score: " + score + "</h2>";
        return;
    }

    loadLevel();
}

// ---------------- LEVEL COMPLETE ----------------
function levelComplete() {
    clearInterval(timer);

    setTimeout(() => {
        alert("🎉 Level Complete!");
        nextLevel();
    }, 500);
}

// ---------------- GAME OVER ----------------
function gameOver(msg) {
    clearInterval(timer);
    document.body.innerHTML = `
        <h1>💀 Game Over</h1>
        <h2>${msg}</h2>
        <h3>Score: ${score}</h3>
    `;
}

// ---------------- UPDATE UI ----------------
function updateStats() {
    document.getElementById("score").innerText = "Score: " + score;
    document.getElementById("lives").innerText = "❤️ Lives: " + lives;
}

// ---------------- START GAME ----------------
loadLevel();
   
