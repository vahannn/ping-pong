import asyncio
import websockets
import json
import jsonpickle
import uuid
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

async def server(websocket, path):
    try:
        async for message in websocket:
            result = json.loads(message)
            print("Server Received: ", message)
            payLoad = {}
            if result["method"] == "create":
                gameId = uuid.uuid4()
                gameId = str(gameId)
                # print(type(gameId))
                # print(gameId)
                game = Game(gameId)
                games[gameId] = game
                game.addPlayer(Player(result["clientId"]))
                payLoad = {
                    "method": "create",
                    "game" : game
                }
            if result["method"] == "join":
                gameId = result["gameId"]
                try:
                    game = games[gameId]
                    game.addPlayer(Player(result["clientId"]))
                    payLoad = {
                        "method": "join",
                        "game" : game
                    }
                finally:
                    payLoad = {
                        "method": "join",
                        "error" : "null gameId"
                    }
            payLoadStringify = json.dumps(payLoad, default=vars)
            await websocket.send(payLoadStringify)
            print(f'Server Sent: {payLoadStringify}')
    finally:
        print("Unregister")
    

start_server = websockets.serve(server, "localhost", 5000)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()