const { convertCSVInputToNumberArray } = require('../utilities');

const NUMBER_OF_DAYS = 256;

const input = convertCSVInputToNumberArray(__dirname);

// When a fishs timer hits 0 (currentIndex), it will spawn a new fish at that index.
function addChildFish(currentIndex, arr) {
    const newIndex = currentIndex + 8;
    let firstBorn = true;

    for (let i = newIndex; i < NUMBER_OF_DAYS; i += 6) {
        if (firstBorn) {
            arr[i] = arr[i] != null ? arr[i] + 1 : 1;
            addChildFish(i, arr);
            firstBorn = false;
        } else {
            arr[i] = arr[i] != null ? arr[i] + 1 : 1;
            addChildFish(i, arr);
        }
    }
}

let totalFishCount = 0;

for (let j = 0; j < input.length; j++) {
    let currentFishBreedState = [];
    let currentFishAge = input[j];
    console.log(j);

    // Determine at what index this fish (and it's future fish) will reproduce and append a count at those indexes in the test array.
    for (let x = 0; x < NUMBER_OF_DAYS; x++) {
        if (currentFishAge === 0) {
            currentFishAge = 6;
            // When a fishs timer hits 0 (x), it will spawn a new fish on that day (increments count at current index).
            currentFishBreedState[x] = currentFishBreedState[x] != null ? currentFishBreedState[x] + 1 : 1;
            // That particular fish will then go on to spawn it's own children. It will spawn 1 fish in 8 days time and 1 fish every 6 days thereafter.
            addChildFish(x, currentFishBreedState);
        } else {
            currentFishAge--;
        }
    }

    totalFishCount += currentFishBreedState.reduce((acc, curr) => curr + acc, 0);
}

console.log(totalFishCount * 2);
