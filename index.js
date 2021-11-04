var spaceUsed = [false, false, false, false, false, false, false, false, false];
var endArray = [true, true, true, true, true, true, true, true, true];
var possibleWins = [
    [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]
];
var currentTurn = "X";
var winner = "";
var winnerMessage = "";
var winCheck = false;
var maximumCheck = 0;

var currentPlayer = "Player 1";
var firstPlayerScore = 0;
var secondPlayerScore = 0;
var ties = 0;

function clickBox(box, data) {
    if(!spaceUsed[box - 1]) {
        spaceUsed[box - 1] = true;
        data.innerHTML = currentTurn;
        maximumCheck++;
        winCheck = false;

        checkWin();
    }
}

function checkWin() {
    for(i = 0; i < 8; i++) {
        if(($(`#slot-${possibleWins[i][0]}`).html() != "") &&
            ($(`#slot-${possibleWins[i][0]}`).html() == 
            $(`#slot-${possibleWins[i][1]}`).html()) && 
            ($(`#slot-${possibleWins[i][0]}`).html() == 
            $(`#slot-${possibleWins[i][2]}`).html())) {
            winner = $(`#slot-${possibleWins[i][0]}`).html();
            winCheck = true;
            spaceUsed = endArray;
            declareWinner();
            break; 
        }
    }

    if(maximumCheck > 8 && !winCheck) {
        winCheck = true;
        spaceUsed = endArray;
        declareWinner();
    }

    if(!winCheck) {
        nextTurn();
    }
}

function nextTurn() {
    if(currentTurn == "X") {
        currentTurn = "O";
        currentPlayer = "Player 2";
    }
    else {
        currentTurn = "X";
        currentPlayer = "Player 1";
    }

    $("#turn-marker").html(currentPlayer);
}

function declareWinner() {
    if(winner == "X") {
        firstPlayerScore++;
        $("#p1-score").html(`${firstPlayerScore}`);
        winnerMessage = "Player 1 Wins!";
    }
    else if(winner == "O") {
        secondPlayerScore++;
        $("#p2-score").html(`${secondPlayerScore}`);
        winnerMessage = "Player 2 Wins!";
    }
    else {
        ties++;
        $("#tie-marker").html(`${ties}`);
        winnerMessage = "It's a Tie!";
    }

    $(".tic-board").append(`
    <div id="end-message">
        <h1>${winnerMessage}</h1>
        <h3>Click below to restart</h3>
        <button onclick="resetGame()">RESET</button>
    </div>`);
}

function resetGame() {
    for(i = 1; i < 10; i++) {
        $(`#slot-${i}`).html("");
    }

    spaceUsed = [false, false, false, false, false, false, false, false, false];
    currentTurn = "X";
    winner = "";
    maximumCheck = 0;
    currentPlayer = "Player 1";
    $("#turn-marker").html(currentPlayer);

    $("#end-message").remove();
}