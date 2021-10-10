let LivingCreature = require('./LivingCreature');
var random = require("./random");

module.exports = class Grass extends LivingCreature {

    mul() {
        this.multiply++;
        let targetCells = super.chooseCells(0);
        let newCell = random(targetCells);
        if (this.multiply >= 2 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            grassArr.push(new Grass(newX, newY));
            this.multiply = 0;
        }
        if (weath == "winter") {
            this.multiply--;
        }
        if (weath == "summer") {
            this.multiply++;
        }
    }
}
