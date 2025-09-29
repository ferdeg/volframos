"""
Проста гра "Сапер" на Python (Pygame).
Керування: ліва кнопка миші — відкрити клітинку, права кнопка — поставити/зняти прапорець, Esc — вихід.

Запуск: переконайся, що встановлений pygame:
    pip install pygame
    python minesweeper.py
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
MINES_COUNT = 40

# Кольори
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (200, 30, 30)
GRAY = (100, 100, 100)
BLUE = (30, 30, 200)
YELLOW = (255, 255, 0)

FPS = 30

pygame.init()
SCREEN = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
pygame.display.set_caption('Сапер')
CLOCK = pygame.time.Clock()
FONT = pygame.font.SysFont('arial', 20)
BIG_FONT = pygame.font.SysFont('arial', 48)

class Minesweeper:
    def __init__(self):
        self.grid = [[0]*CELL_WIDTH for _ in range(CELL_HEIGHT)]
        self.revealed = [[False]*CELL_WIDTH for _ in range(CELL_HEIGHT)]
        self.flags = [[False]*CELL_WIDTH for _ in range(CELL_HEIGHT)]
        self.mines = set(random.sample([(x, y) for x in range(CELL_WIDTH) for y in range(CELL_HEIGHT)], MINES_COUNT))
        for x, y in self.mines: self.grid[y][x] = -1
        for x in range(CELL_WIDTH):
            for y in range(CELL_HEIGHT):
                if self.grid[y][x] != -1:
                    self.grid[y][x] = sum((nx, ny) in self.mines for nx in range(x-1,x+2) for ny in range(y-1,y+2) if 0<=nx<CELL_WIDTH and 0<=ny<CELL_HEIGHT)

    def reveal(self, x, y):
        if self.revealed[y][x] or self.flags[y][x]: return
        self.revealed[y][x] = True
        if self.grid[y][x] == 0:
            for nx in range(x-1,x+2):
                for ny in range(y-1,y+2):
                    if 0<=nx<CELL_WIDTH and 0<=ny<CELL_HEIGHT: self.reveal(nx, ny)

    def toggle_flag(self, x, y):
        if not self.revealed[y][x]: self.flags[y][x] = not self.flags[y][x]

def draw_cell(surface, position, color):
    x, y = position
    pygame.draw.rect(surface, color, pygame.Rect(x*CELL_SIZE, y*CELL_SIZE, CELL_SIZE, CELL_SIZE))

def draw_grid(surface):
    for x in range(0, WINDOW_WIDTH, CELL_SIZE): pygame.draw.line(surface, GRAY, (x,0),(x,WINDOW_HEIGHT))
    for y in range(0, WINDOW_HEIGHT, CELL_SIZE): pygame.draw.line(surface, GRAY, (0,y),(WINDOW_WIDTH,y))

def draw_text_center(text, font, color, surface, y):
    render = font.render(text, True, color)
    rect = render.get_rect(); rect.center = (WINDOW_WIDTH//2, y); surface.blit(render, rect)

def game_loop():
    game = Minesweeper()
    mines_over = False

    while True:
        for event in pygame.event.get():
            if event.type == pygame.QUIT: pygame.quit(); sys.exit()
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE: pygame.quit(); sys.exit()
            elif event.type == pygame.MOUSEBUTTONDOWN:
                mx, my = pygame.mouse.get_pos(); x, y = mx//CELL_SIZE, my//CELL_SIZE
                if event.button == 1: game.reveal(x, y)
                elif event.button == 3: game.toggle_flag(x, y)

        # Перевірка вибуху
        if any(game.revealed[y][x] and game.grid[y][x]==-1 for x in range(CELL_WIDTH) for y in range(CELL_HEIGHT)):
            mines_over = True

        SCREEN.fill(BLACK)

        # Малюємо поле
        for y in range(CELL_HEIGHT):
            for x in range(CELL_WIDTH):
                if game.revealed[y][x]:
                    color = BLUE if game.grid[y][x]>0 else WHITE
                    draw_cell(SCREEN,(x,y),color)
                    if game.grid[y][x]>0: SCREEN.blit(FONT.render(str(game.grid[y][x]), True, BLACK), (x*CELL_SIZE+4,y*CELL_SIZE+2))
                elif game.flags[y][x]: draw_cell(SCREEN,(x,y),YELLOW)

        draw_grid(SCREEN)

        if mines_over: draw_text_center('ВИБУХ! ГРУ ЗАВЕРШЕНО', BIG_FONT, RED, SCREEN, WINDOW_HEIGHT//2)

        pygame.display.update()
        CLOCK.tick(FPS)

if __name__=='__main__':
    try:
        while True: game_loop()
    except SystemExit: pass
