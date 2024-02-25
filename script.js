
// const canvas = document.querySelector("canvas");
// const context = canvas.getContext("2d");

// const playerWidth = 7;
// const playerHeight = 30;

// let data = {
//     ball: new Ball(100, 75, 5, "red"),
//     player1: new player(canvas.width - 5 - playerWidth, canvas.height / 2 - playerHeight / 2, playerWidth, playerHeight, "left"),
//     player2: new player(5, canvas.height / 2 - playerHeight / 2, playerWidth, playerHeight, "right"),
// }

// let componentsToDraw = [data.ball, data.player1, data.player2];
// console.log(data);

// function drawComponents() {
//     for (let i = 0; i < componentsToDraw.length; i++) {
//         componentsToDraw[i].draw();
//     }
// }

// function loop() {
//     requestAnimationFrame(loop);
//     update();
//     context.clearRect(0, 0, canvas.width, canvas.height);
//     data.ball.update();
//     drawComponents();
// }

// loop();



//HTML elements
let clientId = null;
let gameId = null;
let playerColor = null;

let ws = new WebSocket("ws://localhost:8765")
// console.log("ws = ", ws);
const btnCreate = document.getElementById("btnCreate");
const btnJoin = document.getElementById("btnJoin");
const txtGameId = document.getElementById("txtGameId");
const divPlayers = document.getElementById("divPlayers");
const divBoard = document.getElementById("divBoard");


//wiring events
btnJoin.addEventListener("click", e => {

    if (gameId === null)
        gameId = txtGameId.value;
    
    const payLoad = {
        "method": "join",
        "clientId": clientId,
        "gameId": gameId
    }
    if (ws.readyState === WebSocket.CLOSED) {
        console.log("socket closed");
    } 
    console.log("ws.readyState = ", ws.readyState);
    console.log("ws.send(JSON.stringify(payLoad))) =", ws.send(JSON.stringify(payLoad)));

})

btnCreate.addEventListener("click", e => {

    const payLoad = {
        "method": "create",
        "clientId": clientId,
    }
    console.log("stringify(payLoad) = ", JSON.stringify(payLoad));
    ws.send(JSON.stringify(payLoad));

})

ws.onmessage = message => {
    //message.data

    console.log("Client id Set successfully " + message.data);
    const response = JSON.parse(message.data);
    console.log("response = ", response);
    if (ws.readyState === WebSocket.CLOSED) {
        console.log("socket closed");
    } else
        console.log("socket active");
    //connect
    if (response.method === "connect"){
        clientId = response.clientId;
        console.log("Client id Set successfully " + clientId)
    }

    //create
    if (response.method === "create"){
        gameId = response.game.id;
        console.log("game successfully created with id " + response.game.id + " with " + response.game.balls + " balls")  
    }


    //update
    if (response.method === "update"){
        //{1: "red", 1}
        if (!response.game.state) return;
        for(const b of Object.keys(response.game.state))
        {
            const color = response.game.state[b];
            const ballObject = document.getElementById("ball" + b);
            ballObject.style.backgroundColor = color
        }

    }

    //join
    if (response.method === "join"){
        const game = response.game;

        while(divPlayers.firstChild)
            divPlayers.removeChild (divPlayers.firstChild)

        game.clients.forEach (c => {

            const d = document.createElement("div");
            d.style.width = "200px";
            d.style.background = c.color
            d.textContent = c.clientId;
            divPlayers.appendChild(d);

            if (c.clientId === clientId) playerColor = c.color;
        })


        while(divBoard.firstChild)
        divBoard.removeChild (divBoard.firstChild)

        for (let i = 0; i < game.balls; i++){

            const b = document.createElement("button");
            b.id = "ball" + (i +1);
            b.tag = i+1
            b.textContent = i+1
            b.style.width = "150px"
            b.style.height = "150px"
            b.addEventListener("click", e => {
                b.style.background = playerColor
                const payLoad = {
                    "method": "play",
                    "clientId": clientId,
                    "gameId": gameId,
                    "ballId": b.tag,
                    "color": playerColor
                }
                ws.send(JSON.stringify(payLoad))
            })
            divBoard.appendChild(b);
        }
    }
}