const fs = require("fs");
const map = fs.readFileSync("./map.txt").toString();
let mapByLine = map.split("\n");


let count1 = 0; // Right 3, down 1
let j = 0;

for (let i = 0; i < mapByLine.length; i++) {
    if (j > mapByLine[i].length - 1) {
        j = (j % (mapByLine[i].length));
    }

    if (mapByLine[i][j] === '#') {
        count1 += 1;
    }
    j += 3
    
}

let count2 = 0; // Right 1, down 1
let k = 0;

for (let i = 0; i < mapByLine.length; i++) {
    if (k > mapByLine[i].length - 1) {
        k = (k % (mapByLine[i].length));
    }

    if (mapByLine[i][k] === '#') {
        count2 += 1;
    }
    k += 1

}

let count3 = 0; // Right 5, down 1
let x = 0;

for (let i = 0; i < mapByLine.length; i++) {
    if (x > mapByLine[i].length - 1) {
        x = (x % (mapByLine[i].length));
    }

    if (mapByLine[i][x] === '#') {
        count3 += 1;
    }
    x += 5

}

let count4 = 0 //Right 7, down 1
let y = 0;

for (let i = 0; i < mapByLine.length; i++) {
    if (y > mapByLine[i].length - 1) {
        y = (y % (mapByLine[i].length));
    }

    if (mapByLine[i][y] === '#') {
        
        count4 += 1;
    }
    y += 7

}

let count5 = 0; // right 1, down 2
let u = 0; // matrix row 
let p = 0; //matrix col

while (u < mapByLine.length) {

    if (p > mapByLine[u].length - 1) {
        p = (p % (mapByLine[u].length));
    }

    if (mapByLine[u][p] === '#') {
        count5 += 1;
    }

    u += 2
    p += 1;
}

console.log(count1 * count2 * count3 * count4 * count5);
