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

function addDiagonalLineCoordsToMap(pointA, pointB, map) {
    const steps = Math.abs(pointA.x - pointB.x);
    const stepUpY = pointA.y > pointB.y ? false : true;
    const stepUpX = pointA.x > pointB.x ? false : true;
    const startX = pointA.x;
    const startY = pointA.y;

    for (let i = 0; i < steps + 1; i++) {
        const coordAtPoint = `${startX + (stepUpX ? i : -i)}:${startY + (stepUpY ? i : -i)}`;
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
    const isDiagonal = Math.abs(line.pointA.x - line.pointB.x) === Math.abs(line.pointA.y - line.pointB.y);

    if (!isHorizontalLine && !isVerticalLine && !isDiagonal) {
        continue;
    }

    const { pointA, pointB } = line;

    if (isHorizontalLine) {
        let minX = 0;
        let maxX = 0;
        let y = pointA.y;

        if (pointA.x > pointB.x) {
            maxX = pointA.x;
            minX = pointB.x;
        } else {
            maxX = pointB.x;
            minX = pointA.x;
        }

        addLineCoordsToMap(minX, maxX, true, y, lineCoordMap);
    } else if (isVerticalLine) {
        let minY = 0;
        let maxY = 0;
        let x = pointA.x;

        if (pointA.y > pointB.y) {
            maxY = pointA.y;
            minY = pointB.y;
        } else {
            maxY = pointB.y;
            minY = pointA.y;
        }

        addLineCoordsToMap(minY, maxY, false, x, lineCoordMap);
    } else if (isDiagonal) {
        addDiagonalLineCoordsToMap(pointA, pointB, lineCoordMap);
    }
}

const overlappingCoordsCount = [...lineCoordMap.values()].filter((count) => count > 1).length;

console.log(overlappingCoordsCount);
