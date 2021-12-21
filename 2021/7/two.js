const { convertCSVInputToNumberArray } = require('../utilities');

function calculateFuel(distance) {
    return (distance * (distance + 1)) / 2;
}

const input = convertCSVInputToNumberArray(__dirname);

const min = Math.min(...input);
const max = Math.max(...input);

let minimumFuelCount = Number.MAX_VALUE;

for (let i = min; i <= max; i++) {
    let totalFuel = 0;

    for (const j of input) {
        totalFuel += calculateFuel(Math.abs(i - j));
    }

    if (totalFuel < minimumFuelCount) {
        minimumFuelCount = totalFuel;
    }
}

console.log(minimumFuelCount);
