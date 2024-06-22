function openTab(tabName) {
    // Hide all tab content and main page
    var allContents = document.querySelectorAll('.tab-content, #main-page');
    for (var i = 0; i < allContents.length; i++) {
        allContents[i].style.display = "none";
    }

    // Show the selected tab content or main page
    document.getElementById(tabName).style.display = "block";

    // Close the dropdown menu
    document.getElementById("myDropdown").classList.remove("show");
}

function toggleDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}


// Add this JavaScript code to handle the automatic sliding

var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("slider-content");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 5000); // Change slide every 3 seconds (adjust as needed)
}

// Add this JavaScript code to handle tab switching

document.addEventListener('DOMContentLoaded', function () {
    // Initial setup
    showTab('main-page');

    // Event listener for dropdown change
    var dropdown = document.getElementById('tab-selector');
    dropdown.addEventListener('change', function () {
        var selectedTab = dropdown.value;
        showTab(selectedTab);
    });
});

function showTab(tabId) {
    // Hide all tabs
    var tabs = document.getElementsByClassName('tab-content');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].style.display = 'none';
    }

    // Show the selected tab
    var selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.style.display = 'block';
    }
}

const boardElement = document.getElementById("board");
const messageElement = document.getElementById("message");
let board, userFirst, moveNumber;

function startGame() {
    board = [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]];
    userFirst = confirm("Select OK to go first. Select Cancel for the computer to go first.");
    moveNumber = 0;
    renderBoard();
    messageElement.textContent = userFirst ? "Your move" : "Computer's move";
    if (!userFirst) {
        computerMove();
    }
}

function renderBoard() {
    boardElement.innerHTML = "";
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.textContent = board[i][j];
            cell.onclick = () => userMove(i, j);
            boardElement.appendChild(cell);
        }
    }
}

