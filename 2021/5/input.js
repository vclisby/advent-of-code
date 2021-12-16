const path = require('path');
const fs = require('fs');
const { INPUT_FILENAME } = require('../utilities');

function convertInputToLineCoords(dir) {
    const rawInputByLine = fs.readFileSync(path.join(dir, INPUT_FILENAME), 'utf8').toString().trim().split('\r\n');
    return rawInputByLine.map((line) => {
        const coordsAsString = line.split('->');
        const [xA, yA] = coordsAsString[0].split(',').map((c) => parseInt(c.trim(), 10));
        const [xB, yB] = coordsAsString[1].split(',').map((c) => parseInt(c.trim(), 10));
        return { pointA: { x: xA, y: yA }, pointB: { x: xB, y: yB } };
    });
}

module.exports = {
    convertInputToLineCoords,
};
