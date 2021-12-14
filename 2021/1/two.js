const { convertInputToNumberArray } = require('../utilities');

const input = convertInputToNumberArray(__dirname);

let increasedCount = 0;

for (let i = 0; i < input.length; i++) {
    const firstWindow = input[i] + input[i + 1] + input[i + 2];
    const secondWindow = input[i + 1] + input[i + 2] + input[i + 3];

    if (secondWindow > firstWindow) {
        increasedCount++;
    }
}

console.log(increasedCount);
