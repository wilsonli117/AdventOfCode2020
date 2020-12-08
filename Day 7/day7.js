const fs = require("fs");
const rules = fs.readFileSync("./rules.txt").toString();
let rulesByLine = rules.split("\n");

// let tests = [/shiny gold bags(?! contain)|shiny gold bag(?!s contain)/];
// let searched = {};

// while (tests.length) {
//     let currentRegex = tests.shift();
//     for(let i = 0; i < rulesByLine.length; i++) {
//         let line = rulesByLine[i];
       
//         if (line.match(currentRegex)) {
//             let newTest = line.split('contain')[0].slice(0, -2);
//             // console.log(tests);
//             if (!searched[newTest]) {
//                 searched[newTest] = true;
//                 tests.push(new RegExp(`${newTest}s(?! contain)|${newTest}(?!s contain)`));
//             }
            
//         }
//     }
// }

// console.log(Object.keys(searched).length);


let tests = [/shiny gold bags(?= contain)/];
let searched = { 'shiny gold bags' : {} };

//build the tree first
while (tests.length) {
    let currentRegex = tests.shift();
    for(let i = 0; i < rulesByLine.length; i++) {
        let line = rulesByLine[i];
       
        if (line.match(currentRegex)) {
            // console.log(line);
            let currentTest = line.split('contain')[0].trim();
            searched[currentTest] = {};
            // console.log(currentTest);
            if (!line.match(/no other bags/)) {
                let newTests = line.split('contain')[1].slice(1, -1).split(', ');
                    for (let k = 0; k < newTests.length; k++) {
                        let newTest = newTests[k].slice(2);
                        if (newTest[newTest.length - 1] !== 's') newTest += 's';

                        searched[currentTest][newTest] = parseInt(newTests[k][0]);
                        tests.push(new RegExp(`${newTest}(?= contain)`));
                }
            } 
                
        }
    }
}

const bfsTraversal = (start) => {
    let queue = [start];
    let bagSum = 0;

    while (queue.length) {
        let currentKey = queue.shift();
        console.log(currentKey);
        let keys = Object.keys(searched[currentKey]);
        if (keys.length) {
            keys.forEach(key => {
                bagSum += searched[currentKey][key]
                for(let i = 0; i < searched[currentKey][key]; i++) {
                    queue.push(key);
                }
            })
        }
    }

    return bagSum;
}

console.log(bfsTraversal('shiny gold bags'));

// let tests2 = [/shiny gold bags(?= contain)/];

// let bagSum = 0;

// while(tests2.length) {
//     let currentRegex2 = tests2.shift();
    
//     for (let i = 0; i < rulesByLine.length; i++) {
//         let line = rulesByLine[i];
        
//         if(line.match(currentRegex2)) {
//             let currentTest = line.split('contain')[0].trim();
            
//             let newTests = line.split('contain')[1].slice(1, -1).split(', ');
           
//             for (let k = 0; k < newTests.length; k++) {
//                 let newTest = newTests[k].slice(2);
//                 if (newTest[newTest.length - 1] !== 's') newTest += 's';
//                 bagSum += parseInt(newTests[k][0]);

//                 for(let j = 0; j < searched[newTest]; j++) {
//                     console.log(newTest)
                    
//                     tests2.push(new RegExp(`${newTest}(?= contain)`));

//                 }
            
            
//             }
//         } else {}
//     }
// }

// console.log(searched);
// console.log(bagSum);