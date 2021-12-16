const { convertInputToLineCoords } = require('./input');

const lines = convertInputToLineCoords(__dirname);

function addLineCoordsToMap(min, max, isHorizontalLine, staticCoord, map) {
    for (let i = min; i < max + 1; i++) {
        const coordAtPoint = isHorizontalLine ? `${i}:${staticCoord}` : `${staticCoord}:${i}`;
        const coordAtPointCount = map.get(coordAtPoint);

        if (coordAtPointCount == null) {
            map.set(coordAtPoint, 1);
        } else {
            map.set(coordAtPoint, coordAtPointCount + 1);
        }
    }
}

const lineCoordMap = new Map();

for (const line of lines) {
    const isHorizontalLine = line.pointA.y === line.pointB.y;
    const isVerticalLine = line.pointA.x === line.pointB.x;

    if (!isHorizontalLine && !isVerticalLine) {
        continue;
    }

    if (isHorizontalLine) {
        let minX = 0;
        let maxX = 0;
        let y = line.pointA.y;

        if (line.pointA.x > line.pointB.x) {
            maxX = line.pointA.x;
            minX = line.pointB.x;
        } else {
            maxX = line.pointB.x;
            minX = line.pointA.x;
        }

        addLineCoordsToMap(minX, maxX, true, y, lineCoordMap);
    } else if (isVerticalLine) {
        let minY = 0;
        let maxY = 0;
        let x = line.pointA.x;

        if (line.pointA.y > line.pointB.y) {
            maxY = line.pointA.y;
            minY = line.pointB.y;
        } else {
            maxY = line.pointB.y;
            minY = line.pointA.y;
        }

        addLineCoordsToMap(minY, maxY, false, x, lineCoordMap);
    }
}

const overlappingCoordsCount = [...lineCoordMap.values()].filter((count) => count > 1).length;

console.log(overlappingCoordsCount);
