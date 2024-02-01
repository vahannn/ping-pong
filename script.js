
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

class player
{
    constructor(x, y, width, height, id, style) {
        this._id = id;
        this._x = x;
        this._y = y;
        this._style = style;
        this._speed = 1;
        this._width = width;
        this._height = height;
    };

    moveUp() {
        this._y -= this._speed;
    }

    moveDown() {
        this._y += this._speed;
    }

    draw() {
        context.fillRect(this._x, this._y, this._width, this._height);
    }
}

class Ball
{
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

    collides(player) {
        if (this._x > player._x + player._width || player._x > this._x + this._width) {
            return false
        }

        if (this._y > player._y + player._height || player._y > this._y + this._height) {
            return false
        }
        return (true);
    }

    update () {
        this._x += this._dx;
        this._y += this._dy;
    }
}

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const playerWidth = 7;
const playerHeight = 30;

let data = {
    ball: new Ball(100, 75, 5, "red"),
    player1: new player(canvas.width - 5 - playerWidth, canvas.height / 2 - playerHeight / 2, playerWidth, playerHeight, "left"),
    player2: new player(5, canvas.height / 2 - playerHeight / 2, playerWidth, playerHeight, "right"),
}

let componentsToDraw = [data.ball, data.player1, data.player2];
console.log(data);
// let ball = new Ball(0, 0, 5, "red")

function drawComponents() {
    for (let i = 0; i < componentsToDraw.length; i++) {
        componentsToDraw[i].draw();
    }
}


function update() {
    const ball = data.ball;
    const player1 = data.ball;
    const player2 = data.ball;
    const min = 0.5;
    const max = 3;

    if (ball.collides(data.player1)) {
        ball._dx = -ball._dx * 1.03
        ball._x = player1._x + 5
    
        if (ball._dy < 0)
            ball._dy = -getRandomArbitrary(min, max)
        else
            ball._dy = getRandomArbitrary(min, max)
    }
    if (data.ball.collides(data.player2)) {
        ball._dx = -ball._dx * 1.03
        ball._x = player2._x - 4

        if (ball._dy < 0)
            ball._dy = -getRandomArbitrary(min, max)
        else
            ball._dy = getRandomArbitrary(min, max)
    }

/* 
    if (ball._x + (ball._radius * 2) >= canvas.width ) {
        ball._x = canvas.width - (ball._radius * 2);
        ball._dx = -ball._dx * 1.03;
        if (ball._dy < 0) {
            ball._dy = -getRandomArbitrary(min, max);
        } else {
            ball._dy = getRandomArbitrary(min, max);
        }
    } else if (ball._x <= 0) {
        ball._x = 0;
        ball._dx = -ball._dx * 1.03;
        if (ball._dy < 0) {
            ball._dy = -getRandomArbitrary(min, max);
        } else {
            ball._dy = getRandomArbitrary(min, max);
        }
    } else */ if (ball._y + (ball._radius * 2) >= canvas.height ) {
        ball._y = canvas.height - (ball._radius * 2);
        ball._dy = -ball._dy;
    } else if (ball._y <= 0) {
        ball._y = 0;
        ball._dy = -ball._dy;
    }
}

function loop() {
    requestAnimationFrame(loop);
    update();
    context.clearRect(0, 0, canvas.width, canvas.height);
    data.ball.update();
    drawComponents();
}
// drawComponents();


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
