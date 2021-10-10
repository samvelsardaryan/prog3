let LivingCreature = require('./LivingCreature');
var random = require("./random");

module.exports = class Alien extends LivingCreature {

    constructor(x, y) {
        super(x, y);
        this.energy = 10;
    }

    mul() {
        let targetCells = super.chooseCells(0);
        let newCell = random(targetCells);
        this.multiply++;
        if (this.multiply >= 12 && newCell) {
            alienHashiv++;
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            alienArr.push(new Alien(newX, newY));
            this.multiply = 0;
        }
        if (weath == "winter") {
            this.multiply--;
        }
        if (weath == "summer") {
            this.multiply++;
        }
    }

    move() {
        let targetCells = super.chooseCells(0);
        let newCell = random(targetCells);
        if (this.energy > 0 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        }
        this.energy--; 
        this.die();
    }

    eat() {
        let Cells = super.chooseCells(2);
        let Cells1 = super.chooseCells(3);
        let Cells2 = super.chooseCells(4);
        let targetCells = Cells.concat(Cells1.concat(Cells2));
        let newCell = random(targetCells);
        if (this.energy > 0 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            let targetId = matrix[newY][newX];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            if(targetId == 2){
                for (var i in grassEaterArr) {
                    if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY) {
                        grassEaterArr.splice(i, 1);
                    }
                }
            }
            else if(targetId == 3){
                for (var i in predatorArr) {
                    if (predatorArr[i].x == newX && predatorArr[i].y == newY) {
                        predatorArr.splice(i, 1);
                    }
                }
            }
            else if(targetId == 4){
                for (var i in humanArr) {
                    if (humanArr[i].x == newX && humanArr[i].y == newY) {
                        humanArr.splice(i, 1);
                    }
                }
            }           
            this.x = newX;
            this.y = newY;
            this.energy++;
            this.mul();
        }
        else {
            this.move();
        }
    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in alienArr) {
                if (alienArr[i].x == this.x && alienArr[i].y == this.y) {
                    alienArr.splice(i, 1);
                }
            }
        }
    }
}