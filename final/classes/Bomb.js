let LivingCreature = require('./LivingCreature');
var random = require("./random");

module.exports = class Bomb extends LivingCreature {

    explode() {
        let Cells = super.chooseCells(2);
		let Cells1 = super.chooseCells(3);
		let Cells2 = super.chooseCells(4);
		let targetCells = Cells.concat(Cells1.concat(Cells2));
        let newCell = random(targetCells);
		if(newCell){
			for (let i = 0; i < this.directions.length; i++) {
				let coordinates = this.directions[i];
				let x = coordinates[0];
				let y = coordinates[1];
				if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
					matrix[y][x] = 0;
				}
			}
            this.die();
		}
    }
    die() {     
        matrix[this.y][this.x] = 0;
        for (var i in bombArr) {
            if (bombArr[i].x == this.x && bombArr[i].y == this.y) {
                bombArr.splice(i, 1);
            }
        }
    }
}