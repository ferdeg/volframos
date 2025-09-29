import tkinter as tk
from tkinter import messagebox, simpledialog
from PIL import Image, ImageTk
import os
import random

SAVE_FILE = "save.txt"
BACKGROUND_IMAGE = "ryt.png"   # фон залишається той же
SPRITE_IMAGE = "rot.png"       # новий спрайт для кліків

class ClickerGame:
    def __init__(self, root):
        self.root = root
        self.root.title("Клікер")
        self.root.geometry("400x350")
        self.root.resizable(False, False)

        # Завантаження прогресу
        self.load_game()

        # Фон
        bg_img = Image.open(BACKGROUND_IMAGE).resize((400, 350))
        self.bg_photo = ImageTk.PhotoImage(bg_img)
        self.bg_label = tk.Label(root, image=self.bg_photo)
        self.bg_label.place(x=0, y=0, relwidth=1, relheight=1)

        # Спрайт (клік‑зона)
        sprite_img = Image.open(SPRITE_IMAGE).resize((100, 100))
        self.sprite_photo = ImageTk.PhotoImage(sprite_img)
        self.sprite = tk.Label(root, image=self.sprite_photo, bg="white")
        self.sprite.place(x=150, y=80)
        self.sprite.bind("<Button-1>", self.left_click)
        self.sprite.bind("<Button-3>", self.right_click)

        # Лічильник очок
        self.score_label = tk.Label(root, text="", font=("Arial", 18), bg="#ffffff")
        self.score_label.place(x=20, y=10)
        self.update_score()  # покаже очки та пересіче блокування магазину

        # Кнопки
        self.shop_btn = tk.Button(root, text="Магазин", font=("Arial", 12), command=self.open_shop)
        self.shop_btn.place(x=100, y=260)

        self.roulette_btn = tk.Button(root, text="🎰 Рулетка", font=("Arial", 12), command=self.roulette)
        self.roulette_btn.place(x=200, y=260)

        # Автоклік
        self.root.after(1000, self.auto_click)

    # ===== Збереження / завантаження =====
    def save_game(self):
        """Зберігає весь прогрес у save.txt"""
        with open(SAVE_FILE, "w") as f:
            f.write(
                f"{self.score},{self.click_power},{self.right_click_power},"
                f"{self.auto_click_power},{int(self.shop_disabled)}"
            )

    def load_game(self):
        """Читає прогрес із save.txt або ставить значення за замовчуванням"""
        # дефолт
        self.score = 0
        self.click_power = 1
        self.right_click_power = 5
        self.auto_click_power = 0
        self.shop_disabled = False

        if os.path.exists(SAVE_FILE):
            with open(SAVE_FILE, "r") as f:
                data = f.read().split(",")
            try:
                self.score = int(data[0])
                self.click_power = int(data[1])
                self.right_click_power = int(data[2])
                self.auto_click_power = int(data[3])
                self.shop_disabled = bool(int(data[4])) if len(data) > 4 else False
            except (ValueError, IndexError):
                pass  # якщо файл битий — ігноруємо

    # ===== Основна логіка кліків =====
    def left_click(self, _=None):
        self.score += self.click_power
        self.update_score()

    def right_click(self, _=None):
        self.score += self.right_click_power
        self.update_score()

    def update_score(self):
        """Оновлює лічильник та автоматично блокує/розблокує магазин"""
        # Якщо очки відʼємні — магазин блокується, якщо повернулись у + — розблок.
        self.shop_disabled = self.score < 0
        self.score_label.config(text=f"Очки: {self.score}")
        self.save_game()

    def auto_click(self):
        self.score += self.auto_click_power
        self.update_score()
        self.root.after(1000, self.auto_click)

    # ===== Магазин =====
    def open_shop(self):
        if self.shop_disabled:
            messagebox.showerror("🚫 Магазин заблоковано", "Очки відʼємні. Заробіть 0 або більше, щоб розблокувати магазин.")
            return

        shop = tk.Toplevel(self.root)
        shop.title("Магазин")
        shop.geometry("350x300")

        def try_buy(cost: int, action):
            if self.score >= cost:
                self.score -= cost
                action()
                self.update_score()
                messagebox.showinfo("✅ Покращення", "Куплено!")
            else:
                messagebox.showwarning("❌ Не вистачає очок", f"Потрібно {cost} очок.")

        tk.Label(shop, text="Покращення", font=("Arial", 14)).pack(pady=10)

        tk.Button(shop, text="Клік +1 (30)", command=lambda: try_buy(30, lambda: setattr(self, 'click_power', self.click_power + 1))).pack(pady=2)
        tk.Button(shop, text="Автоклік +2/сек (50)", command=lambda: try_buy(50, lambda: setattr(self, 'auto_click_power', self.auto_click_power + 2))).pack(pady=2)
        tk.Button(shop, text="ПКМ +10 (40)", command=lambda: try_buy(40, lambda: setattr(self, 'right_click_power', self.right_click_power + 10))).pack(pady=2)
        tk.Button(shop, text="Клік ×2 (80)", command=lambda: try_buy(80, lambda: setattr(self, 'click_power', self.click_power * 2))).pack(pady=2)
        tk.Button(shop, text="Автоклік ×2 (100)", command=lambda: try_buy(100, lambda: setattr(self, 'auto_click_power', self.auto_click_power * 2))).pack(pady=2)
        tk.Button(shop, text="ПКМ ×2 (90)", command=lambda: try_buy(90, lambda: setattr(self, 'right_click_power', self.right_click_power * 2))).pack(pady=2)

    # ===== Рулетка =====
    def roulette(self):
        bet = simpledialog.askinteger("🎰 Рулетка", "Введи ставку:")
        if bet is None:
            return
        if bet <= 0:
            messagebox.showerror("⚠️", "Ставка має бути > 0")
            return

        if random.random() < 0.5:  # програш
            penalty = bet * 10
            self.score -= penalty
            messagebox.showinfo("😢 Програш", f"Ти програв! -{penalty} очок.")
        else:  # виграш
            win = bet * 4
            self.score += win
            messagebox.showinfo("🎉 Виграш!", f"Ти виграв! +{win} очок.")
        self.update_score()


if __name__ == "__main__":
    root = tk.Tk()
    game = ClickerGame(root)
    root.mainloop()
