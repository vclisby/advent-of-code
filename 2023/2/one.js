const { convertInputToStringArray } = require('../utilities');

const input = convertInputToStringArray(__dirname);

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

const RED = 'red';
const BLUE = 'blue';
const GREEN = 'green';

const COLOUR_MAX_MAP = {
    red: 12,
    green: 13,
    blue: 14,
};

const value = input.reduce((acc, curr, i) => {
    const [gameNumber, rounds] = curr.split(':');
    const gameId = gameNumber.substring('Game '.length);

    const roundArray = rounds.split(';');

    const isEachRoundWithinMax = roundArray.every((round) => {
        const cubes = round.split(',');

        return cubes.every((cube) => {
            const [cubeCount, cubeColour] = cube.trim().split(' ');
            return cubeCount <= COLOUR_MAX_MAP[cubeColour];
        });
    });

    if (isEachRoundWithinMax) {
        return acc + Number(gameId);
    }

    return acc;
}, 0);

console.log(value);
