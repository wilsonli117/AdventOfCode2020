const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
let initialState = input.split(/\n/).map(row => row.split(''));

function findActiveCubes(initialState, numCycles) {
    let grid = { 0 : initialState };
    let activeCount = 0;

    for(let i = 0; i < numCycles; i++) {
        grid = runCycle(grid);
    }

    Object.values(grid).forEach(slice => {
        slice.forEach(row => {
            row.forEach(cube => {
                if (cube === '#') activeCount += 1;
            })
        })
    })

    console.log(grid);
    return activeCount;
}

console.log(findActiveCubes(initialState, 1));

function runCycle(grid) {
    grid = expandGrid(grid);
    let newGrid = {};

    Object.keys(grid).forEach(z => {
        z = parseInt(z);

        let slice = grid[z]
        let newSlice = [];
    
        for(let i = 0; i < slice.length; i++) {
            let row = slice[i];
            let newRow = [];

            row.forEach((cube, idx) => {
                let activeNeighborCount = 0;
                
                if (row[idx - 1] === '#') activeNeighborCount += 1; //left
                if (row[idx + 1] === '#') activeNeighborCount += 1; //right
    
                if (slice[i - 1]) {
                    if (slice[i - 1][idx] === '#') activeNeighborCount += 1; //above
                    if (slice[i - 1][idx - 1] === '#') activeNeighborCount += 1; //top-left diagonal
                    if (slice[i - 1][idx + 1] === '#') activeNeighborCount += 1; //top-right diagonal
                }
              
                if (slice[i + 1]) {
                    if (slice[i + 1][idx] === '#') activeNeighborCount += 1; //below
                    if (slice[i + 1][idx - 1] === '#') activeNeighborCount += 1; //bottom-left diagonal
                    if (slice[i + 1][idx + 1] === '#') activeNeighborCount += 1; //bottom-right diagonal
                }
           
                if (grid[z - 1]) {
                    if (grid[z - 1][i][idx] === '#') activeNeighborCount += 1; //previous slice, same position
                    if (grid[z - 1][i][idx - 1] === '#') activeNeighborCount += 1; //previous slice, left
                    if (grid[z - 1][i][idx + 1] === '#') activeNeighborCount += 1; //previous slice, right
    
                    if(grid[z - 1][i - 1]) {
                        if (grid[z - 1][i - 1][idx] === '#') activeNeighborCount += 1; //previous slice, above
                        if (grid[z - 1][i - 1][idx - 1] === '#') activeNeighborCount += 1; //previous slice, top-left diagonal
                        if (grid[z - 1][i - 1][idx + 1] === '#') activeNeighborCount += 1; //previous slice, top-right diagonal
                    }
    
                    if (grid[z - 1][i + 1]) {
                        if (grid[z - 1][i + 1][idx] === '#') activeNeighborCount += 1; //previous slice, below
                        if (grid[z - 1][i + 1][idx - 1] === '#') activeNeighborCount += 1; //previous slice, bottom-left diagonal
                        if (grid[z - 1][i + 1][idx + 1] === '#') activeNeighborCount += 1; //previous slice, bottom-right diagonal
                    }
                }
    
                if (grid[z + 1]) {
                    if (grid[z + 1][i][idx] === '#') activeNeighborCount += 1; //next slice, same position
                    if (grid[z + 1][i][idx - 1] === '#') activeNeighborCount += 1; //next slice, left
                    if (grid[z + 1][i][idx + 1] === '#') activeNeighborCount += 1; //next slice, right
    
                    if (grid[z + 1][i - 1]) {
                        if (grid[z + 1][i - 1][idx] === '#') activeNeighborCount += 1; //next slice, above
                        if (grid[z + 1][i - 1][idx - 1] === '#') activeNeighborCount += 1; //next slice, top-left diagonal
                        if (grid[z + 1][i - 1][idx + 1] === '#') activeNeighborCount += 1; //next slice, top-right diagonal
                    }
    
                    if (grid[z + 1][i + 1]) {
                        if (grid[z + 1][i + 1][idx] === '#') activeNeighborCount += 1; //next slice, below
                        if (grid[z + 1][i + 1][idx - 1] === '#') activeNeighborCount += 1; //next slice, bottom-left diagonal
                        if (grid[z + 1][i + 1][idx + 1] === '#') activeNeighborCount += 1; //next slice, bottom-right diagonal
                    }
                }
                
                if (cube === '#' && (activeNeighborCount === 2 || activeNeighborCount === 3)) {
                    newRow.push('#');
                } else if (cube === '.' && activeNeighborCount === 3) {
                    newRow.push('#');
                } else {
                    newRow.push('.');
                }
            })
    
            newSlice.push(newRow);
        }

        newGrid[z] = newSlice;
    })
    
    return newGrid;
}

function expandGrid(grid) {
    Object.keys(grid).forEach(z => {
        z = parseInt(z);
        //add rows to top and bottom of each slice
        let arr = [];
        for (let i = 0; i < grid[z][0].length - 2; i++) {
            arr.push('.')
        }
        grid[z].push(arr);
        grid[z].unshift(arr);

        //add columns to left and right of each slice
        grid[z].forEach(row => {
            row.unshift('.');
            row.push('.');
        })

        //add slices to edge slices
        if (!grid[z - 1]) {
            grid[z - 1] = newSlice(grid[z].length, grid[z][0].length);
        }

        if (!grid[z + 1]) {
            grid[z + 1] = newSlice(grid[z].length, grid[z][0].length);
        }
    })

    return grid;
}

function newSlice(sliceLength, rowLength) {
    let result = [];
    for(let i = 0; i < sliceLength; i++) {
        let arr = [];
        for(let j = 0; j < rowLength; j++) {
            arr.push('.');
        }
        result.push(arr);
    }

    return result;
}

