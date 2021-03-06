let LivingCreature = require('./LivingCreature');
var random = require("./random");

module.exports = class Predator extends LivingCreature {

    constructor(x, y) {
        super(x, y);
        this.energy = 6;
    }

    mul() {
        let targetCells = super.chooseCells(0);
        let newCell = random(targetCells);
        this.multiply++;
        if (this.multiply >= 8 && newCell) {
            predatorHashiv++;
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            predatorArr.push(new Predator(newX, newY));
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
        let targetCells = super.chooseCells(2);
        let newCell = random(targetCells);
        if (this.energy > 0 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            for (var i in grassEaterArr) {
                if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY) {
                    grassEaterArr.splice(i, 1);
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
            for (var i in predatorArr) {
                if (predatorArr[i].x == this.x && predatorArr[i].y == this.y) {
                    predatorArr.splice(i, 1);
                }
            }
        }
    }
}