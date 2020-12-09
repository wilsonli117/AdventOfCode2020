const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
let numbers= input.split("\n").map(ele => parseInt(ele));

let preamble = numbers.slice(0,25);

const findInvalidNum = (numbers, preamble) => {
    for (let i = 25; i < numbers.length; i++) {
        let currentNum = numbers[i];
        if (validate(currentNum, preamble)) {
            preamble.shift();
            preamble.push(currentNum);
        } else {
            return currentNum;
        }

    }
}

const validate = (num, preamble) => {
    let checked = {};

    for(let i = 0; i < preamble.length; i++) {
        if (checked[num-preamble[i]]) {
            return true;
        } else {
            checked[preamble[i]] = true;
        }
    }

    return false;
}


let invalidNum = 542529149

const findWeakness = (numbers, target) => {

    let startingIdx = 0;
  
    while (startingIdx < numbers.length) {

        let range = [0];
        let min = 99999999999999999999;
        let max = 0;

        for (let i = startingIdx; i < numbers.length; i++) {
            let num = numbers[i];
            let rangeSum = range.reduce((a, b) => a + b)
  
            if (rangeSum + num === target) {
                if (num < min) min = num;
                if (num > max) max = num;
                console.log(range);
                console.log(min);
                console.log(max);
                return min + max;
            } else if (rangeSum + num <= target) {
                range.push(num);
                if (num < min) min = num;
                if (num > max) max = num;
            } else {
                min = 99999999999999999999;
                max = 0; 
                range = [0, num];
            }
        }
       
        startingIdx++;
    }
    
}

console.log(findWeakness(numbers, invalidNum));
