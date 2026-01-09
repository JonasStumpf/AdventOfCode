const fs = require('node:fs');
const input = fs.readFileSync(__dirname+'/input.txt', 'utf8');

//const lines = input.split('\n').map(l => l.trim());

const map = input.split('\n').map(l => l.trim().split(''));


let accessablePaperRolls = 0;
for (let r = 0; r < map.length; r++) {
    const row = map[r];
    for (let c = 0; c < row.length; c++) {
        const field = row[c];
        if (field != "@") continue;

        if (checkRollAccess(r, c)) accessablePaperRolls++;

    }
}

function checkRollAccess(r, c) {
    let paperRolls = 0;
    for (let rr = r - 1; rr <= r + 1; rr++) {
        for (let cc = c - 1; cc <= c + 1; cc++) {
            if (rr == r && cc == c) continue;
            const checkField = map[rr]?.[cc];
            
            if (checkField == "@") paperRolls++;
            
        }
    }
    return paperRolls < 4;
}

console.log("Accessable Paper Rolls: " + accessablePaperRolls);


let removedPaperRolls = 0;
let rollsRemoved;
do {
    rollsRemoved = false;
    for (let r = 0; r < map.length; r++) {
        const row = map[r];
        for (let c = 0; c < row.length; c++) {
            const field = row[c];
            if (field != "@") continue;
            if (!checkRollAccess(r, c)) continue;

            map[r][c] = ".";
            removedPaperRolls++;
            rollsRemoved = true;
        }
    }

} while (rollsRemoved);
console.log("Removed Paper Rolls: " + removedPaperRolls);