let parent = require('./LivingCreature');

module.exports = class Grass extends parent{

    multiplyFunction() {
        this.multiply++;
        let targetCells = this.chooseCells(0);
        let newCell = targetCells[Math.floor(Math.random() * targetCells.length)];
        if (this.multiply >= 2 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            this.matrix[newY][newX] = this.id;
            let newGrass = new Grass(newX, newY, this.index, this.matrix, this.objectsMatrix);
            this.objectsMatrix[newY][newX] = newGrass;
            this.multiply = 0;
        }
    }

    update() {
        this.multiply();
    }

}
