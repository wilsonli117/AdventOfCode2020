const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
let initialState = input.split(/\n/).map(row => row.split(''));

function findActiveCubes(initialState, numCycles) {
    let grid = { 0 : initialState };

    console.log(grid);
}

findActiveCubes(initialState, 1);

function runRycle(grid) {
    let z = 0;


}