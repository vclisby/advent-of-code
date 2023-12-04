const { convertInputToStringArray } = require('../utilities');

const input = convertInputToStringArray(__dirname);

const pattern = new RegExp('[0-9]');
const NUMBER_MAP = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
};

const value = input.reduce((acc, curr, i) => {
    const textDigitIndexAndValue = Object.entries(NUMBER_MAP).reduce((acc2, [key, val]) => {
        const firstIndex = curr.indexOf(key);
        const lastIndex = curr.lastIndexOf(key);

        let newAcc = { ...acc2 };

        if (firstIndex >= 0 && (newAcc?.firstIndex == null || firstIndex < newAcc.firstIndex)) {
            newAcc = { ...newAcc, firstIndex, firstValue: val };
        }

        if (lastIndex >= 0 && (newAcc?.lastIndex == null || lastIndex > newAcc.lastIndex)) {
            newAcc = { ...newAcc, lastIndex, lastValue: val };
        }

        return newAcc;
    }, null);

    const firstIndexDigit = curr.search(pattern);
    const firstValue =
        textDigitIndexAndValue?.firstIndex == null || firstIndexDigit <= textDigitIndexAndValue.firstIndex
            ? curr[firstIndexDigit]
            : textDigitIndexAndValue.firstValue;

    // Could do this all in the above loop...
    const lastIndexDigitReversed = curr.split('').reverse().join('').search(pattern);
    const lastIndexDigit = curr.length - lastIndexDigitReversed - 1;

    const lastValue =
        textDigitIndexAndValue?.lastIndex == null || lastIndexDigit >= textDigitIndexAndValue.lastIndex
            ? curr[lastIndexDigit]
            : textDigitIndexAndValue.lastValue;

    const total = Number(`${firstValue}${lastValue}`);

    return acc + total;
}, 0);

console.log(value);
