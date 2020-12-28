input = [20, 0, 1, 11, 6, 3]

function elfMemoryGame(starting, target) {
    let memory = new Map();

    starting.forEach((num, idx) => {
        memory.set(num, idx + 1);
    })

    let turn = starting.length + 1;
    let currNum = 0;

    while (turn <= target) {
        if (turn === target) {
            break;
        } 

        if (memory.get(currNum) || memory.get(currNum) === 0) {
            let lastSpoken = memory.get(currNum);
            memory.set(currNum, turn);
            currNum = turn - lastSpoken;
        } else {
            memory.set(currNum, turn);
            currNum = 0;
        }

        turn++;
    }

    return currNum;
}

console.log(elfMemoryGame(input, 30000000))