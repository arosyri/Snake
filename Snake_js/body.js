const field = document.getElementById("game"); // прив'язуємо html
const ctx = field.getContext("2d");

const ground = new Image();
ground.src = "img/ground.png";

const appleImage = new Image();
appleImage.src = "img/apple.png";

const snakeImage = new Image();
snakeImage.src = "img/bodysnake.png";

let box = 32; // розмір яблука
let score = 0;
let apple = {
    x: Math.floor(( Math.random() * 18 + 1)) * box, // координати, де може з'явитися яблуко
    y: Math.floor(( Math.random() * 18 + 1)) * box,
};
let snake = [];
snake[0] = {
    x: 9 * box, // з'являється посередині
    y: 9 * box
};

document. addEventListener ("keydown", direction); // задаємо клавіші керування

let dir;
function direction(event) { // коди клавіш
    if (event.keyCode === 37 && dir !== "right") // перевірка
        dir = "left";
    else if (event.keyCode === 38 && dir !== "down")
        dir = "up";
    else if (event.keyCode === 39 && dir !== "left")
        dir = "right";
    else if (event.keyCode === 40 && dir !== "up")
        dir = "down";
}
function tail(head, array) { // припиняємо гру при зіткненні голови та хвоста
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y)
            clearInterval(game);
    }
}

function drawGame(){ // виводимо всі об'єкти
    ctx.drawImage(ground, 0, 0);
    ctx.drawImage(appleImage, apple.x, apple.y);

    for(let i = 0; i < snake.length; i++) {
        ctx.drawImage(snakeImage, snake[i].x, snake[i].y);
    }

    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText(score, box  , box * 1.4 ); // задаємо колір, шрифт, координати для рахунку

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(snakeX === apple.x && snakeY === apple.y) {
        score++; // збільшує рахунок
        apple = {
            x: Math.floor(( Math.random() * 18 + 1)) * box, // нові координати яблука
            y: Math.floor(( Math.random() * 18 + 1)) * box,
        };
    } else {
        snake.pop(); // видаляємо останній елемент у масиві
    }
    if(snakeX < box || snakeX > box * 18 // задаємо координати гри
        || snakeY < box || snakeY > box * 18)
        clearInterval(game);

    if(dir === "left") snakeX -= box; // пересуваємо змійку
    if(dir === "right") snakeX += box;
    if(dir === "up") snakeY -= box;
    if(dir === "down") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    };
    tail(newHead, snake);

    snake.unshift(newHead);

}
let game = setInterval(drawGame, 100);// задаємо інтервал