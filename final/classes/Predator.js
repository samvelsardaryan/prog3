let parent2 = require('./LivingCreature');

module.exports = class Predator extends parent2{

    constructor(x, y, index) {
		super(x, y, index);
		this.energy = 10;
	}

    multiplyFunction() {
        let targetCells = super.chooseCells(0);
        let newCell = targetCells[Math.floor(Math.random() * targetCells.length)];
        this.multiply++;
        if (this.multiply >= 10 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 3;
            grassEaterArr.push(new Predator(newX, newY, 3));
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
        let targetCells = super.chooseCells(2);
        let newCell = targetCells[Math.floor(Math.random() * targetCells.length)];
        if (this.energy > 0 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            for (var i in grassArr) {
                if (grassEaterArr[i].x == newX && grassEaterArr[i].y == newY) {
                    grassEaterArr.splice(i, 1);
                }
            }
            this.x = newX;
            this.y = newY;
            this.energy++;
            this.multiplyFunction();
        }
        else{
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

    update() {
        this.eat();
    }

}