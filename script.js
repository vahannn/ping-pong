class Ball {
    constructor(x, y, radius, style) {
        this._x = x;
        this._y = y;
        this._radius = radius;
        this._style = style;
        this._direction = -1;
        this._speed = 0.5;
    };
    draw() {
        context.beginPath();
        context.arc(this._x, this._y, this._radius, 0, 2 * Math.PI);
        // context.arc(100, 75, 5, 0, 2 * Math.PI);
        // context.fillStyle = this._style;
        context.fill();
        // context.fillRect(50, 50, 20, 20);
        // context.fill();
    }
}

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

let data = {
    ball: new Ball(100, 75, 5, "red")
}

// let ball = new Ball(0, 0, 5, "red")

function draw() {
    data.ball.draw();
}

// context.fillStyle = "red";
// context.strokeRect(75, 0, 150, 110);;
// context.stroke();

let dx = Math.floor(Math.random() * 4) + 3;
let dy = Math.floor(Math.random() * 4) + 3;

function loop() {
    requestAnimationFrame(loop);
    if (data.ball._x + (data.ball._radius * 2) >= canvas.width ) {
        data.ball._direction *= -1;
        dx = Math.floor(Math.random() * 4) + 3;
        dy = Math.floor(Math.random() * 4) + 3;
    } else if (data.ball._x - (data.ball._radius * 2) <= 0) {
        dx = Math.floor(Math.random() * 4) + 3;
        dy = Math.floor(Math.random() * 4) + 3;
        data.ball._direction *= -1;
    } else if (data.ball._y + (data.ball._radius * 2) >= canvas.height ) {
        dx = Math.floor(Math.random() * 4) + 3;
        dy = Math.floor(Math.random() * 4) + 3;
        data.ball._direction *= -1;
    } else if (data.ball._y - (data.ball._radius * 2) <= 0) {
        dx = Math.floor(Math.random() * 4) + 3;
        dy = Math.floor(Math.random() * 4) + 3;
        data.ball._direction *= -1;
    }
    

    data.ball._x += dx * data.ball._direction * data.ball._speed;
    data.ball._y += dy * data.ball._direction * data.ball._speed;
    
    context.clearRect(0, 0, canvas.width, canvas.height);
    draw();
}
// draw();

loop();



















// const player1 = document.getElementById('player1');
// const player2 = document.getElementById('player2');
// const playBtn = document.getElementById('play_button');
// const board = document.getElementById("board");
// const ball = document.getElementById("ball");
// const ballSpeed = 1;
// const interval = 1000;
// // const speed = 1;

// let boardOffset = board.getBoundingClientRect();
// let ballOffset = ball.getBoundingClientRect();
// playBtn.addEventListener("click", startGame, true);

// function startGame() {
//     const playBtnDiv = document.getElementById("id_play_button_div");
//     playBtnDiv.style.display = "none";
//     startBall();
// }

// function startBall() {
//     let correction = ballOffset.height;
//     let ballStep = ballSpeed;
//     let myInterval = null;
//     let offsetsBall = ball.getBoundingClientRect();
//     // console.log(offsetsBall);
//     clearInterval(myInterval);
//     myInterval = setInterval(ballMove, interval);
//     function ballMove() {
//         let offsetsBall = ball.getBoundingClientRect();
//         if (offsetsBall.y >= boardOffset.height + 1) {
//             clearInterval(myInterval);
//         }
//         if (offsetsBall.x >= boardOffset.width + 1) {
//             clearInterval(myInterval);
//         }
//         tmpBallLeft = offsetsBall.left;
//         tmpBallTop = offsetsBall.top ;
//         offsetsBall.top -= ball.style.marginTop;
//         offsetsBall.left -= ball.style.marginLeft;
//         if (offsetsBall.top + ball.height > boardOffset.height || offsetsBall.top <= 0) {
//             // console.log("stex");
//             ballStep *= -1;
//         }
//         if (offsetsBall.left + ball.width > boardOffset.width || offsetsBall.left < 0) {
//             // console.log("stex");
//             ballStep *= -1;
//         }
//         // console.log("offsetsBall.top + ballStep = ", offsetsBall.top + ballStep);
//         // console.log("offsetsBall.left + ballStep = ", offsetsBall.left + ballStep);
//         // console.log("ballStep = ", ballStep);
//         console.log("tmpBallLeft = ", tmpBallLeft);
//         console.log("ball.style.left = ", ball.style.left);
//         ball.style.top = (tmpBallTop + ballStep) + "px";
//         ball.style.left = (tmpBallLeft) + "px";
//     }
// }
