const btns = document.querySelectorAll('.btn');
const winner_window = document.querySelector('.winner');
const winner = document.querySelector('.winner-title');
const restart_game = document.querySelector('.restart-game');
const select_player = document.querySelector('.select-player');
const selected_values = document.querySelectorAll('.selected');
const x_or_o = document.querySelectorAll('.sel');
const player_name = document.querySelector('.player-name');
let isPlayer = false;
let player1 = null;
let played = ['', '', '', '', '', '', '', '', ''];
let player2 = null;
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
if (player1 == null || player2 == null) {
    selection();
}

function setValueToplayer() {
    return new Promise(
        resolve => {
            x_or_o.forEach((btn) => {
                btn.addEventListener('click', () => {
                    resolve(btn.textContent);
                });
            });
        }
    );
}
//restart game button
restart_game.addEventListener('click', restartGame);


// wait for player one to chose between x and o
async function selection() {

    player_name.textContent = "Player 1";
    player_choice = await setValueToplayer();
    if (player_choice == 'x') {
        player1 = 'x';
        player2 = 'o';
    }
    if (player_choice == 'o') {
        player1 = 'o';
        player2 = 'x';
    }
    select_player.classList.add('disable');
    setValues();
}

function setValues() {
    selected_values[0].textContent = player1;
    selected_values[1].textContent = player2;
}


btns.forEach((btn) => {
    btn.addEventListener('click', () => {
        if (btn.textContent == '') handlePlayer(btn);
        handleWinning();
    })
})

//change bettwen players turn
function handlePlayer(btn) {
    index = parseInt(btn.getAttribute("data-cell-index"))
    if (!isPlayer) {
        played[index] = player1;
        btn.textContent = played[index];
        isPlayer = true;
    }
    else if (isPlayer) {
        played[index] = player2;
        btn.textContent = played[index];
        isPlayer = false;
    }
}
// check the winner of the game
function handleWinning() {
    WINNING_COMBINATIONS.forEach(combination => {
        let a = combination[0];
        let b = combination[1];
        let c = combination[2];

        //check the list is not all empty
        if (played[a] != '' || played[b] != '' || played[c] != 'c') {

            // check if the combination is matched 
            if (played[a] == played[b] && played[b] == played[c]) {
                if (played[a] == player1 && isPlayer == true) {
                    winner.textContent = "🏆🏆🏆Player 1 Won the game🏆🏆🏆";
                    winner_window.classList.remove('disable')
                }
                else if (played[a] == player2 && isPlayer == false) {
                    winner.textContent = "🏆🏆🏆Player 2 Won the game🏆🏆🏆"
                    winner_window.classList.remove('disable')
                }
            }
            else if (!played.includes('')) {
                winner.textContent = "THE GAME IS DRAW";
                winner_window.classList.remove('disable');
            }
        }

    })
}
//Restart the game
function restartGame() {
    winner_window.classList.add('disable');
    select_player.classList.remove('disable');
    player1 = null;
    player2 = null;
    selection();
    played = ['', '', '', '', '', '', '', '', ''];
    btns.forEach((btn) => {
        btn.textContent = ''
    })
}