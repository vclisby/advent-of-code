const path = require('path');
const fs = require('fs');

const INPUT_FILENAME = 'input.txt';

function convertInputToStringArray(dir) {
    return fs
        .readFileSync(path.join(dir, INPUT_FILENAME), 'utf8')
        .toString()
        .trim()
        .split('\n')
        .map((value) => value.trimEnd());
}

function convertInputToNumberArray(dir) {
    return convertInputToStringArray(dir).map((num) => parseInt(num, 10));
}

module.exports = {
    convertInputToStringArray,
    convertInputToNumberArray,
    INPUT_FILENAME,
};
