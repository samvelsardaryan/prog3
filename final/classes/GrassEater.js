let LivingCreature = require('./LivingCreature');

module.exports = class GrassEater extends LivingCreature {

    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 8;
    }

    multiplyFunction() {
        let targetCells = super.chooseCells(0);
        let newCell = targetCells[Math.floor(Math.random() * targetCells.length)];
        this.multiply++;
        if (this.multiply >= 6 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 2;
            grassEaterArr.push(new GrassEater(newX, newY, 2));
            this.multiply = 0;
        }
    }

    move() {
        let targetCells = super.chooseCells(0);
        let newCell = targetCells[Math.floor(Math.random() * targetCells.length)];
        if (this.energy > 0 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
            this.energy--;
        }
        this.die();
    }

    eat() {
        let targetCells = super.chooseCells(1);
        let newCell = targetCells[Math.floor(Math.random() * targetCells.length)];
        if (this.energy > 0 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            for (var i in grassArr) {
                if (grassArr[i].x == newX && grassArr[i].y == newY) {
                    grassArr.splice(i, 1);
                }
            }
            this.x = newX;
            this.y = newY;
            this.energy++;
            this.multiplyFunction();
        }
        else {
            this.move();
        }
    }

    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in grassEaterArr) {
                if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                    grassEaterArr.splice(i, 1);
                }
            }
        }
    }
}