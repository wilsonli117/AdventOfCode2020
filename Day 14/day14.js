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

            for(let j = 0; j < mask.length; j++) {
                if (!(mask[j] === 'X')) {
                    valueBit[j] = mask[j];
                }
            }

            memory[memLocation] = valueBit.join('');
        }
    }

    return Object.values(memory).map(v => bitToNumConvert(v)).reduce((a,b) => a + b, 0)
}

function executeProgram2(program) {
    let mask;
    let memory = {};

    for (let i = 0; i < program.length; i++) {
        if (program[i][1] === 'a') {
            mask = program[i].slice(7);
        } else {
            let regexResult = program[i].match(/[0-9]+/g)
            let memLocation = numToBitConvert(parseInt(regexResult[0])).split('');
            let value = parseInt(regexResult[1]);
            
            memLocation = applyMask(memLocation, mask);
            
            let addresses = findFloatingAddresses(memLocation.join('')).map(address => bitToNumConvert(address));
            
            addresses.forEach(address => {
                memory[address] = value;
            })
        }
    }

    return Object.values(memory).reduce((a,b) => a + b, 0);
}

function applyMask(address, mask) {

    for (let i = 0; i < mask.length; i++) {
        if (mask[i] === 'X') {
            address[i] = 'X';
        } else if (mask[i] === '1') {
            address[i] = '1';
        }
    }

    return address;
}

function findFloatingAddresses(address, memo=[]) {
    if (!(address.includes('X'))) {
        memo.push(address);
        return memo;
    };

    const addressCopy = address.split('')

    for(let i = 0; i < addressCopy.length; i++) {
        if (addressCopy[i] === 'X') {
            addressCopy[i] = '0';
            memo.concat(findFloatingAddresses(addressCopy.join(''), memo));
            addressCopy[i] = '1';
            memo.concat(findFloatingAddresses(addressCopy.join(''), memo));
            break;
        }
    }

    return memo
    
}

// console.log(findFloatingAddresses('000000000000000000000000000000X1101X'))

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

console.log(executeProgram2(program));
