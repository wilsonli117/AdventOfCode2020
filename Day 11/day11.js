const fs = require("fs");
const input = fs.readFileSync("./seats.txt").toString();
let seats = input.split("\n").map(row => row.split(''))

function applyRules(seats) {
    let changed = false;
    let seatCopy = [];

    for(let i = 0; i < seats.length; i++) {
        let rowCopy = [];
        for (let j = 0; j < seats[i].length; j++) {
            if (seats[i][j] !== '.') {
                let adjacentOccupied = 0;

                if (seats[i][j - 1] === '#') adjacentOccupied += 1; //check left seat
                if (seats[i][j + 1] === '#') adjacentOccupied += 1; //check right seat
                if (seats[i - 1]) {
                    if (seats[i - 1][j] === '#') adjacentOccupied += 1; //check above seat
                    if (seats[i - 1][j - 1] === '#') adjacentOccupied += 1; //check above left diagonal
                    if (seats[i - 1][j + 1] === '#') adjacentOccupied += 1; //check above right diagonal
                }
                if (seats[i + 1]) {
                    if (seats[i + 1][j] === '#') adjacentOccupied += 1;// check below seat
                    if (seats[i + 1][j - 1] === '#') adjacentOccupied += 1; //check below left diagonal
                    if (seats[i + 1][j + 1] === '#') adjacentOccupied += 1; //check below right diagonal
                }

                if (seats[i][j] === 'L' && adjacentOccupied === 0) {
                    rowCopy.push('#');
                    changed = true;
                } else if (seats[i][j] === '#' && adjacentOccupied >= 4) {
                    rowCopy.push('L');
                    changed = true;
                } else {
                    rowCopy.push(seats[i][j])
                }
            } else {
                rowCopy.push(seats[i][j]);
            }
        }
        seatCopy.push(rowCopy);
    }
    
    
    return { changed: changed, seats: seatCopy}
}

function seating(seats) {
    let changed = true;
    let occupiedSeats = 0;

    while (changed) {
        let applied = applyRules(seats);
        seats = applied.seats;
        changed = applied.changed;
    }

    for(let i = 0; i < seats.length; i ++) {
        for(let k = 0; k < seats[i].length; k++) {
            if (seats[i][k] === '#') occupiedSeats += 1;
        }
    }

    return occupiedSeats;
}

// console.log(seating(seats));

function applyRules2(seats) {
    let changed = false;
    let seatCopy = [];

    for (let i = 0; i < seats.length; i++) {
        let rowCopy = [];
        for (let j = 0; j < seats[i].length; j++) {
            if (seats[i][j] !== '.') {
                let adjacentOccupied = 0;
                let dirs = {
                    left : [0, -1],
                    right : [0, 1],
                    top : [-1, 0],
                    bottom : [1, 0],
                    topLeftDiag : [-1, -1],
                    topRightDiag : [-1, 1],
                    bottomLeftDiag : [1, -1],
                    bottomRightDiag : [1, 1]
                }
                Object.values(dirs).forEach(dir => {
                    let searching = true;
                    let dy = dir[0];
                    let dx = dir[1];

                    while (searching) {
                        if (seats[i + dy]) {
                            if (seats[i + dy][j + dx] === '#') {
                                adjacentOccupied += 1;
                                searching = false;
                            } else if (seats[i + dy][j + dx] === 'L' || seats[i + dy][j + dx] === undefined) {
                                searching = false;
                            } else if (seats[i + dy][j + dx] === '.') {
                                dy += dir[0];
                                dx += dir[1];
                            }
                        } else {
                            searching = false;
                        }
                    }
                })

                if (seats[i][j] === 'L' && adjacentOccupied === 0) {
                    rowCopy.push('#');
                    changed = true;
                } else if (seats[i][j] === '#' && adjacentOccupied >= 5) {
                    rowCopy.push('L');
                    changed = true;
                } else {
                    rowCopy.push(seats[i][j])
                }
            } else {
                rowCopy.push(seats[i][j]);
            }
        }
        seatCopy.push(rowCopy);
    }

    return { changed: changed, seats: seatCopy }
}

function seating2(seats) {
    let changed = true;
    let occupiedSeats = 0;

    while (changed) {
        let applied = applyRules2(seats);
        seats = applied.seats;
        changed = applied.changed;
    }

    for (let i = 0; i < seats.length; i++) {
        for (let k = 0; k < seats[i].length; k++) {
            if (seats[i][k] === '#') occupiedSeats += 1;
        }
    }

    return occupiedSeats;
}

console.log(seating2(seats))