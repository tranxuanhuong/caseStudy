
let canvas = document.getElementById('myCanvas');

// Vẽ bảng
function Board() {
    this.count = 0; // Điểm của người chơi
    this.ball = new Ball(this);
    this.bar = new Bar();
    this.renderBoard = function () {
        document.getElementById("showScore").innerHTML = "Your Score = " + this.count;
        let context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        this.bar.renderBar();
        this.ball.renderBall();

        // Ranh giới
        let isBouncingY = (this.ball.y == (this.bar.y - (this.ball.radius / 2)));
        let isBouncingX = ((this.ball.x > this.bar.x) && (this.ball.x < (this.bar.x + this.bar.width)));
        // Math.floor(Math.random()*(max-min+1)+min) thay đổi tọa độ bóng

        if (isBouncingX && isBouncingY) {
            this.ball.dx = -(Math.random() * 2 + 6);
            this.ball.dy = -(Math.random() * 2 + 6);
            console.log(this.ball.dx);
            console.log(this.ball.dy);
            this.count++;
            document.getElementById("showScore").innerHTML = "Your Score = " + this.count;
        }
    }
}

// Vẽ bóng
function Ball(board) {
    this.x = 50; // Tọa độ trái của bóng
    this.y = 50; // Tọa độ trên của bóng
    this.radius = 10;
    this.dx = 5; // Tăng tọa độ trái bóng sang trái
    this.dy = 5; // Tăng tọa độ trái bóng lên trên
    this.board = board;
    this.renderBall = function () {

        let context = canvas.getContext('2d');
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        context.fill();
    };
    this.moveBall = function () {
        // Boundary Logic
        if (this.x < 0 || this.x > canvas.width)
            this.dx = -(this.dx);
        if (this.y < 0 || this.y > canvas.height)
            this.dy = -(this.dy);
        // Thay đổi tọa độ
        this.x += this.dx;
        this.y += this.dy;
        this.board.renderBoard();
    }
}

// Vẽ gạch
function Bar(board) {
    this.x = 220;
    this.y = 360;
    this.width = 100;
    this.height = 15;
    this.speed = 20;
    this.renderBar = function () {
        let context = canvas.getContext('2d');
        context.clearRect(this.x - this.speed, this.y, this.width, this.height);
        context.clearRect(this.x + this.speed, this.y, this.width, this.height);
        context.fillRect(this.x, this.y, this.width, this.height);
    };
}

// Chức năng bàn phím
function leftArrowPressed() {
    if (board.bar.x > 0) {
        board.bar.x -= board.bar.speed;
        board.bar.renderBar();
        console.log('left ' + board.bar.x);
    }
}

function rightArrowPressed() {
    if (board.bar.x < canvas.width - board.bar.width) {
        board.bar.x += board.bar.speed;
        board.bar.renderBar();
        console.log('right ' + board.bar.x);
    }
}

function moveSelection(evt) {
    switch (evt.keyCode) {
        case 37:
            leftArrowPressed();
            break;
        case 39:
            rightArrowPressed();
            break;
    }
}

// Init Board
let board = new Board();
board.renderBoard();
let setIn;

function init() {
    setIn = setInterval(function () {
        if (board.ball.y < canvas.height - board.ball.radius) {
            board.ball.moveBall();
            console.log("Moving");
        } else {
            clearInterval(setIn);
            alert("You Lose! Your Score is: " + board.count);
            console.log("Stop Game");
        }
    }, 20);
    window.addEventListener('keydown', moveSelection);
}

function startGame() {
    if (board.ball.x == 50 && board.ball.y == 50) {
        init();
    }
}
    function resetGame() {
        document.location.reload();
    }
