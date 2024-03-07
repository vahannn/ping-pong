import asyncio
import websockets
import json
import jsonpickle
import uuid
import pygame
import threading
# from threading import Thread

pygame.init()
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

WIDTH, HEIGHT = 700, 500
# WIN = pygame.display.set_mode((WIDTH, HEIGHT))
# pygame.display.set_caption("Pong")

FPS = 60
PADDLE_WIDTH, PADDLE_HEIGHT = 20, 100
BALL_RADIUS = 7

# SCORE_FONT = pygame.font.SysFont("comicsans", 50)
WINNING_SCORE = 10


def json_dump_obj(self) -> dict:
    return {"websocket": "null" }


async def send_obj(obj, viewers):
    # print("send_obj(obj, viewers):", viewers)
    payLoad = {
        "method": "update",
        "state": {
            str(type(obj)): obj
        }
    }
    payLoadStringify = json.dumps(payLoad, default=vars)
    for x in viewers:
        await x["ws"].send(payLoadStringify)

websockets.json_dump_obj = json_dump_obj

class Paddle:
    COLOR = WHITE
    VEL = 4

    def __init__(self, x, y, width, height):
        self.x = self.original_x = x
        self.y = self.original_y = y
        self.width = width
        self.height = height

    def draw(self, win):
        pygame.draw.rect(
            win, self.COLOR, (self.x, self.y, self.width, self.height))

    def move(self, up=True):
        if up:
            self.y -= self.VEL
        else:
            self.y += self.VEL

    def reset(self):
        self.x = self.original_x
        self.y = self.original_y

class Ball:
    MAX_VEL = 5
    COLOR = WHITE

    def __init__(self, x, y, radius):
        self.x = self.original_x = x
        self.y = self.original_y = y
        self.radius = radius
        self.x_vel = self.MAX_VEL
        self.y_vel = 0

    def draw(self, win):
        pygame.draw.circle(win, self.COLOR, (self.x, self.y), self.radius)

    def move(self):
        self.x += self.x_vel
        self.y += self.y_vel

    def reset(self):
        self.x = self.original_x
        self.y = self.original_y
        self.y_vel = 0
        self.x_vel *= -1

class Player:

    def __init__(self, id, paddle):
        self.id = id
        self.score = 0
        self.paddle = paddle
        # self.websocket = websocket


