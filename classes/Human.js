class Human {

    constructor(x, y, id, matrix, objectsMatrix) {
        this.x = x;
        this.y = y;
        this.id = id;
        this.matrix = matrix;
        this.objectsMatrix = objectsMatrix;
        this.energy = 15;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
        this.updateCoordinates;
    }

    updateCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCells(characterId) {
        this.updateCoordinates();
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

	multiply() {
        let targetCells = this.chooseCells(0);
        let newCell = random(targetCells);
        if (this.energy >= 24 && newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            this.matrix[newY][newX] = this.id;
            let newGrassEater = new Predator(newX, newY, this.id, this.matrix, this.objectsMatrix);
            this.objectsMatrix[newY][newX] = newGrassEater;
            this.energy = 8;
        }
    }

    move() {
        let targetCells = this.chooseCells(0);
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
		let Cells = this.chooseCells(2);
		let Cells1 = this.chooseCells(3);
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
