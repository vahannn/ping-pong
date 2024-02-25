import asyncio
import websockets
import json
import jsonpickle

class Player:

    def __init__(self, id):
        self.id = id
        self.score = 0

class Game:
    MAX_PLAYER = 2

    def __init__(self, id):
        self.id = id
        self.playeres = []

    def addPlayer(self, Player):
        if len(self.playeres) < self.MAX_PLAYER:
            self.playeres.append(Player)

games = {}

async def hello(websocket):
    message = await websocket.recv()
    result = json.loads(message)
    print("Server Received: ", message)
    if result["method"] == "create":
        gameId = id(5)
        game = Game(gameId)
        games[gameId] = game
        game.addPlayer(Player(result["clientId"]))
        payLoad = {
            "method": "create",
            "game" : game
        }
    if result["method"] == "join":
        gameId = result["gameId"]
        game = games[gameId]
        if game == none:
            payLoad = {
                "method": "join",
                "error" : "null gameId"
            }
        else:
            game.addPlayer(Player(result["clientId"]))
            payLoad = {
                "method": "join",
                "game" : game
            }

    payLoadStringify = json.dumps(payLoad, default=vars)
    await websocket.send(payLoadStringify)
    print(f'Server Sent: {payLoadStringify}')

async def main():
    async with websockets.serve(hello, "localhost", 8765):
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())