const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
let instructions = input.split("\n")

function manhattanDist(instructions) {
    let eastWest = 0;
    let northSouth = 0;
    let currAngle = 0;
    let directions = ['E', 'S', 'W', 'N'];


    for(let i = 0; i < instructions.length; i++) {
        let currDirection = directions[0];
        let instruction = instructions[i][0];
        let value = parseInt(instructions[i].slice(1));

        switch(instruction) {
            case 'N':
                northSouth += value;
                break;

            case 'S':
                northSouth -= value;
                break;

            case 'E':
                eastWest += value;
                break;

            case 'W':
                eastWest -= value;
                break;

            case 'L':
                currAngle -= value;
                break;

            case 'R':
                currAngle += value;
                break;

            case 'F':
                if (currDirection === 'N') northSouth += value;
                if (currDirection === 'S') northSouth -= value;
                if (currDirection === 'E') eastWest += value;
                if (currDirection === 'W') eastWest -= value;
                break;

        }

        let change;

        if (currAngle >= 90) {
            change = Math.floor(currAngle / 90);
            currAngle = currAngle % 90;
            for(let j = 0; j < change; j++) {
                directions.push(directions.shift());
            }
        }

        if (currAngle <= -90) {
            change = Math.floor(currAngle / -90);
            currAngle = currAngle % 90;
            for(let k = 0; k < change; k++) {
                directions.unshift(directions.pop());
            }
        }

    }

    return Math.abs(eastWest) + Math.abs(northSouth);
}

console.log(manhattanDist(instructions));