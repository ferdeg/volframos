// myos.js
const { exec } = require("child_process");

// Банер при старті
console.clear();
console.log("==================================");
console.log("   Welcome to Volfram OS v0.1.1");
console.log("   Made with Node.js");
console.log("   Type 'help' for commands");
console.log("==================================\n");

var parol = 1234
var sekretparol = 5678

let fs = {
  home: { user: {} },
  bin: {},
  etc: {}
};

let cwd = ["home", "user"];

function getDir(path) {
  let d = fs;
  for (let p of path) d = d[p];
  return d;
}

function runLine(line) {
  const parts = line.trim().split(/\s+/);
  if (!parts[0]) return;
  const cmd = parts[0], arg1 = parts[1], arg2 = parts[2];

  if (cmd === "ls") {
    console.log(Object.keys(getDir(cwd)).join("  "));
  } else if (cmd === "cd") {
    if (!arg1) console.log("usage: cd <dir>");
    else if (arg1 === "..") { if (cwd.length > 1) cwd.pop(); }
    else if (getDir(cwd)[arg1]) cwd.push(arg1);
    else console.log("no such dir");
  } else if (cmd === "touch") {
    if (!arg1) console.log("usage: touch <name>");
    else getDir(cwd)[arg1] = "";
  } else if (cmd === "pwd") {
    console.log("/" + cwd.join("/"));
  } else if (cmd === "run") {
    if (!arg1 || !arg2) {
      console.log('usage: run game <filename>');
    } else {
      let cmdStr;
      if (arg1 === "game") {
        cmdStr = `${arg2}.py`;
      } else {
        console.log("невідомий тип:", arg1);
        return;
      }

      exec(cmdStr, (error, stdout, stderr) => {
        if (error) {
          console.error(`Помилка: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
          return;
        }
        console.log(stdout);
      });
    }
  } else if (cmd === "exit") {
    process.exit(0);
  } else if (cmd === "uptime") { // час роботи системи
    const uptime = process.uptime();
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    console.log(`Час роботи системи: ${hours} годин, ${minutes} хвилин, ${seconds} секунд`);
  } else if (cmd === "day") { // який сьогодні день
    const days = ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"];
    const now = new Date();
    console.log("Сьогодні:", days[now.getDay()]);
  } else if(cmd === "whoami") {
    console.log("Volfram")
  } else if (cmd === "reset") {
    if (arg1 === "volfram") {
      parol = 1234
      console.log("пароль скинуто")
    } else {
      console.log("неправельний логін")
    }
  } else if (cmd === "calc") {
    if (!arg1) {
      console.log("usage: calc <expression>")
    } else {
      try {
        const result = eval(arg1);
        console.log(result);
      } catch (e) {
        console.log("error:", e.message);
      }
    }
  } else if (cmd === "login") {
    if (!arg1 || !arg2) {
      console.log("usage: login <user> <password>");
    } else if (arg1 === "volfram" && arg2 === parol) {
      console.log("login successful");
    } else {
      console.log("login failed");
    }
      } else if (cmd === "echo") {
    if (!arg1) console.log("usage: echo <text>");
    else console.log(parts.slice(1).join(" "));
  } else if (cmd === "mkdir") {
    if (!arg1) console.log("usage: mkdir <name>");
    else if (getDir(cwd)[arg1]) console.log("Папка вже існує");
    else getDir(cwd)[arg1] = {};
  } else if (cmd === "cat") {
    if (!arg1) console.log("usage: cat <filename>");
    else if (!getDir(cwd)[arg1]) console.log("Файл не знайдено");
    else console.log(getDir(cwd)[arg1]);
  } else if (cmd === "history") {
    if (history.length === 0) console.log("Історія порожня");
    else console.log(history.join("\n"));
  } else if (cmd === "coin") {
    const flip = Math.random() < 0.5 ? "heads" : "tails";
    console.log(flip);
  } else if (cmd === "osinfo") {
    console.log("Operating System: volframOS");
    console.log("Version: 0.1.1");
    console.log("Author: ferdeg");
  } else if (cmd === "open_code") {
    console.log("Відкрито код на : покищо немає :(");
  } else if (cmd === "👎os") {
    console.log("Ви ввели заборонену команду. Система буде перезавантажена.");
    process.exit(1);
  } else if (cmd === "help") {
    console.log("Доступні команди:");
    console.log("ls - список файлів");
    console.log("cd <dir> - змінити директорію");
    console.log("touch <name> - створити файл");
    console.log("pwd - показати поточну директорію");
    console.log("run game <filename> - запустити гру");
    console.log("exit - вийти з терміналу");
    console.log("whoami - показати ім'я користувача");
    console.log("reset volfram - скинути пароль (логін volfram)");
    console.log("calc <expression> - обчислити вираз");
    console.log("login <user> <password> - увійти в систему");
    console.log("coin - підкинути монетку");
    console.log("osinfo - інформація про ОС");
    console.log("open_code - відкрити код ОС");
    console.log("help - показати цю довідку");
    console.log("time - показати поточний час");
    console.log("👎os - заборонена команда");
    console.log("ping <hostname> - пінгувати хост");
    console.log("random [max] - випадкове число від 1 до max (за замовчуванням 100)");
    console.log("clear - очистити консоль");
    console.log("chatgpt - відкрити ChatGPT в браузері");
    console.log("youtube - відкрити YouTube в браузері");
    console.log("google - відкрити Google в браузері");
    console.log("github - відкрити GitHub в браузері");
    console.log("systeminfo - показати інформацію про систему");
    console.log("ip - показати інформацію про IP");
    console.log("s - вимкнути Windows через 3 хвилини");
    console.log("r - перезавантажити Windows через 3 хвилини");
    console.log("c - скасувати вимикання Windows");
    console.log("date - показати поточну дату");
    console.log("datetime - показати поточну дату і час");
    console.log("uptime - показати час роботи системи");
    console.log("day - який сьогодні день");
    console.log("? <dd.mm.yyyy> - скільки днів до вказаної дати");
    console.log("history - показати історію команд");
    console.log("mkdir <name> - створити папку");
    console.log("cat <filename> - показати вміст файлу");
    console.log("👎os - заборонена команда");
    console.log("guess <query> - пошук в Google");
      } else if (cmd === "game") { // нова команда для ігор
    if (!arg1) {
      console.log("usage: game <name>");
    } else if (arg1 === "guessnumber" || arg1 === "gn") {
      // гра "Вгадай число"
      const secret = Math.floor(Math.random() * 100) + 1;
      console.log("🎮 Гра 'Вгадай число'!");
      console.log("Я загадав число від 1 до 100. Спробуй вгадати!");
      
      const ask = () => {
        rl.question("Введи число: ", (input) => {
          const guess = parseInt(input);
          if (isNaN(guess)) {
            console.log("Введи саме число 😉");
            return ask();
          }
          if (guess < secret) {
            console.log("Більше ⬆️");
            ask();
          } else if (guess > secret) {
            console.log("Менше ⬇️");
            ask();
          } else {
            console.log("✅ Точно! Ти вгадав число:", secret);
            prompt(); // повернення в термінал
          }
        });
      };
      ask();
    } else if (arg1 === "sn") {
    const width = 20, height = 10;
    let snake = [{ x: 5, y: 5 }];
    let dir = { x: 1, y: 0 };
    let food = { x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height) };
    let running = true;

    function draw() {
        console.clear();
        for (let y = 0; y < height; y++) {
            let row = "";
            for (let x = 0; x < width; x++) {
                if (snake.some(s => s.x === x && s.y === y)) row += "O";
                else if (food.x === x && food.y === y) row += "X";
                else row += ".";
            }
            console.log(row);
        }
    }

    function update() {
        const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
        if (head.x < 0 || head.y < 0 || head.x >= width || head.y >= height || snake.some(s => s.x === head.x && s.y === head.y)) {
            console.log("💀 Ти програв! Вова, гнила груша тебе з’їла! 😈");
            exec(`.\\node\\node.exe -e "require('child_process').exec('start https://www.youtube.com/watch?v=dQw4w9WgXcQ')"`);
            cleanup();
            return;
        }
        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
            food = { x: Math.floor(Math.random() * width), y: Math.floor(Math.random() * height) };
        } else {
            snake.pop();
        }
        draw();
    }

    function cleanup() {
        running = false;
        clearInterval(interval);
        process.stdin.setRawMode(false);
        process.stdin.removeAllListeners("data");
        rl.resume();
        prompt();
    }

    draw();
    const interval = setInterval(() => {
        if (running) update();
    }, 200);

    process.stdin.setRawMode(true);
    rl.pause();
    process.stdin.on("data", (key) => {
        if (key.equals(Buffer.from([0x1b, 0x5b, 0x41]))) dir = { x: 0, y: -1 }; // вверх
        else if (key.equals(Buffer.from([0x1b, 0x5b, 0x42]))) dir = { x: 0, y: 1 }; // вниз
        else if (key.equals(Buffer.from([0x1b, 0x5b, 0x44]))) dir = { x: -1, y: 0 }; // вліво
        else if (key.equals(Buffer.from([0x1b, 0x5b, 0x43]))) dir = { x: 1, y: 0 }; // вправо
        else if (key.toString() === "q") {
            console.log("🚪 Вихід зі змійки. Вова, гнила груша перемогла!");
            cleanup();
        }
    });
  } else if (arg1 === "subway" || arg1 === "sbl") { // гра управляня і менаня перешкод стрілками за машину
    const width = 30, height = 10;
    let car = { x: Math.floor(width / 2), y: height - 1 };
    let obstacles = [];
    let score = 0;
    let running = true;
    let speed = 300;

    function draw() {
        console.clear();
        for (let y = 0; y < height; y++) {
            let row = "";
            for (let x = 0; x < width; x++) {
                if (car.x === x && car.y === y) row += "A";
                else if (obstacles.some(o => o.x === x && o.y === y)) row += "#";
                else row += ".";
            }
            console.log(row);
        }
        console.log("Score:", score);
    }

    function update() {
        if (Math.random() < 0.3) {
            obstacles.push({ x: Math.floor(Math.random() * width), y: 0 });
        }
        obstacles.forEach(o => o.y++);
        obstacles = obstacles.filter(o => o.y < height);
        if (obstacles.some(o => o.x === car.x && o.y === car.y)) {
            console.log("💥 Ти вдарився! Гра закінчена. Вова, гнила груша тебе з’їла! 😈");
            exec(`.\\node\\node.exe -e "require('child_process').exec('start https://www.youtube.com/watch?v=dQw4w9WgXcQ')"`);
            cleanup();
            return;
        }
        score++;
        if (score % 10 === 0 && speed > 50) speed -= 20;
        draw();
    }
    function cleanup() {
        running = false;
        clearInterval(interval);
        process.stdin.setRawMode(false);
        process.stdin.removeAllListeners("data");
        rl.resume();
        prompt();
    }
    draw();
    const interval = setInterval(() => {
        if (running) update();
    }, speed);
    process.stdin.setRawMode(true);
    rl.pause();
    process.stdin.on("data", (key) => {
        if (key.equals(Buffer.from([0x1b, 0x5b, 0x44])) && car.x > 0) car.x--; // вліво
        else if (key.equals(Buffer.from([0x1b, 0x5b, 0x43])) && car.x < width - 1) car.x++;
        else if (key.toString() === "q") {
            console.log("🚪 Вихід з гри. Вова, гнила груша перемогла!");
            cleanup();
        }
    });
  } else if (arg1 === "ttt") {
    let board = [
      [" ", " ", " "],
      [" ", " ", " "],
      [" ", " ", " "]
    ];
    let player = "X";
    let ai = "O";
    let moves = []; // зберігає усі ходи, щоб видаляти старі

    function printBoard() {
      console.clear();
      console.log(`
       0   1   2
    0  ${board[0][0]} | ${board[0][1]} | ${board[0][2]}
      ---+---+---
    1  ${board[1][0]} | ${board[1][1]} | ${board[1][2]}
      ---+---+---
    2  ${board[2][0]} | ${board[2][1]} | ${board[2][2]}
      `);
    }

    function removeOldMoves() {
      while (moves.length > 6) { // лишаємо по 3 X і 3 O
        let [r, c] = moves.shift();
        board[r][c] = " ";
      }
    }

    function checkWin(symbol) {
      for (let i = 0; i < 3; i++) {
        if (board[i][0] === symbol && board[i][1] === symbol && board[i][2] === symbol) return true;
        if (board[0][i] === symbol && board[1][i] === symbol && board[2][i] === symbol) return true;
      }
      if (board[0][0] === symbol && board[1][1] === symbol && board[2][2] === symbol) return true;
      if (board[0][2] === symbol && board[1][1] === symbol && board[2][0] === symbol) return true;
      return false;
    }

    function aiMove() {
      let empty = [];
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          if (board[r][c] === " ") empty.push([r, c]);
        }
      }
      if (empty.length === 0) return;
      let [r, c] = empty[Math.floor(Math.random() * empty.length)];
      board[r][c] = ai;
      moves.push([r, c]);
      removeOldMoves();
    }

    function turn() {
      printBoard();
      rl.question(`Твій хід (рядок,стовпець): `, (input) => {
        let [row, col] = input.split(",").map(Number);
        if (row >= 0 && row < 3 && col >= 0 && col < 3 && board[row][col] === " ") {
          board[row][col] = player;
          moves.push([row, col]);
          removeOldMoves();

          if (checkWin(player)) {
            printBoard();
            console.log("Ти переміг!");
            prompt();
            return;
          }

          aiMove();

          if (checkWin(ai)) {
            printBoard();
            console.log("Комп’ютер переміг!");
            prompt();
            return;
          }

          turn();
        } else {
          console.log("Неправильний хід, спробуй ще.");
          turn();
        }
      });
    }

    turn();
  } else if (arg1 === "2048") {
    let board = [
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0],
      [0,0,0,0]
    ];

    function addTile() {
      let empty = [];
      for (let r=0;r<4;r++){
        for(let c=0;c<4;c++){
          if(board[r][c]===0) empty.push([r,c]);
        }
      }
      if(empty.length===0) return;
      let [r,c] = empty[Math.floor(Math.random()*empty.length)];
      board[r][c] = Math.random()<0.9 ? 2 : 4;
    }

    function printBoard() {
      console.clear();
      console.log("2048 Game\n");
      for(let row of board){
        console.log(row.map(n => n===0?" . ":n.toString().padStart(3," ")).join(" "));
      }
    }

    function slide(row){
      row = row.filter(n=>n!==0);
      for(let i=0;i<row.length-1;i++){
        if(row[i]===row[i+1]){
          row[i]*=2;
          row[i+1]=0;
        }
      }
      row = row.filter(n=>n!==0);
      while(row.length<4) row.push(0);
      return row;
    }

    function move(dir){
      let moved = false;
      if(dir==="w"){
        for(let c=0;c<4;c++){
          let col = [board[0][c],board[1][c],board[2][c],board[3][c]];
          let newCol = slide(col);
          for(let r=0;r<4;r++){
            if(board[r][c]!==newCol[r]) moved=true;
            board[r][c]=newCol[r];
          }
        }
      } else if(dir==="s"){
        for(let c=0;c<4;c++){
          let col = [board[3][c],board[2][c],board[1][c],board[0][c]];
          let newCol = slide(col).reverse();
          for(let r=0;r<4;r++){
            if(board[r][c]!==newCol[r]) moved=true;
            board[r][c]=newCol[r];
          }
        }
      } else if(dir==="a"){
        for(let r=0;r<4;r++){
          let newRow = slide(board[r]);
          if(board[r].join()!==newRow.join()) moved=true;
          board[r]=newRow;
        }
      } else if(dir==="d"){
        for(let r=0;r<4;r++){
          let newRow = slide(board[r].slice().reverse()).reverse();
          if(board[r].join()!==newRow.join()) moved=true;
          board[r]=newRow;
        }
      }
      if(moved) addTile();
      return moved;
    }

    addTile();
    addTile();

    function gameLoop(){
      printBoard();
      rl.question("Хід (w/a/s/d): ", (input)=>{
        if(["w","a","s","d"].includes(input)){
          move(input);
          gameLoop();
        } else if(input==="exit"){
          prompt();
        } else {
          console.log("Неправильний хід!");
          gameLoop();
        }
      });
    }

    gameLoop();
  } else if (arg1 === "rps" || arg1 === "rockpaperscissors") {
  const choices = { r: "rock", p: "paper", s: "scissors" };

  function playRPS() {
    rl.question("Вибери r-rock, p-paper, s-scissors (або exit щоб вийти): ", (input)=>{
      const player = input.toLowerCase();
      if(player==="exit") {
        prompt();
        return;
      }
      if(!choices[player]){
        console.log("Неправильний вибір!");
        playRPS();
        return;
      }
      const computerChoice = Object.values(choices)[Math.floor(Math.random()*3)];
      console.log("Комп'ютер вибрав:", computerChoice);

      const playerChoice = choices[player];
      if(playerChoice === computerChoice){
        console.log("Нічия!");
      } else if(
        (playerChoice==="rock" && computerChoice==="scissors") ||
        (playerChoice==="paper" && computerChoice==="rock") ||
        (playerChoice==="scissors" && computerChoice==="paper")
      ){
        console.log("Ти виграв!");
      } else {
        console.log("Ти програв!");
      }
      playRPS();
    });
  }

  playRPS();
} else {
  console.log("Невідома гра:", arg1);
}

  } else if (cmd === "guess") { // запрос гугл та отриманя інформації наприклад guess котики
    if (!arg1) {
      console.log("usage: guess <query>");
    } else {
      exec(`start https://www.google.com/search?q=${encodeURIComponent(arg1)}`);
      console.log(`Відкривається Google з запитом: ${arg1}`);
    }
  } else if (cmd === "sudo") { //  робить другий термінал з паролем наприклад команди будуть виконуватись тільки якщо введено пароль і команда exit для вийденя в обичний режим
    if (!arg1) {
      console.log("usage: sudo <пароль>");
    } else if (arg1 == parol) {
      console.log("Вхід в режим sudo. Введіть 'exit' щоб вийти.");
      const rlSudo = require("readline").createInterface({ input: process.stdin, output: process.stdout });
      rlSudo.on("line", (line) => {
        if (line === "exit") {
          rlSudo.close();
          prompt();
        } else {
          runLine(line);
        }
      });
    } else {
      console.log("Неправильний пароль.");
    }
  } else if (cmd === "👎os") {
    console.log("Ви ввели заборонену команду. Система буде перезавантажена.");
    process.exit(1);
  } else if (".cm" === cmd) {
    if (sekretparol == parts[1]) {
      // Додати код для обробки правильної команди
    } else if (parts[1] !== sekretparol) {
        console.log("Неправильний секретний пароль.");
      } else {
        console.log("Неправильний аргумент для команди.");
      }
  } else if (cmd === "s") { // вимикає віндовс
    console.log("Вимикається Windows через 3 хвилини. Збережіть всі дані!");
    exec("shutdown /s /t 180");
  } else if (cmd === "r") { // перезавантажує віндовс
    console.log("Перезавантаження Windows через 3 хвилини. Збережіть всі дані!");
    exec("shutdown /r /t 180");
  } else if (cmd === "c") { // відміняє вимикання віндовс
    console.log("Вимикання Windows скасовано.");
    exec("shutdown /a");
  } else if (cmd === "time") { // показує час
    const now = new Date();
    console.log("Поточний час:", now.toLocaleTimeString());
  } else if (cmd === "date") { // показує дату
    const now = new Date();
    console.log("Поточна дата:", now.toLocaleDateString());
  } else if (cmd === "datetime") { // показує дату і час
    const now = new Date();
    console.log("Поточна дата і час:", now.toLocaleString());
  } else if (cmd === "clear") { // чистить консоль
    console.clear();
  } else if (cmd === "chatgpt") { // виводить текст
    exec("start https://chatgpt.com/?model=auto");
    console.log("Відкривається ChatGPT в браузері.");
  } else if (cmd === "youtube") { // відкриває ютуб
    exec("start https://www.youtube.com");
    console.log("Відкривається YouTube в браузері.");
  } else if (cmd === "google") { // відкриває гугл
    exec("start https://www.google.com");
    console.log("Відкривається Google в браузері.");
  } else if (cmd === "github") { // відкриває гітхаб
    exec("start https://www.github.com");
    console.log("Відкривається GitHub в браузері.");
    } else if (cmd === "systeminfo") { // показує інфу про систему
    exec("systeminfo", (error, stdout, stderr) => {
      if (error) {
        console.error("Помилка:", stderr);
      } else {
        console.log("Інформація про систему:");
        console.log(stdout);
      }
    });
  } else if (cmd === "?") { // показує через скільки днів наступне чиcло наприклад 27.9.2026 через рік
    if (!arg1) {
      console.log("usage: ? <dd.mm.yyyy>");
    } else {
      const targetDate = new Date(arg1.split(".").reverse().join("-"));
      const now = new Date();
      const diffTime = targetDate - now;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      console.log(`До ${arg1} залишилось ${diffDays} днів.`);
    }
  } else if (cmd === "ip") { // показує інфу про інтернет
    exec("ipconfig", (error, stdout, stderr) => {
      if (error) {
        console.error("Помилка:", stderr);
      } else {
        console.log("Інформація про IP:");
        console.log(stdout);
      }
    });
  } else if (cmd === "ping") { // пінгує сайт
    if (!arg1) {
      console.log("usage: ping <hostname>");
    } else {
      exec(`ping ${arg1}`, (error, stdout, stderr) => {
        if (error) {
          console.error("Помилка:", stderr);
        } else {
          console.log("Результат пінгу:");
          console.log(stdout);
        }
      });
    }
  } else if (cmd === "random") { // генерує випадкове число
    const args1 = parts[1];
    const ok = args1 ? parseInt(args1) : 100;
    const randNum = Math.floor(Math.random() * ok) + 1;
    console.log(randNum);
  } else {
    console.log("command not found:", cmd);
  }
}

// Інтерактивний ввод
const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
function prompt() {
  rl.question("/" + cwd.join("/") + " $ ", (line) => {
    runLine(line);
    prompt();
  });
}
prompt();
// збереженя недавних команд вибор по стрілкам
const fs2 = require('fs');
const historyFile = 'history.txt';
let history = [];

// Завантаження історії команд з файлу
if (fs2.existsSync(historyFile)) {
  history = fs2.readFileSync(historyFile, 'utf-8').split('\n').filter(Boolean);
}

// Додавання команди в історію
function addToHistory(command) {
  history.push(command);
  fs2.writeFileSync(historyFile, history.join('\n'), 'utf-8');
}

// Обробка натискання стрілок вгору/вниз
rl.on('line', (line) => {
  if (line === 'up') {
    const lastCommand = history.pop();
    if (lastCommand) {
      rl.setPrompt("/" + cwd.join("/") + " $ " + lastCommand);
      rl.prompt();
    }
  } else if (line === 'down') {
    const nextCommand = history.shift();
    if (nextCommand) {
      rl.setPrompt("/" + cwd.join("/") + " $ " + nextCommand);
      rl.prompt();
    }
  } else {
    addToHistory(line);
  }
});