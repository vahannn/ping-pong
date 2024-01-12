class Ball {
    constructor(x, y, radius, style) {
        this._x = x;
        this._y = y;
        this._radius = radius;
        this._style = style;
    };
    draw() {
        context.beginPath();
        context.arc(this._x, this._y, this.radius, 0, 2 * Math.PI);
        // context.arc(100, 75, 5, 0, 2 * Math.PI);
        // context.fillStyle = this._style;
        console.log(this);
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


function loop() {
    requestAnimationFrame(loop);
    // data.ball._x += 1;
    // draw();
}
    draw();

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
