const { convertInputToStringArray } = require('../utilities');

const input = convertInputToStringArray(__dirname);

const pattern = new RegExp('[0-9]');

const value = input.reduce((acc, curr) => {
    const firstIndex = curr.search(pattern);
    const currReversed = curr.split('').reverse().join('');
    const lastIndex = currReversed.search(pattern);
    const total = Number(`${curr[firstIndex]}${currReversed[lastIndex]}`);

    return acc + total;
}, 0);

console.log(value);
