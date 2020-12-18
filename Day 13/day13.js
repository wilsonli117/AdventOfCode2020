const fs = require("fs");
const input = fs.readFileSync("./input.txt").toString();
let notes = input.split("\n")

function earliestBus(notes) {
    let time = parseInt(notes[0]);
    let busIDs = notes[1].split(',').filter(ele => parseInt(ele)).map(ele => parseInt(ele));
    let bestBus;
    let waitTime = 99999999999999;

    busIDs.forEach(bus => {
        if (bus - (time % bus) < waitTime) {
            bestBus = bus;
            waitTime = bus - (time % bus);
        }
    })
    
    return bestBus * waitTime;
}

// console.log(earliestBus(notes));

function earliestTimestamp(notes) {
    let busIDs = notes[1].split(',').map(ele => parseInt(ele) ? parseInt(ele) : ele);
    let earliestTS;
    let test = busIDs[0];
    let searching = true;
    

    while (searching) {
            let pass = true;
            
            for(let i = 1; i < busIDs.length; i++) {
                if (busIDs[i] === 'x') continue;
                if (!((test + i) % busIDs[i] === 0)) {
                    pass = false;
                    break;
                } 
            }

            if (pass) {
                earliestTS = test;
                searching = false;
            } else {
                test += busIDs[0];
            }
        
    }

    return earliestTS;

}

console.log(earliestTimestamp(notes));