const { convertInputToStringArray } = require('../utilities');

const input = convertInputToStringArray(__dirname);

const binaryDigitOccurrenceCounts = input[0].split('').map((c) => ({
    zero: 0,
    one: 0,
}));

for (let i = 0; i < input.length; i++) {
    const binaryValue = input[i];

    for (let j = 0; j < binaryValue.length; j++) {
        if (binaryValue[j] === '0') {
            binaryDigitOccurrenceCounts[j].zero = binaryDigitOccurrenceCounts[j].zero + 1;
        } else {
            binaryDigitOccurrenceCounts[j].one = binaryDigitOccurrenceCounts[j].one + 1;
        }
    }
}

const gamma = parseInt(binaryDigitOccurrenceCounts.map((c) => (c.one > c.zero ? 1 : 0)).join(''), 2);
const epsilon = parseInt(binaryDigitOccurrenceCounts.map((c) => (c.one > c.zero ? 0 : 1)).join(''), 2);
const power = gamma * epsilon;

console.log(power);
