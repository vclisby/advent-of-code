const { convertInputToStringArray } = require('../utilities');

const input = convertInputToStringArray(__dirname);

const forwardCommand = 'forward';
const forwardCommandLength = forwardCommand.length;
const downCommand = 'down';
const downCommandLength = downCommand.length;
const upCommand = 'up';
const upCommandLength = upCommand.length;

let depth = 0;
let horizontal = 0;

for (let i = 0; i < input.length; i++) {
    if (input[i].includes(forwardCommand)) {
        horizontal += parseInt(input[i].substring(forwardCommandLength + 1));
    } else if (input[i].includes(downCommand)) {
        depth += parseInt(input[i].substring(downCommandLength + 1));
    } else if (input[i].includes(upCommand)) {
        depth -= parseInt(input[i].substring(upCommandLength + 1));
    }
}

console.log(depth * horizontal);
