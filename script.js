
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");


// function loop() {
//     requestAnimationFrame(loop);
//     update();
//     context.clearRect(0, 0, canvas.width, canvas.height);
//     data.ball.update();
// }



function isOpen(ws) { return ws.readyState === ws.OPEN }

//HTML elements
let clientId = null;
let gameId = null;
let playerColor = null;

let ws = new WebSocket("ws://localhost:5000")
// console.log("ws = ", ws);
const btnCreate = document.getElementById("btnCreate");
const btnJoin = document.getElementById("btnJoin");
const btnStart = document.getElementById("btnStart");
const txtGameId = document.getElementById("txtGameId");
// const divPlayers = document.getElementById("divPlayers");
const divBoard = document.getElementById("divBoard");


//wiring events
btnJoin.addEventListener("click", e => {
    // const obj = {
    //     "key": [1, 2, 5, 5],
    //     "objs": [{"red": 5}, {"blue": 6}]
    // };
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
    // console.log("ws.readyState = ", ws.readyState);
    console.log("ws.send(JSON.stringify(payLoad))) =", ws.send(JSON.stringify(payLoad)));

})

btnStart.addEventListener("click", e => {

    const payLoad = {
        "method": "start",
        "clientId": clientId,
        "gameId": gameId
    }
    ws.send(JSON.stringify(payLoad));

})

btnCreate.addEventListener("click", e => {

    const payLoad = {
        "method": "create",
        "clientId": clientId,
    }
    // console.log("stringify(payLoad) = ", JSON.stringify(payLoad));
    // if (isOpen(ws) === false) {
    //     console.log("closed");
    // } else {
        ws.send(JSON.stringify(payLoad));
    // };

})

ws.onmessage = message => {
    //message.data

    const response = JSON.parse(message.data);
    console.log("Client id Set successfully " + response.clientId);
    console.log("response = ", response);
    // if (ws.readyState === WebSocket.CLOSED) {
    //     console.log("socket closed");
    // } else
    //     console.log("socket active");
    //connect
    if (response.method === "connect"){
        clientId = response.clientId;
        console.log("Client id Set successfully " + clientId)
        console.log("barev")
    }

    //create
    if (response.method === "create"){
        gameId = response.game["id"];
        console.log("game successfully created with id " + response.game.id + " with " + response.game.balls + " balls")  
    }


    //update
    if (response.method === "update"){
        if (!response.state) return;

        for(const b of Object.keys(response.state))
        {
            const objToDraw = response.state[b];
            // context.fillRect(objToDraw._x, objToDraw._y, objToDraw._radius * 2, objToDraw._radius * 2);
            // const ballObject = document.getElementById(b);
            // ballObject.style._x = objToDraw._x;
            // ballObject.style._y = objToDraw._y;
        }
    }

    //join
    if (response.method === "join"){
        const game = response.game;
        console.log(game);
        console.log("joined")
        const objToDraw = response.game.state.paddle1;
        console.log("objToDraw = ", objToDraw)
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillRect(objToDraw.x, objToDraw.y, objToDraw.width, objToDraw.height);
        // while(divPlayers.firstChild)
        //     divPlayers.removeChild (divPlayers.firstChild)
        // const a = document.createElement("div");
        // console.log("response.game = " ,response.game);
        // a.style.id = "paddle1";
        // a.style.width = "20px";
        // a.style.height = "100px";
        // a.style.background = "black";
        // a.style.top = response.game.state.paddle1.x + "px";
        // a.style.left = response.game.state.paddle1.y + "px";
        // divBoard.appendChild(a);
        // const b = document.createElement("div");
        
        // b.style.id = "paddle2";
        // b.style.width = "20px";
        // b.style.height = "100px";
        // b.style.background = "black";
        // b.style.top = response.game.state.paddle2.x + "px";
        // b.style.left = response.game.state.paddle2.y + "px";
        // divBoard.appendChild(b);
        // const c = document.createElement("div");
        
        // c.style.id = "ball";
        // c.style.width = "15px";
        // c.style.height = "15px";
        // c.style.background = "black";
        // divBoard.appendChild(c);
        // d.textContent = c.clientId;
        // game.clients.forEach (c => {

        //     const d = document.createElement("div");
        //     d.style.width = "200px";
        //     d.style.background = c.color
        //     d.textContent = c.clientId;
        //     divPlayers.appendChild(d);

        //     if (c.clientId === clientId) playerColor = c.color;
        // })


        // while(divBoard.firstChild)
        // divBoard.removeChild (divBoard.firstChild)

        // for (let i = 0; i < game.balls; i++){

        //     const b = document.createElement("button");
        //     b.id = "ball" + (i +1);
        //     b.tag = i+1
        //     b.textContent = i+1
        //     b.style.width = "150px"
        //     b.style.height = "150px"
        //     b.addEventListener("click", e => {
        //         b.style.background = playerColor
        //         const payLoad = {
        //             "method": "play",
        //             "clientId": clientId,
        //             "gameId": gameId,
        //             "ballId": b.tag,
        //             "color": playerColor
        //         }
        //         ws.send(JSON.stringify(payLoad))
        //     })
        //     divBoard.appendChild(b);
        // }
    }

    if (response.method === "start") {
        //{1: "red", 1}
        // if (!response.game.state) return;
        // for(const b of Object.keys(response.game.state))
        // {
        //     const color = response.game.state[b];
        //     const ballObject = document.getElementById("ball" + b);
        //     ballObject.style.backgroundColor = color
        // }
    }
}