"""
Проста гра "Вгадай число" на Python (Pygame).
Гравець має вгадати число від 1 до 100.
Керування: введення числа в текстове поле, Enter — перевірка, Esc — вихід.
Підказки: "Більше" або "Менше".

Запуск: переконайся, що встановлений pygame:
    pip install pygame
    python guess_number.py
"""

import pygame
import random
import sys

# Налаштування вікна
WINDOW_WIDTH = 640
WINDOW_HEIGHT = 480
FPS = 30

# Кольори
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (200, 30, 30)
GREEN = (30, 180, 30)
GRAY = (200, 200, 200)

pygame.init()
SCREEN = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
pygame.display.set_caption('Вгадай число')
CLOCK = pygame.time.Clock()
FONT = pygame.font.SysFont('arial', 32)
BIG_FONT = pygame.font.SysFont('arial', 48)

input_box = pygame.Rect(WINDOW_WIDTH//2 - 100, WINDOW_HEIGHT//2, 200, 50)
user_text = ''
target_number = random.randint(1, 100)
message = 'Введи число від 1 до 100'
game_over = False

def draw_text_center(text, font, color, surface, y):
    render = font.render(text, True, color)
    rect = render.get_rect()
    rect.center = (WINDOW_WIDTH//2, y)
    surface.blit(render, rect)

def game_loop():
    global user_text, target_number, message, game_over
    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT: pygame.quit(); sys.exit()
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE: pygame.quit(); sys.exit()
                if not game_over:
                    if event.key == pygame.K_BACKSPACE:
                        user_text = user_text[:-1]
                    elif event.key == pygame.K_RETURN:
                        if user_text.isdigit():
                            guess = int(user_text)
                            if guess < target_number:
                                message = 'Більше'
                            elif guess > target_number:
                                message = 'Менше'
                            else:
                                message = f'Вітаю! Ти вгадав число {target_number}'
                                game_over = True
                            user_text = ''
                    else:
                        if len(user_text) < 5 and event.unicode.isdigit(): user_text += event.unicode

        SCREEN.fill(BLACK)
        # Вивід повідомлення
        draw_text_center(message, FONT, WHITE, SCREEN, WINDOW_HEIGHT//3)
        # Вивід текстового поля
        pygame.draw.rect(SCREEN, GRAY, input_box, 0)
        draw_text_center(user_text, FONT, BLACK, SCREEN, WINDOW_HEIGHT//2 + 25)

        pygame.display.update()
        CLOCK.tick(FPS)

if __name__=='__main__':
    try:
        game_loop()
    except SystemExit: pass