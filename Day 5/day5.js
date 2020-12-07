const fs = require("fs");
const passes = fs.readFileSync("./boarding.txt").toString();
let passesByLine = passes.split("\n");

let highId = 0;
let lowId = 987;
let highRow = 0;
let lowRow = 1000;

let seatIds = {};

const decodeRow = (rowCode) => {
    let rowMin = 0;
    let rowMax = 127;
    let i = 0;
    
    while (i < rowCode.length) {
        if (rowCode[i] === 'F') {
            rowMax = Math.floor(rowMax - ((rowMax - rowMin)/2))
        } else {
            rowMin += Math.floor(((rowMax + 1) - rowMin)/2);
        }
        i++ 
    }

    if (rowMin > highRow) highRow = rowMin;
    if (rowMin < lowRow) lowRow = rowMin;

    return rowMin;
}

const decodeCol = (colCode) => {
    let colMin = 0;
    let colMax = 7;
    let i = 0;

    while(i < colCode.length) {
        if (colCode[i] === 'L') {
            colMax = Math.floor(colMax - ((colMax - colMin) / 2))
        } else {
            colMin += Math.floor(((colMax + 1) - colMin) / 2);
        }
        i++ 
    }

    return colMin;
}

for (let i = 0; i < passesByLine.length; i++) {
    let line = passesByLine[i];
    let rowCode = line.slice(0, -3);
    let colCode = line.slice(-3);
    let row = decodeRow(rowCode);
    let col = decodeCol(colCode);
    let seatId = row * 8 + col
  
    if (seatId > highId) highId = seatId;
    if (seatId < lowId) lowId = seatId;

    seatIds[seatId] = true;
}

let myId;

for (let i = lowRow; i <= highRow; i++) {
    for(let k = 0; k <= 7; k++) {
        if(!seatIds[i * 8 + k] && (i * 8 + k < 987)) {
            myId = i * 8 + k;
        }
    }
}

console.log(myId);
