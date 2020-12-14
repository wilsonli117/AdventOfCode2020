const fs = require("fs");
const input = fs.readFileSync("./adapters.txt").toString();
let adapters = input.split("\n").map(ele => parseInt(ele));

const quickSort = (arr) => {
    if (arr.length <= 1) return arr;
    let pivot = arr[0];

    let left = arr.slice(1).filter(ele => ele <= pivot);
    let right = arr.slice(1).filter(ele => ele > pivot);

    return quickSort(left).concat([pivot]).concat(quickSort(right));
}


const joltDifferences = (arr) => {
    let sortedArr = quickSort(arr);

    let oneDiff = 1;
    let threeDiff = 1;

    for (let i = 0; i < sortedArr.length - 1; i++) {
        if (sortedArr[i + 1] - sortedArr[i] === 1) oneDiff += 1;
        if (sortedArr[i + 1] - sortedArr[i] === 3) threeDiff += 1;
    }

    return oneDiff * threeDiff;
}

console.log(joltDifferences(adapters))

let sortedArr = quickSort(adapters);
sortedArr.unshift(0);
sortedArr.push(sortedArr[sortedArr.length - 1] + 3);

const findCombinations = (array, cache={}) => {
    let currentCombo = array.join(' ');

    if (cache[currentCombo]) return cache[currentCombo];
    
    let count = 1;

    for(let i = 1; i < array.length - 1; i++) {
        if (array[i + 1] - array[i -1] <= 3) {
            let arr = [array[i-1]].concat(array.slice(i+1));
            count += findCombinations(arr, cache);
        }
    }

    cache[currentCombo] = count;

    return count;
}

console.log(findCombinations(sortedArr));