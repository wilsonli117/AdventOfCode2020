const fs = require("fs");
const customsAnswers = fs.readFileSync("./customs.txt").toString();
let customsAnswersByGroup = customsAnswers.split("\n\n");

let countSum = 0;

// for(let i = 0; i < customsAnswersByGroup.length; i++) {
//     let groupAnswers = customsAnswersByGroup[i].split('\n').join('');
//     let groupQuestions = {};
//     let groupCount = 0;

//     for(let k = 0; k < groupAnswers.length; k++) {
//         if (!groupQuestions[groupAnswers[k]]) {
//             groupQuestions[groupAnswers[k]] = true;
//             groupCount += 1;
//         }
//     }
    
//     countSum += groupCount;
// }

// console.log(countSum);

for(let i = 0; i < customsAnswersByGroup.length; i++) {
    let groupMembersCount = customsAnswersByGroup[i].split('\n').length;
    let groupAnswers = customsAnswersByGroup[i].split('\n').join('');
    let groupQuestions = {};
    let groupCount = 0;

    for(let k = 0; k < groupAnswers.length; k++) {
        groupQuestions[groupAnswers[k]] ? groupQuestions[groupAnswers[k]] += 1 : groupQuestions[groupAnswers[k]] = 1;
    }

    Object.keys(groupQuestions).forEach(key => {
        if(groupQuestions[key] === groupMembersCount) groupCount += 1;
    })
    
    countSum += groupCount;
}

console.log(countSum);