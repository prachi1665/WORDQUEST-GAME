
let score = 0;
let targetIndex = 0;

// create grid
function createGrid() {
    let grid = document.getElementById("grid");
    grid.innerHTML = "";

    for (let i = 0; i < 16; i++) {
        let tile = document.createElement("div");
        tile.classList.add("tile");

        tile.onclick = function () {
            checkTile(i, tile);
        };

        grid.appendChild(tile);
    }

    // randomly choose correct tile
    targetIndex = Math.floor(Math.random() * 16);
}

// start game
function startGame() {
    score = 0;
    document.getElementById("score").innerText = score;
    createGrid();
}

// check tap
function checkTile(index, tile) {

    if (index === targetIndex) {
        tile.classList.add("correct");
        score++;
        document.getElementById("score").innerText = score;

        setTimeout(createGrid, 500); // next round
    } else {
        tile.classList.add("wrong");
    }
}