function userMove(row, col) {
        if (board[row][col] === " " && userFirst) {
            board[row][col] = "X";
            moveNumber++;
            if (checkWinner("X")) {
                renderBoard();
                messageElement.textContent = "Congratulations, you have won.";
                return;
            }
            if (moveNumber >= 9) {
                renderBoard();
                messageElement.textContent = "Draw.";
                return;
            }
            userFirst = false;
            renderBoard();
            messageElement.textContent = "Computer's move";
            setTimeout(computerMove, 500);
        }
    }

    function computerMove() {
        let emptyPositions = getEmptyPositions();
        let move;

        if (moveNumber + 1 < 3) {
            let emptyCorners = emptyCornerTest(emptyPositions);
            if (emptyCorners.length === 4) {
                move = emptyCorners[Math.floor(Math.random() * emptyCorners.length)];
            } else {
                move = [1, 1];
            }
        } else if (moveNumber + 1 === 3) {
            let emptyCenter = centerTest(emptyPositions);
            if (emptyCenter.length === 1) {
                move = [1, 1];
            } else {
                let opposite = findOpposite(board);
                move = opposite[0];
            }
        } else if (moveNumber + 1 > 3) {
            let possibleWin = seekWin(board, "O");
            if (possibleWin.length === 1) {
                move = possibleWin[0];
            } else {
                let possibleLoss = seekWin(board, "X");
                if (possibleLoss.length === 1) {
                    move = possibleLoss[0];
                } else {
                    let counter = findCounter(board);
                    if (counter.length === 1) {
                        move = counter[0];
                    } else {
                        move = emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
                    }
                }
            }
        }
        board[move[0]][move[1]] = "O";
        moveNumber++;
        renderBoard();
        if (checkWinner("O")) {
            messageElement.textContent = "The computer wins.";
            return;
        }
        if (moveNumber >= 9) {
            messageElement.textContent = "Draw.";
            return;
        }
        userFirst = true;
        messageElement.textContent = "Your move";
    }

    function getEmptyPositions() {
        const positions = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === " ") {
                    positions.push([i, j]);
                }
            }
        }
        return positions;
    }

    function checkWinner(mark) {
        const winConditions = [
            [board[0][0], board[0][1], board[0][2]],
            [board[1][0], board[1][1], board[1][2]],
            [board[2][0], board[2][1], board[2][2]],
            [board[0][0], board[1][0], board[2][0]],
            [board[0][1], board[1][1], board[2][1]],
            [board[0][2], board[1][2], board[2][2]],
            [board[0][0], board[1][1], board[2][2]],
            [board[2][0], board[1][1], board[0][2]],
        ];
        return winConditions.some(condition => condition.every(cell => cell === mark));
    }

    function emptyCornerTest(emptyPositions) {
        const corners = [
            [0, 0], [0, 2], [2, 0], [2, 2]
        ];
        return corners.filter(pos => emptyPositions.some(emptyPos => emptyPos[0] === pos[0] && emptyPos[1] === pos[1]));
    }

    function centerTest(emptyPositions) {
        return emptyPositions.filter(pos => pos[0] === 1 && pos[1] === 1);
    }

    function findOpposite(board) {
        if (board[0][0] === "O" && board[2][2] === " ") return [[2, 2]];
        if (board[2][2] === "O" && board[0][0] === " ") return [[0, 0]];
        if (board[0][2] === "O" && board[2][0] === " ") return [[2, 0]];
        if (board[2][0] === "O" && board[0][2] === " ") return [[0, 2]];
        return [];
    }

    function seekWin(board, mark) {
        const winConditions = [
            [[0, 0], [0, 1], [0, 2]],
            [[1, 0], [1, 1], [1, 2]],
            [[2, 0], [2, 1], [2, 2]],
            [[0, 0], [1, 0], [2, 0]],
            [[0, 1], [1, 1], [2, 1]],
            [[0, 2], [1, 2], [2, 2]],
            [[0, 0], [1, 1], [2, 2]],
            [[2, 0], [1, 1], [0, 2]],
        ];

        for (let condition of winConditions) {
            let [a, b, c] = condition;
            if (board[a[0]][a[1]] === mark && board[b[0]][b[1]] === mark && board[c[0]][c[1]] === " ") return [c];
            if (board[a[0]][a[1]] === mark && board[c[0]][c[1]] === mark && board[b[0]][b[1]] === " ") return [b];
            if (board[b[0]][b[1]] === mark && board[c[0]][c[1]] === mark && board[a[0]][a[1]] === " ") return [a];
        }
        return [];
    }

function findCounter(board) {
        if (board[1][1] === "O") {
            if (board[0][0] === "O" && board[2][2] === "X") {
                if (board[1][0] === "X" && board[0][2] === " ") return [[0, 2]];
                if (board[2][1] === "X" && board[2][0] === " ") return [[2, 0]];
                if (board[1][2] === "X" && board[0][2] === " ") return [[0, 2]];
                if (board[0][1] === "X" && board[2][0] === " ") return [[2, 0]];
            } else if (board[2][2] === "O" && board[0][0] === "X") {
                if (board[1][0] === "X" && board[2][0] === " ") return [[2, 0]];
                if (board[2][1] === "X" && board[0][2] === " ") return [[0, 2]];
                if (board[1][2] === "X" && board[0][2] === " ") return [[0, 2]];
                if (board[0][1] === "X" && board[2][0] === " ") return [[2, 0]];
            } else if (board[2][0] === "O" && board[0][2] === "X") {
                if (board[1][0] === "X" && board[2][2] === " ") return [[2, 2]];
                if (board[2][1] === "X" && board[0][0] === " ") return [[0, 0]];
                if (board[1][2] === "X" && board[2][2] === " ") return [[2, 2]];
                if (board[0][1] === "X" && board[0][0] === " ") return [[0, 0]];
            } else if (board[0][2] === "O" && board[2][0] === "X") {
                if (board[1][0] === "X" && board[0][0] === " ") return [[0, 0]];
                if (board[2][1] === "X" && board[2][2] === " ") return [[2, 2]];
                if (board[1][2] === "X" && board[0][0] === " ") return [[0, 0]];
                if (board[0][1] === "X" && board[2][2] === " ") return [[2, 2]];
            }
        }
        return [];
}