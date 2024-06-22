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
    if (moveNumber < 2) {
        move = emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
    } else {
        move = findBestMove("O");
        if (!move) {
            move = findBestMove("X");
            if (!move) {
                move = emptyPositions[Math.floor(Math.random() * emptyPositions.length)];
            }
        }
    }
    board[move[0]][move[1]] = "O";
    moveNumber++;
    if (checkWinner("O")) {
        renderBoard();
        messageElement.textContent = "The computer wins.";
        return;
    }
    if (moveNumber >= 9) {
        renderBoard();
        messageElement.textContent = "Draw.";
        return;
    }
    userFirst = true;
    renderBoard();
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

function findBestMove(mark) {
    for (let [row, col] of getEmptyPositions()) {
        board[row][col] = mark;
        if (checkWinner(mark)) {
            board[row][col] = " ";
            return [row, col];
        }
        board[row][col] = " ";
    }
    return null;
}
