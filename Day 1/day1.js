// const fetch = require("node-fetch");
// const jsdom = require("jsdom");
// const { JSDOM } = jsdom;

// fetch('https://adventofcode.com/2020/day/1/input')
//     .then(
//         (response) => {
//             console.log(response)
//         }
//     )
//     .catch(
//         (error) => {
//             console.log('oh no')
//         }
//     )

// let seed;

// (async () => {
//     const response = await fetch('https://adventofcode.com/2020/day/1/input');
//     const text = await response.text();
//     const dom = await new JSDOM(text);
//     // seed = dom.window.document.getElementsByTagName("PRE")
//     console.log(response.data);
// })()

// const axios = require('axios');
// const cheerio = require('cheerio');

// const getSeeds = async () => {
//         const { data } = await axios.get(
//         'https://adventofcode.com/2020/day/1/input'
//         );
//         const $ = cheerio.load(data);

//         const seeds = [];

//         return $;
// }

// getSeeds()
//     .then(seeds => console.log(seeds))
//     .catch(error => console.log('oh no'));

const fs = require("fs");
const seeds = fs.readFileSync("./seeds.txt").toString();
let seedsByLine = seeds.split("\n");

seedsByLine = seedsByLine.map(el => parseInt(el))

let checked = {};

for(let i = 0; i < seedsByLine.length; i++) {
    let num = seedsByLine[i];
    if (checked[2020 - num]) {
        checked[num] = [num];
        console.log(checked[2020 - num] * num)
    } else {
        checked[num] = [num];
    }
}


for (let i = 0; i < seedsByLine.length; i++) {
    let num1 = seedsByLine[i]
    for(let j = i + 1; j < seedsByLine.length; j++) {
        let num2 = seedsByLine[j]
        for(let l = j + 1; l < seedsByLine.length; l++) {
            let num3 = seedsByLine[l]
            if (num1 + num2 + num3 === 2020) {
                let result = num1 * num2 * num3; 
                console.log([num1, num2, num3]);
                console.log(result)
            }
        }
    }
}