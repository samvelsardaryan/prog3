var Grass = require("./classes/Grass.js");
var GrassEater = require("./classes/GrassEater.js");
var Predator = require("./classes/Predator.js");
var Human = require("./classes/Human.js");
var Bomb = require("./classes/Bomb.js");
var Alien = require("./classes/Alien.js");
let random = require('./classes/random');

weath = "summer";
grassArr = [];
grassEaterArr = [];
predatorArr = [];
humanArr = [];
bombArr = [];
alienArr = [];
matrix = [];
grassHashiv = 0;
grassEaterHashiv = 0;
predatorHashiv = 0;
humanHashiv = 0;
bombHashiv = 0;
alienHashiv = 0;
cellColors = {};
cellSettings = {};

function matrixGenerator(matrixSize, grass, grassEater, predator, human, bomb, alien) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize)); // 0-9
        let customY = Math.floor(random(matrixSize)); // 4
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < predator; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < human; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < bomb; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
    for (let i = 0; i < alien; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 6;
    }
}
matrixGenerator(20, 20, 15, 10, 8, 4, 6);

var express = require('express');
var fs = require("fs");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);




function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
                grassEaterHashiv++;
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++;
            } else if (matrix[y][x] == 3) {
                var predator = new Predator(x, y);
                predatorArr.push(predator);
                predatorHashiv++;
            }
            else if (matrix[y][x] == 4) {
                var human = new Human(x, y);
                humanArr.push(human);
                humanHashiv++;
            }
            else if (matrix[y][x] == 5) {
                var bomb = new Bomb(x, y);
                bombArr.push(bomb);
                bombHashiv++;
            }
            else if (matrix[y][x] == 6) {
                var alien = new Alien(x, y);
                alienArr.push(alien);
                alienHashiv++;
            }
        }
    }
}
creatingObjects();

cellColors = {
    white: [255, 255, 255],
    green: [0, 128, 0],
    gren: [0, 128, 0],
    yellow: [255, 255, 0],
    yellow1: [255, 255, 0],
    khaki: [240, 230, 140],
    red: [255, 0, 0],
    red1: [255, 0, 0],
    sakmon: [250, 128, 114],
    pink: [255, 192, 203],
    pink1: [255, 192, 203],
    palevioletred: [219, 112, 147],
    blue: [0, 0, 255],
    blue1: [0, 0, 255],
    lightblue: [135, 206, 235],
    purple: [128, 0, 128],
    purple1: [128, 0, 128],
    plum: [221, 160, 221],
    black: [0, 0, 0],
    black1: [0, 0, 0],
    darkgrey: [105, 105, 105],

}

function game() {
    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }
    if (predatorArr[0] !== undefined) {
        for (var i in predatorArr) {
            predatorArr[i].eat();
        }
    }
    if (humanArr[0] !== undefined) {
        for (var i in humanArr) {
            humanArr[i].eat();
        }
    }
    if (bombArr[0] !== undefined) {
        for (var i in bombArr) {
            bombArr[i].explode();
        }
    }
    if (alienArr[0] !== undefined) {
        for (var i in alienArr) {
            alienArr[i].eat();
        }
    }

    let sendData = {
        cellColors: cellColors,
        matrix: matrix,
        grassCounter: grassHashiv,
        grassEaterCounter: grassEaterHashiv,
        predatorCounter: predatorHashiv,
        humanCounter: humanHashiv,
        bombCounter: bombHashiv,
        alienCounter: alienHashiv
    }



    io.sockets.emit("data", sendData);
}



setInterval(game, 1000)

function kill() {
    grassArr = [];
    grassEaterArr = [];
    predatorArr = [];
    humanArr = [];
    alienArr = [];
    bombArr = [];
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
}

function winter() {
    weath == "winter";
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                cellColors.green = cellColors.white

            }
            else if (matrix[y][x] == 2) {
                cellColors.yellow = cellColors.khaki

            }
            else if (matrix[y][x] == 3) {
                cellColors.red = cellColors.sakmon
            }
            else if (matrix[y][x] == 4) {
                cellColors.pink = cellColors.palevioletred
            }
            else if (matrix[y][x] == 5) {
                cellColors.blue = cellColors.lightblue
            }
            else if (matrix[y][x] == 6) {
                cellColors.purple = cellColors.plum
            }
        }
    }
}
function summer() {
    weath == "summer"
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                cellColors.green = cellColors.gren
            }
            else if (matrix[y][x] == 2) {
                cellColors.yellow = cellColors.yellow1
            }
            else if (matrix[y][x] == 3) {
                cellColors.red = cellColors.red1
            }
            else if (matrix[y][x] == 4) {
                cellColors.pink = cellColors.pink1
            }
            else if (matrix[y][x] == 5) {
                cellColors.blue = cellColors.blue1
            }
            else if (matrix[y][x] == 6) {
                cellColors.purple = cellColors.purple1
            }
        }
    }
}
function addGrass() {
    for (var i = 0; i < 7; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            var gr = new Grass(x, y)
            grassArr.push(gr)
            grassHashiv++;
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addGrassEater() {
    for (var i = 0; i < 6; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            grassEaterArr.push(new GrassEater(x, y))
            grassEaterHashiv++;
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addPredator() {
    for (var i = 0; i < 5; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
            predatorArr.push(new Predator(x, y))
            predatorHashiv++;
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addHuman() {
    for (var i = 0; i < 4; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
            humanArr.push(new Human(x, y))
            humanHashiv++;
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addBomb() {
    for (var i = 0; i < 3; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
            bombArr.push(new Bomb(x, y))
            bombHashiv++;
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addAlien() {
    for (var i = 0; i < 3; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 6
            alienArr.push(new Alien(x, y))
            alienHashiv++;
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function lightning(){
    for (var i = 0; i < 3; i++) {
        var x = Math.floor(Math.random() * matrix[0].length)
        var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] != 0) {
            matrix[y][x] = 0
        }
    }
    io.sockets.emit("send matrix", matrix);
}

io.on('connection', function (socket) {
    socket.on("kill", kill);
    socket.on("winter", winter);
    socket.on("summer", summer);
    socket.on("add grass", addGrass);
    socket.on("add grassEater", addGrassEater);
    socket.on("add predator", addPredator);
    socket.on("add human", addHuman);
    socket.on("add bomb", addBomb);
    socket.on("add alien", addAlien);
    socket.on("lightning", lightning);
});
var statistics = {};
setInterval(function () {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.predator = predatorArr.length;
    statistics.human = humanArr.length;
    statistics.alien = alienArr.length;
    statistics.bomb = bombArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
        console.log("send")
    })
}, 1000)