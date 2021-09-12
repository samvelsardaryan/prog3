class Bomb {

    constructor(x, y, id, matrix, objectsMatrix) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.matrix = matrix;
        this.objectsMatrix = objectsMatrix;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
			[this.x, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCells(characterId) {
        let found = [];
        for (let i = 0; i < this.directions.length; i++) {
            let coordinates = this.directions[i];
            let x = coordinates[0];
            let y = coordinates[1];
            if (x >= 0 && x < this.matrix[0].length && y >= 0 && y < this.matrix.length) {
                if (this.matrix[y][x] == characterId) {
                    found.push(coordinates);
                }
            }
        }
        return found;
    }

	explode(){
		let Cells = this.chooseCells(2);
		let Cells1 = this.chooseCells(3);
		let Cells2 = this.chooseCells(5);
		let targetCells = Cells.concat(Cells1.concat(Cells2));
        let newCell = random(targetCells);
		if(newCell){
			for (let i = 0; i < this.directions.length; i++) {
				let coordinates = this.directions[i];
				let x = coordinates[0];
				let y = coordinates[1];
				if (x >= 0 && x < this.matrix[0].length && y >= 0 && y < this.matrix.length) {
					this.matrix[y][x] = 0;
					this.objectsMatrix[y][x] = null;
				}
			}
		}
	}
    
    update() {
        this.explode();
    }

}