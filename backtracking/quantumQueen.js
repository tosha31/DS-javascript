var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var QuantumQueen = /** @class */ (function () {
    function QuantumQueen(boardSize) {
        this.probabilities = new Array(boardSize).fill(1 / boardSize);
    }
    QuantumQueen.prototype.collapse = function (position) {
        this.probabilities = new Array(this.probabilities.length).fill(0);
        this.probabilities[position] = 1;
    };
    QuantumQueen.prototype.getMostLikelyPosition = function () {
        return this.probabilities.indexOf(Math.max.apply(Math, this.probabilities));
    };
    QuantumQueen.prototype.updateProbabilities = function (invalidPositions) {
        var totalProb = 0;
        for (var i = 0; i < this.probabilities.length; i++) {
            if (invalidPositions.includes(i)) {
                this.probabilities[i] = 0;
            }
            else {
                totalProb += this.probabilities[i];
            }
        }
        // Normalize remaining probabilities
        for (var i = 0; i < this.probabilities.length; i++) {
            if (this.probabilities[i] > 0) {
                this.probabilities[i] /= totalProb;
            }
        }
    };
    return QuantumQueen;
}());
function solveQuantumQueens(n) {
    var solutions = [];
    var queens = new Array(n).fill(null).map(function () { return new QuantumQueen(n); });
    function isValid(row, col, placement) {
        for (var i = 0; i < row; i++) {
            if (placement[i] === col ||
                Math.abs(placement[i] - col) === Math.abs(i - row)) {
                return false;
            }
        }
        return true;
    }
    function backtrack(row, placement) {
        if (row === n) {
            solutions.push(__spreadArray([], placement, true));
            return;
        }
        var invalidPositions = [];
        for (var col = 0; col < n; col++) {
            if (isValid(row, col, placement)) {
                queens[row].collapse(col);
                placement[row] = col;
                backtrack(row + 1, placement);
                placement[row] = -1;
            }
            else {
                invalidPositions.push(col);
            }
        }
        queens[row].updateProbabilities(invalidPositions);
    }
    backtrack(0, new Array(n).fill(-1));
    return solutions;
}
// Solve the 4 Queens problem
var solutions = solveQuantumQueens(4);
console.log("Found ".concat(solutions.length, " solutions:"));
solutions.forEach(function (solution, index) {
    console.log("Solution ".concat(index + 1, ":"), solution);
});
// Visualize the first solution
if (solutions.length > 0) {
    console.log("\nVisualization of the first solution:");
    var board = solutions[0].map(function (col) {
        return '.'.repeat(col) + 'Q' + '.'.repeat(3 - col);
    });
    console.log(board.join('\n'));
}