class Game:
    
    MAX_PLAYER = 2

    def __init__(self, id):
        self.id = id
        self.playeres = []
        self.viewers = list()

    def addPlayer(self, id, websocket):
        if len(self.playeres) < self.MAX_PLAYER:
            if len(self.playeres) == 0:
                player = Player(id, Paddle(10, HEIGHT//2 - PADDLE_HEIGHT //
                                2, PADDLE_WIDTH, PADDLE_HEIGHT))
            else:
                player = Player(id, Paddle(WIDTH - 10 - PADDLE_WIDTH, HEIGHT //
                                2 - PADDLE_HEIGHT//2, PADDLE_WIDTH, PADDLE_HEIGHT))
            self.playeres.append(player)
            self.viewers.append({
                "id": id,
                "ws": websocket,
            })

    def handle_collision(self, ball, left_paddle, right_paddle):
        if ball.y + ball.radius >= HEIGHT:
            ball.y_vel *= -1
        elif ball.y - ball.radius <= 0:
            ball.y_vel *= -1

        if ball.x_vel < 0:
            if ball.y >= left_paddle.y and ball.y <= left_paddle.y + left_paddle.height:
                if ball.x - ball.radius <= left_paddle.x + left_paddle.width:
                    ball.x_vel *= -1

                    middle_y = left_paddle.y + left_paddle.height / 2
                    difference_in_y = middle_y - ball.y
                    reduction_factor = (left_paddle.height / 2) / ball.MAX_VEL
                    y_vel = difference_in_y / reduction_factor
                    ball.y_vel = -1 * y_vel

        else:
            if ball.y >= right_paddle.y and ball.y <= right_paddle.y + right_paddle.height:
                if ball.x + ball.radius >= right_paddle.x:
                    ball.x_vel *= -1

                    middle_y = right_paddle.y + right_paddle.height / 2
                    difference_in_y = middle_y - ball.y
                    reduction_factor = (right_paddle.height / 2) / ball.MAX_VEL
                    y_vel = difference_in_y / reduction_factor
                    ball.y_vel = -1 * y_vel


    async def handle_paddle_movement(self, keys, left_paddle, right_paddle):
        # if keys[pygame.K_w] and left_paddle.y - left_paddle.VEL >= 0:
        #     left_paddle.move(up=True)
        # if keys[pygame.K_s] and left_paddle.y + left_paddle.VEL + left_paddle.height <= HEIGHT:
        #     left_paddle.move(up=False)

        if keys[pygame.K_UP] and right_paddle.y - right_paddle.VEL >= 0:
            right_paddle.move(up=True)
            await send_obj(right_paddle, self.viewers)
        if keys[pygame.K_DOWN] and right_paddle.y + right_paddle.VEL + right_paddle.height <= HEIGHT:
            right_paddle.move(up=False)
            await send_obj(left_paddle, self.viewers)

    async def some_callback(args):
        await some_function()

    def between_callback(self, args):
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)

        loop.run_until_complete(self.start())
        loop.close()

    async def start(self):
        run = True
        clock = pygame.time.Clock()

        left_paddle = Paddle(10, HEIGHT//2 - PADDLE_HEIGHT //
                            2, PADDLE_WIDTH, PADDLE_HEIGHT)
        right_paddle = Paddle(WIDTH - 10 - PADDLE_WIDTH, HEIGHT //
                            2 - PADDLE_HEIGHT//2, PADDLE_WIDTH, PADDLE_HEIGHT)
        ball = Ball(WIDTH // 2, HEIGHT // 2, BALL_RADIUS)
        # print("self.viewers = ", self.viewers)
        await send_obj(left_paddle, self.viewers)
        await send_obj(right_paddle, self.viewers)
        await send_obj(ball, self.viewers)
        left_score = 0
        right_score = 0

        while run:
            clock.tick(FPS)
            # draw(WIN, [left_paddle, right_paddle], ball, left_score, right_score)

            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    run = False
                    break

            keys = pygame.key.get_pressed()
            await self.handle_paddle_movement(keys, left_paddle, right_paddle)
            ball.move()
            self.handle_collision(ball, left_paddle, right_paddle)

            if ball.x < 0:
                right_score += 1
                ball.reset()
            elif ball.x > WIDTH:
                left_score += 1
                ball.reset()
            await send_obj(ball, self.viewers)
            won = False
            if left_score >= WINNING_SCORE:
                won = True
                win_text = "Left Player Won!"
            elif right_score >= WINNING_SCORE:
                won = True
                win_text = "Right Player Won!"

            if won:
                text = SCORE_FONT.render(win_text, 1, WHITE)
                WIN.blit(text, (WIDTH//2 - text.get_width() //
                                2, HEIGHT//2 - text.get_height()//2))
                pygame.display.update()
                pygame.time.delay(5000)
                ball.reset()
                left_paddle.reset()
                right_paddle.reset()
                left_score = 0
                right_score = 0

games = {}

async def server(websocket, path):
    try:
        async for message in websocket:
            result = json.loads(message)
            # print("Server Received: ", message)
            payLoad = {}
            # del test_dict['Mani']
            if result["method"] == "create":
                gameId = uuid.uuid4()
                gameId = str(gameId)
                game = Game(gameId)
                games[gameId] = game
                game.addPlayer(result["clientId"], websocket)
                # print("game.viewers = ", game.viewers)
                payLoad = {
                    "method": "create",
                    "game": {
                        "id": game.id,
                        "playeres": game.playeres,
                        "viewers": [],
                    }
                }
            if result["method"] == "join":
                payLoad = {
                    "method": "join",
                }
                gameId = result["gameId"]
                # try:
                if gameId == None:
                    payLoad["error"] = "game is not found"
                else:
                    try:
                        game = games[gameId]
                        if len(game.playeres) >= 2:
                            payLoad["game"] = {
                                "id": game.id,
                                "playeres": game.playeres,
                                "viewers": [],
                            }
                            payLoad["error"] = "game is full"
                        else:
                            game.addPlayer(result["clientId"], websocket)
                            payLoad["game"] = {
                                "id": game.id,
                                "playeres": game.playeres,
                                "viewers": [],
                                "state": {
                                    "paddle1": Paddle(10, HEIGHT//2 - PADDLE_HEIGHT //
                                                    2, PADDLE_WIDTH, PADDLE_HEIGHT),
                                    "paddle2": Paddle(WIDTH - 10 - PADDLE_WIDTH, HEIGHT //
                                                    2 - PADDLE_HEIGHT//2, PADDLE_WIDTH, PADDLE_HEIGHT),
                                    "ball": Ball(WIDTH // 2, HEIGHT // 2, BALL_RADIUS),
                                }
                            }
                    except KeyError:
                        payLoad["error"] = "game is not found"
            if result["method"] == "start":
                payLoad = {
                    "method": "start",
                }
                gameId = result["gameId"]
                if gameId == None:
                    payLoad["error"] = "game is not found"
                else:
                    try:
                        game = games[gameId]
                        if len(game.playeres) < 2:
                            payLoad["game"] = {
                                "id": game.id,
                                "playeres": game.playeres,
                                "viewers": [],
                            }
                            payLoad["error"] = "game is empty"
                        else:
                            t = threading.Thread(target=game.between_callback, args=(1,))
                            # print(game.id)
                            t.start()
                            payLoad["game"] = {
                                "id": game.id,
                                "playeres": game.playeres,
                                "viewers": [],
                            }
                    except KeyError:
                        payLoad["error"] = "game is not found"

            payLoadStringify = json.dumps(payLoad, default=vars)
            # payLoadStringify = json_string = jsonpickle.encode(payLoad)
            await websocket.send(payLoadStringify)
            # print(f'Server Sent: {payLoadStringify}')
    finally:
        print("Unregister")
    

start_server = websockets.serve(server, "localhost", 5000)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()