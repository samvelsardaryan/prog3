module.exports = class LivingCreature {
    constructor(x, y, index, matrix, objectsMatrix) {
		this.x = x;
		this.y = y;
		this.index = index;
		this.matrix = matrix;
        this.objectsMatrix = objectsMatrix;
		this.multiply = 0;
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
		var found = [];
		for (var i in this.directions) {
			var x = this.directions[i][0];
			var y = this.directions[i][1];
			if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
				if (matrix[y][x] == characterId) {
					found.push(this.directions[i]);
				}
			}
		}
		return found;
	}
}