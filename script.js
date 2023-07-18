const player1 = document.getElementById('player1');
const player2 = document.getElementById('player2');
const playBtn = document.getElementById('play_button');
const board = document.getElementById("board");
const ball = document.getElementById("ball");
ball.direction = 

playBtn.addEventListener("click", startGame, true);

function startGame() {
    const playBtnDiv = document.getElementById("id_play_button_div");
    console.log(playBtnDiv);
    playBtnDiv.style.display = "none";
    startBall();
}

function startBall() {
    let pos = ball.getBoundingClientRect();
    let id = null;
    // clearInterval()
    // const myInterval = setInterval(ballMove);
    console.log(ball);
    console.log(pos);
    function ballMove() {
    }
}
