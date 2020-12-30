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
        let field = rule.match(/[a-z]+(?=:)/)[0];
        let values = rule.match(/\d+-\d+/g).map(value => value.split('-').map(num => parseInt(num)));

        result[field] = values;
    }

    return result;

}

function findDeparture(notes) {
    const rules = Object.values(parseTicketRules(notes[0].split('\n')));
    const myTicket = notes[1].match(/\d+/g).map(x => parseInt(x));
    const nearbyTickets = notes[2].split('\n').slice(1).map(ticket => ticket.split(',').map(num => parseInt(num)));

    console.log(nearbyTickets);
}

findDeparture(notes);

function removeInvalidTickets(notes, rules) {
    


}