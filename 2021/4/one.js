const { convertInputToBingo } = require('./input');

function hasGridWon(rows) {
    const hasCompleteRow = rows.some((row) => row.every((gridNumber) => gridNumber.marked === true));
    const hasCompleteColumn = rows
        .map((_row, i) => rows.map((r) => r[i]))
        .some((col) => col.every((gridNumber) => gridNumber.marked === true));

    return hasCompleteRow || hasCompleteColumn;
}

const { drawNumbers, grids } = convertInputToBingo(__dirname);

let winningGrid;
let winningDrawNumber;

for (const drawNumber of drawNumbers) {
    for (const grid of grids) {
        for (const row of grid) {
            for (const gridNumber of row) {
                if (gridNumber.value === drawNumber) {
                    gridNumber.marked = true;
                }
            }
        }

        if (hasGridWon(grid)) {
            winningGrid = grid;
            winningDrawNumber = drawNumber;
            break;
        }
    }

    if (winningGrid != null && winningDrawNumber != null) {
        break;
    }
}

let score = 0;

for (const row of winningGrid) {
    for (const gridNumber of row) {
        if (gridNumber.marked === false) {
            score += parseInt(gridNumber.value, 10);
        }
    }
}

const finalScore = score * parseInt(winningDrawNumber, 10);

console.log(finalScore);
