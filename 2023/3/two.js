const { convertInputToStringArray } = require('../utilities');

const input = convertInputToStringArray(__dirname);

// A record where the key is the row index and the value is a set of the symbol indices on that row.
const SYMBOL_MAP = {};
// A record where the key is the row index and the value is an object { value: 487, startIndex: 6, rowIndex: 0 }.
const NUMBER_ARRAY = [];

function getGearRatioForSymbol(numberRowIndex, symbolIndex) {
    const adjacentNumbersOnCurrentRow = NUMBER_ARRAY.filter((n) => n.rowIndex === numberRowIndex).filter(
        (n) => n.startIndex === symbolIndex + 1 || n.startIndex + n.value.toString().length - 1 === symbolIndex - 1
    );
    const adjacentNumbersonUpperRow = NUMBER_ARRAY.filter((n) => n.rowIndex === numberRowIndex - 1).filter(
        (n) => symbolIndex <= n.startIndex + n.value.toString().length && symbolIndex >= n.startIndex - 1
    );
    const adjacentNumbersonLowerRow = NUMBER_ARRAY.filter((n) => n.rowIndex === numberRowIndex + 1).filter(
        (n) => symbolIndex <= n.startIndex + n.value.toString().length && symbolIndex >= n.startIndex - 1
    );

    const adjacentNumbers = [
        ...adjacentNumbersOnCurrentRow,
        ...adjacentNumbersonUpperRow,
        ...adjacentNumbersonLowerRow,
    ];

    if (adjacentNumbers.length === 2) {
        return adjacentNumbers[0].value * adjacentNumbers[1].value;
    }

    return 0;
}

for (const [rowIndex, row] of input.entries()) {
    for (let i = 0; i < row.length; i++) {
        const currentChar = row[i];

        if (currentChar !== '.') {
            // If the character is not a dot and not a number it must be a symbol so add it to the symbol map.
            if (isNaN(currentChar)) {
                if (currentChar === '*') {
                    SYMBOL_MAP[rowIndex] =
                        SYMBOL_MAP[rowIndex] == null ? new Set([i]) : new Set([...Array.from(SYMBOL_MAP[rowIndex]), i]);
                }

                // Must be a number.
            } else {
                let numberString = currentChar;
                let numberFound = false;
                let nextNumberIndex = i + 1;

                while (!numberFound) {
                    const nextNumberString = row[nextNumberIndex];

                    if (nextNumberString === '.' || isNaN(nextNumberString)) {
                        numberFound = true;
                    } else {
                        numberString += nextNumberString;
                        nextNumberIndex++;
                    }
                }
                NUMBER_ARRAY.push({ value: Number(numberString), startIndex: i, rowIndex });
                i += numberString.length - 1;
            }
        }
    }
}

const value = Object.entries(SYMBOL_MAP).reduce((acc, [rowIndex, symbolIndiceSet]) => {
    return (
        acc +
        Array.from(symbolIndiceSet).reduce((acc2, symbolIndex) => {
            return acc2 + getGearRatioForSymbol(Number(rowIndex), symbolIndex);
        }, 0)
    );
}, 0);

console.log(value);
