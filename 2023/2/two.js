const { convertInputToStringArray } = require('../utilities');

const input = convertInputToStringArray(__dirname);

const COLOUR_MULTIPLIER_INITIAL_MAP = {
    red: 0,
    green: 0,
    blue: 0,
};

const value = input.reduce((acc, curr) => {
    const [_, rounds] = curr.split(':');

    const roundArray = rounds.split(';');

    const { red, green, blue } = roundArray.reduce((acc2, curr2) => {
        const cubes = curr2.split(',');

        let newAcc2 = { ...acc2 };

        for (let i = 0; i < cubes.length; i++) {
            const [cubeCount, cubeColour] = cubes[i].trim().split(' ');

            if (newAcc2[cubeColour] < Number(cubeCount)) {
                newAcc2 = { ...newAcc2, [cubeColour]: cubeCount };
            }
        }

        return newAcc2;
    }, COLOUR_MULTIPLIER_INITIAL_MAP);

    return acc + red * green * blue;
}, 0);

console.log(value);
