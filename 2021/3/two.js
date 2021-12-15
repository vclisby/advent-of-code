const { convertInputToStringArray } = require('../utilities');

function findBinaryDigitOccurrenceCountsAtIndex(index, binaryValues) {
    let zero = 0;
    let one = 0;

    for (let i = 0; i < binaryValues.length; i++) {
        const binaryValue = binaryValues[i];

        if (binaryValue[index] === '0') {
            zero += 1;
        } else {
            one += 1;
        }
    }

    return { zero, one };
}

const input = convertInputToStringArray(__dirname);

let oxygenValues = [...input];
let scrubberValues = [...input];

for (let i = 0; i < input[0].length; i++) {
    if (oxygenValues.length === 1 && scrubberValues.length === 1) {
        break;
    }

    const oxygenBinaryDigitOccurrenceCountsAtIndex = findBinaryDigitOccurrenceCountsAtIndex(i, oxygenValues);
    const scrubberBinaryDigitOccurrenceCountsAtIndex = findBinaryDigitOccurrenceCountsAtIndex(i, scrubberValues);

    if (oxygenValues.length > 1) {
        if (oxygenBinaryDigitOccurrenceCountsAtIndex.zero < oxygenBinaryDigitOccurrenceCountsAtIndex.one) {
            oxygenValues = oxygenValues.filter((v) => v[i] === '1');
        } else if (oxygenBinaryDigitOccurrenceCountsAtIndex.zero > oxygenBinaryDigitOccurrenceCountsAtIndex.one) {
            oxygenValues = oxygenValues.filter((v) => v[i] === '0');
        } else {
            oxygenValues = oxygenValues.filter((v) => v[i] === '1');
        }
    }

    if (scrubberValues.length > 1) {
        if (scrubberBinaryDigitOccurrenceCountsAtIndex.zero < scrubberBinaryDigitOccurrenceCountsAtIndex.one) {
            scrubberValues = scrubberValues.filter((v) => v[i] === '0');
        } else if (scrubberBinaryDigitOccurrenceCountsAtIndex.zero > scrubberBinaryDigitOccurrenceCountsAtIndex.one) {
            scrubberValues = scrubberValues.filter((v) => v[i] === '1');
        } else {
            scrubberValues = scrubberValues.filter((v) => v[i] === '0');
        }
    }
}

const oxygenRating = parseInt(oxygenValues[0], 2);
const scrubberRating = parseInt(scrubberValues[0], 2);
const lifeSupportRating = oxygenRating * scrubberRating;

console.log(lifeSupportRating);
