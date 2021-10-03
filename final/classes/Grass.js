let LivingCreature = require('./LivingCreature');

module.exports = class Grass extends LivingCreature {

    multiplyFunction() {
        this.multiply++;
        let targetCells = super.chooseCells(0);
        let newCell = targetCells[Math.floor(Math.random() * targetCells.length)];
        if (this.multiply >= 2 && newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 1;
            grassArr.push(new Grass(x, y, 1));
            this.multiply = 0;
        }
    }
}
