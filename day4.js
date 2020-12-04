const fs = require("fs");
const passports = fs.readFileSync("./passport.txt").toString();
let passportsByLine = passports.split("\n\n");

let count = 0;

for(let i = 0; i < passportsByLine.length; i++) {
    let obj = {};
    let lines = passportsByLine[i].split('\n');
    for(let j = 0; j < lines.length; j++) {
        lines[j].split(' ').forEach(ele => {
            let entry = ele.split(':');
            obj[entry[0]] = entry[1];
        })
    }
    if ( (obj['cid'] && Object.keys(obj).length === 8) || (!obj['cid'] && Object.keys(obj).length === 7) ) {
        if (parseInt(obj['byr']) >= 1920 && parseInt(obj['byr']) <= 2002) {
            if (parseInt(obj['iyr']) >= 2010 && parseInt(obj['iyr']) <= 2020) {
                if (parseInt(obj['eyr']) >= 2020 && parseInt(obj['eyr']) <= 2030) {
                    if ((obj['hgt'][obj['hgt'].length - 2] === 'i' && obj['hgt'][obj['hgt'].length - 1] === 'n') || (obj['hgt'][obj['hgt'].length - 2] === 'c' && obj['hgt'][obj['hgt'].length - 1] === 'm')) {
                        let hgtInt = parseInt(obj['hgt'].slice(0, obj['hgt'].length - 2));
                        if ((obj['hgt'][obj['hgt'].length - 2] === 'i' && hgtInt >= 59 && hgtInt <= 76) || (obj['hgt'][obj['hgt'].length - 2] === 'c' && hgtInt >= 150 && hgtInt <= 193)) {
                          let chars = { 'a': true, 'b': true, 'c': true, 'd' : true, 'e' : true, 'f' : true, '0' : true, '1' : true, '2' : true, '3' : true, '4' : true, '5' : true, '6' : true, '7' : true, '8' : true, '9' : true}
                          let hairColorValid = true;
                            obj['hcl'].slice(1, obj['hcl'].length - 1).split('').forEach(hairChar => {
                                if (!chars[hairChar]) {
                                    hairColorValid = false;
                                }
                            })
                          if (obj['hcl'][0] === '#' && obj['hcl'].length === 7 && hairColorValid) {
                            let eyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
                            if (eyeColors.includes(obj['ecl'])) {
                                if (obj['pid'].length === 9 && parseInt(obj['pid'])) {
                                    count += 1
                                }
                            }
                          }
                          
                        } 
                    }
               
                }
            }
        }
    } 
}


console.log(count);