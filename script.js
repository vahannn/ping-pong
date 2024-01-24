
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

class Ball {
    constructor(x, y, radius, style) {
        this._x = x;
        this._y = y;
        this._radius = radius;
        this._style = style;
        // this._directionVert = -1;
        // this._directionHoriz = -1;
        // this._speed = 1;
        this._dx = getRandomArbitrary(1.4, 2);
        this._dy = getRandomArbitrary(-0.5, 0.5);
        // this._dx = 0.2;
        // this._dy = 0.1;
    };

    draw() {
        // context.beginPath();
        // context.arc(this._x, this._y, this._radius, 0, 2 * Math.PI);
        // context.arc(100, 75, 5, 0, 2 * Math.PI);
        // context.fillStyle = this._style;
        // context.fill();
        context.fillRect(this._x, this._y, this._radius * 2, this._radius * 2);
        // context.fill();
    }

    collides() {
        const min = 0.5;
        const max = 3;
        if (this._x + (this._radius * 2) >= canvas.width ) {
            this._x = canvas.width - (this._radius * 2);
            this._dx = -this._dx * 1.03;
            if (this._dy < 0) {
                this._dy = -getRandomArbitrary(min, max);
            } else {
                this._dy = getRandomArbitrary(min, max);
            }
        } else if (this._x <= 0) {
            this._x = 0;
            this._dx = -this._dx * 1.03;
            if (this._dy < 0) {
                this._dy = -getRandomArbitrary(min, max);
            } else {
                this._dy = getRandomArbitrary(min, max);
            }
        } else if (this._y + (this._radius * 2) >= canvas.height ) {
            this._y = canvas.height - (this._radius * 2);
            this._dy = -this._dy;
        } else if (this._y <= 0) {
            this._y = 0;
            this._dy = -this._dy;
        }
    }

    update () {
        this._x += this._dx;
        this._y += this._dy;
    }
}

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

let data = {
    ball: [new Ball(100, 75, 5, "red")/* , new Ball(50, 600, 5, "red") */]
    // ball: new Ball(100, 75, 5, "red"),
}
console.log(data);
// let ball = new Ball(0, 0, 5, "red")

function draw() {
    data.ball[0].draw();
    // data.ball[1].draw();
}

// context.fillStyle = "red";
// context.strokeRect(75, 0, 150, 110);;
// context.stroke();





function update() {
    // data.ball[0].moveBall();
    data.ball[0].collides();
    data.ball[0].update();

    // data.ball[1].moveBall();
}

function loop() {
    requestAnimationFrame(loop);
    update();
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
