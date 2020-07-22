const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
// Create The Unit
const box = 32;
// Load Image
const ground = new Image();
ground.src = "img/ground.png";
const foodImg = new Image();
foodImg.src = "img/food.png";
// Load Audio Files
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const down = new Audio();
const left = new Audio();
const right = new Audio();
dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
down.src = "audio/down.mp3";
left.src = "audio/left.mp3";
right.src = "audio/right.mp3";
// Create The Snake
let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box
};
// Create The Food
let food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box
};
// Create Score
let score = 0;
// Control The Snake
let d;
document.addEventListener("keydown", direction);
function direction(event) {
  let key = event.keyCode;
  if (key == 37 && d != "RIGHT") {
    left.play();
    d = "LEFT";
  } else if (key == 38 && d != "DOWN") {
    d = "UP";
    up.play();
  } else if (key == 39 && d != "LEFT") {
    right.play();
    d = "RIGHT";
  } else if (key == 40 && d != "UP") {
    down.play();
    d = "DOWN";
  }
}
// Check Collision Function
function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}
// Draw Elements To Canvas
function draw() {
  ctx.drawImage(ground, 0, 0);
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "green" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
    ctx.strokeStyle = "red";
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }
  // Draw The Food
  ctx.drawImage(foodImg, food.x, food.y);
  // Old Snake Position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  // Check Direction
  if (d == "LEFT") snakeX -= box;
  if (d == "UP") snakeY -= box;
  if (d == "RIGHT") snakeX += box;
  if (d == "DOWN") snakeY += box;
  // If The Snake Eats The Food
  if (snakeX == food.x && snakeY == food.y) {
    score++;
    eat.play();
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box
    };
  } else {
    // Remove The Tail
    snake.pop();
  }
  // Add New Head
  let newHead = {
    x: snakeX,
    y: snakeY
  };
  // Game Over
  if (
    snakeX < box ||
    snakeX > 17 * box ||
    snakeY < 3 * box ||
    snakeY > 17 * box ||
    collision(newHead, snake)
  ) {
    clearInterval(game);
    dead.play();
  }
  snake.unshift(newHead);
  ctx.fillStyle = "white";
  ctx.font = "45px sans-serif";
  ctx.fillText(score, 2 * box, 1.6 * box);
}
// Calling The Function Draw Every 75ms
let game = setInterval(draw, 75);
