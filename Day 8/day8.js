const fs = require("fs");
const instructions = fs.readFileSync("./instructions.txt").toString();
let instructionsByLine = instructions.split("\n");

let visited = {};
let i = 0;
let acc = 0;
let possibleIndexes = [];


while(i < instructionsByLine.length) {
    if (visited[i]) {
        break;
    }
    
    let line = instructionsByLine[i].split(' ');
    let instruction = line[0];
  
    let argument;
    line[0] === '+' ? argument = parseInt(line[1].slice(1)) : argument = parseInt(line[1]);
    console.log(line);

    visited[i] = true;
    if (instruction === 'jmp' || instruction === 'nop') {
        possibleIndexes.push(i);
    }

    switch(instruction) {
        case 'acc':
            acc += argument;
            i++;
            break;

        case 'jmp':
            i += argument;
            break;

        case 'nop':
            i++;
            break;

        default:
            i++;
    }

}

//BRUTE FORCE!!!
possibleIndexes.forEach(idx => {
    let i = 0;
    let visited = {};
    let acc = 0;

    while(i < instructionsByLine.length) {
        if (visited[i]) {
            console.log('broke out of while loop');
            break;
        }

        let line = instructionsByLine[i].split(' ');
        let instruction = line[0];

        let argument;
        line[0] === '+' ? argument = parseInt(line[1].slice(1)) : argument = parseInt(line[1]);
        visited[i] = true;

        if (i === idx) {
            if (instruction === 'jmp') {
                instruction = 'nop';
            } else {
                instruction = 'jmp';
            }
        }

        switch (instruction) {
            case 'acc':
                acc += argument;
                i++;
                break;

            case 'jmp':
                i += argument;
                break;

            case 'nop':
                i++;
                break;

            default:
                i++;
        }
    }

    console.log(acc);
})