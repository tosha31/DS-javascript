class QuantumQueen {
    private probabilities: number[];

    constructor(boardSize: number) {
        this.probabilities = new Array(boardSize).fill(1 / boardSize);
    }

    collapse(position: number): void {
        this.probabilities = new Array(this.probabilities.length).fill(0);
        this.probabilities[position] = 1;
    }

    getMostLikelyPosition(): number {
        return this.probabilities.indexOf(Math.max(...this.probabilities));
    }

    updateProbabilities(invalidPositions: number[]): void {
        let totalProb = 0;
        for (let i = 0; i < this.probabilities.length; i++) {
            if (invalidPositions.includes(i)) {
                this.probabilities[i] = 0;
            } else {
                totalProb += this.probabilities[i];
            }
        }

        // Normalize remaining probabilities
        for (let i = 0; i < this.probabilities.length; i++) {
            if (this.probabilities[i] > 0) {
                this.probabilities[i] /= totalProb;
            }
        }
    }
}

function solveQuantumQueens(n: number): number[][] {
    const solutions: number[][] = [];
    const queens: QuantumQueen[] = new Array(n).fill(null).map(() => new QuantumQueen(n));

    function isValid(row: number, col: number, placement: number[]): boolean {
        for (let i = 0; i < row; i++) {
            if (
                placement[i] === col ||
                Math.abs(placement[i] - col) === Math.abs(i - row)
            ) {
                return false;
            }
        }
        return true;
    }

    function backtrack(row: number, placement: number[]): void {
        if (row === n) {
            solutions.push([...placement]);
            return;
        }

        const invalidPositions: number[] = [];
        for (let col = 0; col < n; col++) {
            if (isValid(row, col, placement)) {
                queens[row].collapse(col);
                placement[row] = col;
                backtrack(row + 1, placement);
                placement[row] = -1;
            } else {
                invalidPositions.push(col);
            }
        }

        queens[row].updateProbabilities(invalidPositions);
    }

    backtrack(0, new Array(n).fill(-1));
    return solutions;
}

// Solve the 4 Queens problem
const solutions = solveQuantumQueens(4);
console.log(`Found ${solutions.length} solutions:`);
solutions.forEach((solution, index) => {
    console.log(`Solution ${index + 1}:`, solution);
});

// Visualize the first solution
if (solutions.length > 0) {
    console.log("\nVisualization of the first solution:");
    const board = solutions[0].map(col =>
        '.'.repeat(col) + 'Q' + '.'.repeat(3 - col)
    );
    console.log(board.join('\n'));
}