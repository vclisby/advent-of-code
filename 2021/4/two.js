const { convertInputToBingo } = require('./input');

function hasGridWon(rows) {
    const hasCompleteRow = rows.some((row) => row.every((gridNumber) => gridNumber.marked === true));
    const hasCompleteColumn = rows
        .map((_row, i) => rows.map((r) => r[i]))
        .some((col) => col.every((gridNumber) => gridNumber.marked === true));

    return hasCompleteRow || hasCompleteColumn;
}

const { drawNumbers, grids } = convertInputToBingo(__dirname);

const wonGridData = [];

for (const drawNumber of drawNumbers) {
    for (let i = 0; i < grids.length; i++) {
        const grid = grids[i];

        // Grid has already won so no need to continue marking numbers on it.
        if (wonGridData.some((g) => g.index === i)) {
            continue;
        }

        for (const row of grid) {
            for (const gridNumber of row) {
                if (gridNumber.value === drawNumber) {
                    gridNumber.marked = true;
                }
            }
        }

        if (hasGridWon(grid)) {
            wonGridData.push({ index: i, grid, winningDrawNumber: drawNumber });
        }
    }
}

let score = 0;

const lastGridToWin = wonGridData[wonGridData.length - 1];

for (const row of lastGridToWin.grid) {
    for (const gridNumber of row) {
        if (gridNumber.marked === false) {
            score += parseInt(gridNumber.value, 10);
        }
    }
}

const finalScore = score * parseInt(lastGridToWin.winningDrawNumber, 10);

console.log(finalScore);
