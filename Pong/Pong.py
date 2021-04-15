import turtle
from time import sleep


def create_item(position = (-350, 0), shapesize = (5, 1)):
    item = turtle.Turtle()
    item.speed(0)
    item.shape("square")
    item.shapesize(*shapesize)
    item.penup()
    item.goto(*position)
    item.color("white")
    
    return item

def move_paddle(paddle, screen, direct=1):
    m_y = direct * 20
    check = screen.window_height()/2
    def move():
        y = paddle.ycor() + m_y
        if (y < -check):
            y = -check
        elif (y > check):
            y = check
        paddle.sety(y)
    
    return move


def move_ball(ball, screen, d_x = 2, d_y = -3):
    
    check_h = screen.window_height()/2 - 20
    check_w = screen.window_width()/2 - 70
    
    ball.d_x = d_x
    ball.d_y = d_y
    # Khoảng cách từ tâm paddle tới rìa
    DISTANCE = 50
    
    def move(paddle_a, paddle_b):
        x = ball.xcor() + ball.d_x
        y = ball.ycor() + ball.d_y
        game_end = 0
        
        if (y >= check_h or y <= -check_h):
            ball.d_y *= -1
            
        if (x >= check_w):
            high = paddle_b.ycor() + DISTANCE
            low = paddle_b.ycor() - DISTANCE

            if (low < y < high):
                ball.d_x *= -1
            else:
                game_end = -1
        elif (x <= -check_w):
            high = paddle_a.ycor() + DISTANCE
            low = paddle_a.ycor() - DISTANCE

            if (low < y < high):
                ball.d_x *= -1
            else:
                game_end = -1
            
        ball.goto(x, y)
        sleep(0.02)
        
        return game_end
    
    return move

def main():
    print("Main loop")
    
    screen = turtle.Screen()
    screen.bgcolor("black")
    screen.title("Pong Game @15/4/2021")
    screen.setup(width=800, height=600)
    screen.tracer(0)
    
    paddle_a = create_item()

    paddle_b = create_item((350, 0))

    ball = create_item((0, 0), (1, 1))
    
    screen.onkeypress(move_paddle(paddle_a, screen, 1), 'e')
    screen.onkeypress(move_paddle(paddle_a, screen, -1), "s")
    screen.onkeypress(move_paddle(paddle_b, screen, 1), "Up")
    screen.onkeypress(move_paddle(paddle_b, screen, -1), "Down")
    screen.listen()

    ball_move = move_ball(ball, screen)

    while True:
        screen.update()
        
        tmp = ball_move(paddle_a, paddle_b)
        if (tmp != 0):
            if (tmp == 1):
                print("Ben Phai Thang")
            else:
                print("Ben Trai Thang")
            break
    
if __name__ == "__main__":
    print("Da chay")
    main()
    
