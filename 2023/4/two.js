const { convertInputToStringArray } = require('../utilities');

const input = convertInputToStringArray(__dirname);

function getNumberArray(numberString) {
    return numberString
        .trim()
        .split(' ')
        .filter((n) => n.length > 0);
}

const value = input.reduce((acc, curr) => {
    const [cardNumber, allNumbers] = curr.split(':');
    const currentCardNumber = Number(cardNumber.split('Card')[1].trim());

    // Add the original card.
    acc[currentCardNumber] = (acc[currentCardNumber] ?? 0) + 1;

    const currentCardNumberCount = acc[currentCardNumber];

    const [winningNumbers, drawnNumbers] = allNumbers.split('|');

    const drawnNumberSet = new Set(getNumberArray(drawnNumbers));

    const winningNumberCount = getNumberArray(winningNumbers).reduce((acc2, curr2) => {
        const isDrawnNumberAWinner = drawnNumberSet.has(curr2);

        if (isDrawnNumberAWinner) {
            return acc2 + 1;
        }

        return acc2;
    }, 0);

    // Add the copy cards.
    for (let i = currentCardNumber + 1; i < currentCardNumber + winningNumberCount + 1; i++) {
        acc[i] = (acc[i] ?? 0) + currentCardNumberCount;
    }

    return acc;
}, {});

console.log(Object.values(value).reduce((acc, curr) => acc + curr, 0));
