const { convertCSVInputToNumberArray } = require('../utilities');

const NUMBER_OF_DAYS = 256;

const input = convertCSVInputToNumberArray(__dirname);

let fishByAge = Array(9).fill(0);

for (const fishAge of input) {
    fishByAge[fishAge]++;
}

for (let i = 0; i < NUMBER_OF_DAYS; i++) {
    const newFish = fishByAge.shift();
    fishByAge[6] += newFish;
    fishByAge[8] = newFish;
}

const totalFishCount = fishByAge.reduce((acc, curr) => curr + acc, 0);

console.log(totalFishCount);
