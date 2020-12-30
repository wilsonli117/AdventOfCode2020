const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
let notes = input.split(/\n{2,}/)

function findTicketErrorRate(notes) {
   const rules = Object.values(parseTicketRules(notes[0].split('\n')));
   let errorRate = 0;
   
   notes[2].match(/\d+/g).forEach(num => {
       num = parseInt(num);
       let valid = false;

       for(let i = 0; i < rules.length; i++) {
           if ((num >= rules[i][0][0] && num <= rules[i][0][1]) || (num >= rules[i][1][0] && num <= rules[i][1][1])) {
               valid = true;
               break;
           } 
       }

       if (!valid) errorRate += num;
   })
    
   return errorRate;
}

function parseTicketRules(rules) {
    const result = {};

    for(let i = 0; i < rules.length; i++) {
        let rule = rules[i];
        let field = rule.match(/^.+(?=:)/)[0];
        let values = rule.match(/\d+-\d+/g).map(value => value.split('-').map(num => parseInt(num)));

        result[field] = values;
    }

    return result;

}  

function findDeparture(notes) {
    const rules = parseTicketRules(notes[0].split('\n'));
    const myTicket = notes[1].match(/\d+/g).map(x => parseInt(x));
    const nearbyTickets = transpose(notes[2].split('\n').slice(1).map(ticket => ticket.split(',').map(num => parseInt(num))).filter(ticket => validTicket(rules, ticket)));
    const rulePositions = Object.assign(rules, {});
    const ruleNames = Object.keys(rulePositions); //JS Objects keep order of insertion!
    let result = 1;
   
    while (ruleNames.length) {
        nearbyTickets.forEach((col, i) => {
            let possibleRules = [];
            for (let j = 0; j < ruleNames.length; j++) {
                let rule = rules[ruleNames[j]];

                if (col.every(num => checkRule(num, rule))) {
                    possibleRules.push(ruleNames[j]);
                }

            }

            if (possibleRules.length === 1) {
                rulePositions[possibleRules[0]] = i;
                ruleNames.splice(ruleNames.indexOf(possibleRules[0]), 1);
            }
        })
    }
    
    
    Object.keys(rulePositions).forEach(key => {
        if (key.includes('departure')) {
            result *= myTicket[rulePositions[key]];
        }
    })

    return result;
}

function validTicket(rules, ticket) {
    rules = Object.values(rules);
    let valid = false;

    for(let i = 0; i < ticket.length; i++) {
        valid = false;
        let num = ticket[i];
      
       for(let j = 0; j < rules.length; j++) {
           let rule = rules[j];
           if ((num >= rule[0][0] && num <= rule[0][1]) || (num >= rule[1][0] && num <= rule[1][1])) {
               valid = true;
               break;
           } 
        }
        if(!valid) {
           break;
        }

    }

    return valid;

}

function checkRule(num, rule) {
    if ((num >= rule[0][0] && num <= rule[0][1]) || (num >= rule[1][0] && num <= rule[1][1])) {
        return true;
    } else {
        return false;
    }
}

function transpose(matrix) {
    return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

console.log(findDeparture(notes));