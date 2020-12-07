const fs = require("fs");
const pws = fs.readFileSync("./pw.txt").toString();
let pwsByLine = pws.split("\n");

let count = 0;

// for(let i = 0; i < pwsByLine.length; i++) {
//     let line = pwsByLine[i].split(' ');
//     let letter = line[1][0];
//     let min = parseInt(line[0].split('-')[0]);
//     let max = parseInt(line[0].split('-')[1]);
//     let pw = line[2];
//     let letterCount = 0;

//     for(let j = 0; j < pw.length; j++) {
//         if (pw[j] === letter) letterCount += 1;
//     }

//     if (letterCount >= min && letterCount <= max) count += 1;

// }

for (let i = 0; i < pwsByLine.length; i++) {
    let line = pwsByLine[i].split(' ');
    let letter = line[1][0];
    let pos1 = parseInt(line[0].split('-')[0]) - 1;
    let pos2 = parseInt(line[0].split('-')[1]) - 1;
    let pw = line[2];

    if ((pw[pos1] === letter && pw[pos2] != letter) || (pw[pos1] != letter && pw[pos2] === letter)) count += 1;

}

console.log(count);