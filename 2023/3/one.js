const { convertInputToStringArray } = require('../utilities');

const input = convertInputToStringArray(__dirname);

// A record where the key is the row index and the value is a set of the symbol indices on that row.
const SYMBOL_MAP = {};
// A record where the key is the row index and the value is an object { value: 487, startIndex: 6, rowIndex: 0 }.
const NUMBER_ARRAY = [];

function doesNumberHaveAdjacentSymbol(numberRowIndex, numberValue, numberYStartIndex) {
    const doesActualRowHaveAdjacentSymbol =
        SYMBOL_MAP[numberRowIndex]?.has(numberYStartIndex - 1) ||
        SYMBOL_MAP[numberRowIndex]?.has(numberYStartIndex + numberValue.toString().length);

    if (doesActualRowHaveAdjacentSymbol) {
        return true;
    }

    let doesUpperOrLowerRowHaveAdjacentSymbol = false;

    for (let i = numberYStartIndex - 1; i < numberYStartIndex + numberValue.toString().length + 1; i++) {
        const upper = SYMBOL_MAP[numberRowIndex - 1]?.has(i);
        const lower = SYMBOL_MAP[numberRowIndex + 1]?.has(i);

        if (upper || lower) {
            doesUpperOrLowerRowHaveAdjacentSymbol = true;
            break;
        }
    }

    return doesUpperOrLowerRowHaveAdjacentSymbol;
}

for (const [rowIndex, row] of input.entries()) {
    for (let i = 0; i < row.length; i++) {
        const currentChar = row[i];

        if (currentChar !== '.') {
            // If the character is not a dot and not a number it must be a symbol so add it to the symbol map.
            if (isNaN(currentChar)) {
                SYMBOL_MAP[rowIndex] =
                    SYMBOL_MAP[rowIndex] == null ? new Set([i]) : new Set([...Array.from(SYMBOL_MAP[rowIndex]), i]);
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

const value = NUMBER_ARRAY.reduce((acc, { value, startIndex, rowIndex }) => {
    if (doesNumberHaveAdjacentSymbol(rowIndex, value, startIndex)) {
        return acc + value;
    }

    return acc;
}, 0);

console.log(value);
