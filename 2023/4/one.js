const { convertInputToStringArray } = require('../utilities');

const input = convertInputToStringArray(__dirname);

function getNumberArray(numberString) {
    return numberString
        .trim()
        .split(' ')
        .filter((n) => n.length > 0);
}

const value = input.reduce((acc, curr) => {
    const [_, allNumbers] = curr.split(':');

    const [winningNumbers, drawnNumbers] = allNumbers.split('|');

    const drawnNumberSet = new Set(getNumberArray(drawnNumbers));

    const winningNumberCount = getNumberArray(winningNumbers).reduce((acc2, curr2) => {
        const foo = drawnNumberSet.has(curr2);

        if (foo) {
            return acc2 + 1;
        }

        return acc2;
    }, 0);

    if (winningNumberCount === 1) {
        return acc + 1;
    } else if (winningNumberCount > 1) {
        return acc + 2 ** (winningNumberCount - 1);
    }

    return acc;
}, 0);

console.log(value);
