const { convertInputToNumberArray } = require('../utilities');

const input = convertInputToNumberArray(__dirname);

let increasedCount = 0;

for (let i = 1; i < input.length; i++) {
    if (input[i] > input[i - 1]) {
        increasedCount++;
    }
}

console.log(increasedCount);
