let LivingCreature = require('./LivingCreature');
module.exports = class Human extends LivingCreature{

    constructor(x, y, index) {
		super(x, y, index);
		this.energy = 12;
	}

	multiplyFunction() {
        let targetCells = super.chooseCells(0);
        let newCell = targetCells[Math.floor(Math.random() * targetCells.length)];
        if (this.multiply >= 14 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            this.matrix[newY][newX] = this.id;
            let newGrassEater = new Predator(newX, newY, this.id, this.matrix, this.objectsMatrix);
            this.objectsMatrix[newY][newX] = newGrassEater;
            this.multiply = 0;
        }
    }

    move() {
        let targetCells = super.chooseCells(0);
        let newCell = random(targetCells);
        if (this.energy > 0 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            this.matrix[newY][newX] = this.id;
            this.matrix[this.y][this.x] = 0;
            this.objectsMatrix[newY][newX] = this;
            this.objectsMatrix[this.y][this.x] = null;
            this.x = newX;
            this.y = newY;
            this.energy--;   
        }
		this.die();
    }

    eat() {
		let Cells = super.chooseCells(2);
		let Cells1 = super.chooseCells(3);
        let targetCells = Cells.concat(Cells1);
        let newCell = random(targetCells);
        if (this.energy > 0 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            this.matrix[newY][newX] = this.id;
            this.matrix[this.y][this.x] = 0;
            this.objectsMatrix[newY][newX] = this;
            this.objectsMatrix[this.y][this.x] = null;
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
            this.matrix[this.y][this.x] = 0;
            this.objectsMatrix[this.y][this.x] = null;
        }
    }

    update() {
        this.eat();
    }

}
