const { convertCSVInputToNumberArray } = require('../utilities');

const NUMBER_OF_DAYS = 80;

const input = convertCSVInputToNumberArray(__dirname);

const breedState = [...input];

for (let i = 0; i < NUMBER_OF_DAYS; i++) {
    let newFishCount = 0;

    for (let j = 0; j < breedState.length; j++) {
        if (breedState[j] === 0) {
            newFishCount++;
            breedState[j] = 6;
        } else {
            breedState[j] = breedState[j] - 1;
        }
    }

    breedState.push(...Array(newFishCount).fill(8));
}

console.log(breedState.length);
