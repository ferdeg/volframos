"""
Проста гра "Змійка" на Python (Pygame).
Керування: стрілки (↑ ↓ ← →). Пауза - пробіл. Перезапустити гру - R. Вийти - Esc або закрити вікно.

Запуск: переконайся, що встановлений pygame:
    pip install pygame
    python snake_game.py

Файл — самостійний, без зовнішніх ресурсів.
"""

import pygame
import random
import sys

# Налаштування гри
WINDOW_WIDTH = 640
WINDOW_HEIGHT = 480
CELL_SIZE = 20
assert WINDOW_WIDTH % CELL_SIZE == 0 and WINDOW_HEIGHT % CELL_SIZE == 0
CELL_WIDTH = WINDOW_WIDTH // CELL_SIZE
CELL_HEIGHT = WINDOW_HEIGHT // CELL_SIZE

# Кольори (RGB)
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (200, 30, 30)
GREEN = (30, 180, 30)
DARK_GREEN = (10, 120, 10)
GRAY = (100, 100, 100)

FPS = 10  # Швидкість гри (збільшити — швидше)

# Ініціалізація pygame
pygame.init()
SCREEN = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
pygame.display.set_caption('Змійка — керування стрілками')
CLOCK = pygame.time.Clock()
FONT = pygame.font.SysFont('arial', 20)
BIG_FONT = pygame.font.SysFont('arial', 48)

# Напрямки як вектори (dx, dy)
UP = (0, -1)
DOWN = (0, 1)
LEFT = (-1, 0)
RIGHT = (1, 0)


def draw_text_center(text, font, color, surface, y):
    """Допоміжна: малює текст по центру по горизонталі на висоті y."""
    render = font.render(text, True, color)
    rect = render.get_rect()
    rect.center = (WINDOW_WIDTH // 2, y)
    surface.blit(render, rect)


class Snake:
    def __init__(self):
        # Початкова змійка з 3 клітин
        self.positions = [(CELL_WIDTH // 2, CELL_HEIGHT // 2),
                          (CELL_WIDTH // 2 - 1, CELL_HEIGHT // 2),
                          (CELL_WIDTH // 2 - 2, CELL_HEIGHT // 2)]
        self.direction = RIGHT
        self.grow_pending = 0

    def head(self):
        return self.positions[0]

    def turn(self, dir_vector):
        # Забороняємо розвертатися на 180 градусів
        opposite = (-self.direction[0], -self.direction[1])
        if dir_vector != opposite:
            self.direction = dir_vector

    def move(self):
        x, y = self.head()
        dx, dy = self.direction
        new = (x + dx, y + dy)
        # Додаємо нову голову
        self.positions.insert(0, new)
        if self.grow_pending > 0:
            self.grow_pending -= 1
        else:
            # Видаляємо хвіст
            self.positions.pop()

    def grow(self):
        self.grow_pending += 1

    def collides_with_self(self):
        return self.head() in self.positions[1:]

    def collides_with_wall(self):
        x, y = self.head()
        return not (0 <= x < CELL_WIDTH and 0 <= y < CELL_HEIGHT)


class Food:
    def __init__(self, snake_positions):
        self.position = self.random_position(snake_positions)

    def random_position(self, snake_positions):
        choices = [(x, y) for x in range(CELL_WIDTH) for y in range(CELL_HEIGHT) if (x, y) not in snake_positions]
        return random.choice(choices) if choices else None

    def respawn(self, snake_positions):
        self.position = self.random_position(snake_positions)


def draw_grid(surface):
    for x in range(0, WINDOW_WIDTH, CELL_SIZE):
        pygame.draw.line(surface, GRAY, (x, 0), (x, WINDOW_HEIGHT))
    for y in range(0, WINDOW_HEIGHT, CELL_SIZE):
        pygame.draw.line(surface, GRAY, (0, y), (WINDOW_WIDTH, y))


def draw_cell(surface, position, color):
    x, y = position
    rect = pygame.Rect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
    pygame.draw.rect(surface, color, rect)


def game_loop():
    snake = Snake()
    food = Food(snake.positions)
    score = 0
    paused = False
    game_over = False

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    pygame.quit()
                    sys.exit()
                if game_over:
                    if event.key == pygame.K_r:
                        return  # Повернутись щоб перезапустити гру
                    continue
                if event.key == pygame.K_SPACE:
                    paused = not paused
                elif event.key == pygame.K_UP:
                    snake.turn(UP)
                elif event.key == pygame.K_DOWN:
                    snake.turn(DOWN)
                elif event.key == pygame.K_LEFT:
                    snake.turn(LEFT)
                elif event.key == pygame.K_RIGHT:
                    snake.turn(RIGHT)

        if not paused and not game_over:
            snake.move()

            # Перевірка зіткнень
            if snake.collides_with_wall() or snake.collides_with_self():
                game_over = True

            # Харчування
            if food.position and snake.head() == food.position:
                snake.grow()
                score += 1
                food.respawn(snake.positions)

        # Малюємо
        SCREEN.fill(BLACK)
        draw_grid(SCREEN)

        # Малюємо їжу
        if food.position:
            draw_cell(SCREEN, food.position, RED)

        # Малюємо змійку
        for i, pos in enumerate(snake.positions):
            color = DARK_GREEN if i == 0 else GREEN
            draw_cell(SCREEN, pos, color)

        # HUD
        score_surf = FONT.render(f'Рахунок: {score}', True, WHITE)
        SCREEN.blit(score_surf, (10, 10))
        if paused:
            draw_text_center('ПАУЗА — натисни ПРОБІЛ щоб продовжити', FONT, WHITE, SCREEN, WINDOW_HEIGHT // 2)

        if game_over:
            draw_text_center('ГРА ЗАВЕРШЕНА', BIG_FONT, RED, SCREEN, WINDOW_HEIGHT // 2 - 40)
            draw_text_center('Натисни R щоб перезапустити або Esc щоб вийти', FONT, WHITE, SCREEN, WINDOW_HEIGHT // 2 + 20)

        pygame.display.update()
        CLOCK.tick(FPS)


if __name__ == '__main__':
    try:
        while True:
            game_loop()
    except SystemExit:
        pass
