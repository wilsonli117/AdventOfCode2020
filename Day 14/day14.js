const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
let program = input.split("\n")

function executeProgram(program) {
    let mask;
    let memory = {};

    for(let i = 0; i < program.length; i++) {
        if (program[i][1] === 'a') {
            mask = program[i].slice(7);
        } else {
            let regexResult = program[i].match(/[0-9]+/g)
            let memLocation = regexResult[0];
            let valueBit = numToBitConvert(parseInt(regexResult[1])).split('');

            for(let i = 0; i < mask.length; i++) {
                if (!(mask[i] === 'X')) {
                    valueBit[i] = mask[i];
                }
            }

            memory[memLocation] = valueBit.join('');
        }
    }

    return Object.values(memory).map(v => bitToNumConvert(v)).reduce((a,b) => a + b, 0)
}

function numToBitConvert(num) {
    let result = '000000000000000000000000000000000000'.split('');

    while(num) {
        let i = Math.floor(Math.log2(num))
        result[result.length - i - 1] = 1;
        num -= 2 ** i;
    }

    return result.join('');

}

function bitToNumConvert(bit) {
    let result = 0;

    for(let i = 0; i < bit.length; i++) {
        if (bit[i] === '1') {
            result += (2 ** (bit.length - i - 1));
        }
    }

    return result;
}

console.log(executeProgram(program));
