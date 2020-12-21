const fs = require("fs");
const { cursorTo } = require("readline");
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
    let earliestTime = BigInt(0);
    //congruences are x = a(mod n) where a is the offset from index 0 and n is the busID at that index (all busIDs are pairwise coprime)

    //N is new modulus which is product of all n's, will be divided by the current modulus(busID)
    const N = busIDs.reduce((acc, cur) => {
        if (cur === 'x') {
            return acc * 1; 
        } else {
            return acc * cur;
        }
    }, 1)

    //find modular multiplicative inverse of an integer a ( a * x = 1(mod m) )
    const inverseMod = (a, mod) => {
        let b = a % mod;
        for(let i = 1; i < mod; i++) {
            if ((b * i) % mod === 1) return i;
        }
    }
    
    for(let i = 0; i < busIDs.length; i++) {
        if (busIDs[i] === 'x') continue;
        let a = busIDs[i] - i;
        let n = N / busIDs[i];
        let sum = BigInt(a) * BigInt(n) * BigInt(inverseMod(n, busIDs[i])); //need BigInt for JavaScript because large numbers 'fail silently by rounding, having lost 1 or more of their bits used for low numbers to be able to represent the larger numbers'
        earliestTime += BigInt(sum);
    }

    return earliestTime % BigInt(N);
}

console.log(earliestTimestamp(notes));
//need to refactor using chinese remainder theroem