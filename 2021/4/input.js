const path = require('path');
const fs = require('fs');
const { INPUT_FILENAME } = require('../utilities');

const BINGO_GRID_SIZE = 5;

function convertInputToBingo(dir) {
    const rawInputByLine = fs.readFileSync(path.join(dir, INPUT_FILENAME), 'utf8').toString().trim().split('\r\n');
    const drawNumbers = rawInputByLine[0].split(',');
    let gameIndex = 0; // A "game" consists of 5 rows, so this is incremented after every 5 lines of input data is parsed.
    const grids = rawInputByLine
        .slice(1, rawInputByLine.length)
        .filter((line) => line !== '')
        .reduce((acc, curr, index) => {
            const gridNumbers = curr
                .split(' ')
                .map((v) => v.trim())
                .filter((v) => v !== '')
                .map((v) => ({ value: v, marked: false }));

            if (index % BINGO_GRID_SIZE === 0) {
                if (index > 0) {
                    gameIndex++;
                }

                return [...acc, [gridNumbers]];
            }

            const result = [...acc];
            result[gameIndex] = [...result[gameIndex], gridNumbers];
            return result;
        }, []);

    return { drawNumbers, grids };
}

module.exports = {
    convertInputToBingo,
};
