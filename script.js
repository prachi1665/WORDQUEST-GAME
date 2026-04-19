
// 🎮 LEVEL DATA (5-6 words each level)
const levels = [
    {
        letters: ["A","P","P","L","E"],
        words: ["apple", "pal", "lap", "ape", "pep"]
    },
    {
        letters: ["T","R","E","E","S"],
        words: ["tree", "see", "rest", "set", "tees"]
    },
    {
        letters: ["C","A","R","E","R"],
        words: ["care", "race", "car", "are", "ear"]
    }
];

let currentLevel = 0;
let score = 0;
let found = [];

// Load level
function loadLevel() {
    let level = levels[currentLevel];

    document.getElementById("level").innerText = "Level " + (currentLevel + 1);

    document.getElementById("letters").innerText =
        level.letters.join(" ");

    document.getElementById("foundWords").innerHTML = "";

    found = [];
}

loadLevel();

// Check word
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

        document.getElementById("score").innerText = "Score: " + score;

    } else {
        document.getElementById("message").innerText = "❌ Try Again!";
    }

    document.getElementById("input").value = "";
}

// Next Level
function nextLevel() {

    if (found.length < levels[currentLevel].words.length) {
        alert("Complete all words first!");
        return;
    }

    currentLevel++;

    if (currentLevel >= levels.length) {
        document.body.innerHTML = "<h1>🏆 You Win!</h1>";
        return;
    }

    loadLevel();
}
