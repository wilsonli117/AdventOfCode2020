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
    let slice = grid[z];

    for(let i = 0; i < slice.length; i++) {
        let row = slice[i];

        row.forEach((cube, idx) => {
            let activeCount = 0;

            if (row[idx - 1] === '#') activeCount += 1; //left
            if (row[idx + 1] === '#') activeCount += 1; //right
            if (slice[i - 1][idx] === '#') activeCount += 1; //above
            if (slice[i - 1][idx - 1] === '#') activeCount += 1; //top-left diagonal
            if (slice[i - 1][idx + 1] === '#') activeCount += 1; //top-right diagonal
            if (slice[i + 1][idx] === '#') activeCount += 1; //below
            if (slice[i + 1][idx - 1] === '#') activeCount += 1; //bottom-left diagonal
            if (slice[i + 1][idx + 1] === '#') activeCount += 1; //bottom-right diagonal
            if (grid[z - 1][i][idx]) activeCount += 1; //previous slice, same position
            if (grid[z - 1][i][idx - 1]) activeCount += 1; //previous slice, left
            if (grid[z - 1][i][idx + 1]) activeCount += 1; //previous slice, right
            if (grid[z - 1][i - 1][idx]) activeCount += 1; //previous slice, above
            if (grid[z - 1][i - 1][idx - 1]) activeCount += 1; //previous slice, top-left diagonal
            if (grid[z - 1][i - 1][idx + 1]) activeCount += 1; //previous slice, top-right diagonal
            if (grid[z - 1][i + 1][idx]) activeCount += 1; //previous slice, below
            if (grid[z - 1][i + 1][idx - 1]) activeCount += 1; //previous slice, bottom-left diagonal
            if (grid[z - 1][i + 1][idx + 1]) activeCount += 1; //previous slice, bottom-right diagonal
            if (grid[z + 1][i][idx]) activeCount += 1; //next slice, same position
            if (grid[z + 1][i][idx - 1]) activeCount += 1; //next slice, left
            if (grid[z + 1][i][idx + 1]) activeCount += 1; //next slice, right
            if (grid[z + 1][i - 1][idx]) activeCount += 1; //next slice, above
            if (grid[z + 1][i - 1][idx - 1]) activeCount += 1; //next slice, top-left diagonal
            if (grid[z + 1][i - 1][idx + 1]) activeCount += 1; //next slice, top-right diagonal
            if (grid[z + 1][i + 1][idx]) activeCount += 1; //next slice, below
            if (grid[z + 1][i + 1][idx - 1]) activeCount += 1; //next slice, bottom-left diagonal
            if (grid[z + 1][i + 1][idx + 1]) activeCount += 1; //next slice, bottom-right diagonal

        })
    }
}