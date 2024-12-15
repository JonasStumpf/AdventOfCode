
const fs = require('node:fs');
const input = fs.readFileSync(__dirname+'/input.txt', 'utf8');


const rows = input.split("\n");

const wordTable = [];

for (const row of rows) {
    wordTable.push(row.trim().split(""));
}


/* A1 */
const searchWord = "XMAS";
let wordsFound = 0;
for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
        wordsFound += checkWord(y, x);
    }
}
console.log("Words Found", wordsFound);

function checkWord(y, x) {
    const checks = {
        horizontal: (i)=>wordTable[y][x+i],
        horizontalReverse: (i)=>wordTable[y][x-i],
        vertical: (i)=>wordTable[y+i] ? wordTable[y+i][x] : null,
        verticalReverse: (i)=>wordTable[y-i] ? wordTable[y-i][x] : null,
        diagonalBottomRight: (i)=>wordTable[y+i] ? wordTable[y+i][x+i] : null,
        diagonalTopRight: (i)=>wordTable[y-i] ? wordTable[y-i][x+i] : null,
        diagonalBottomLeft: (i)=>wordTable[y+i] ? wordTable[y+i][x-i] : null,
        diagonalTopLeft: (i)=>wordTable[y-i] ? wordTable[y-i][x-i] : null
    }

    let found = 0;
    
    for (const check of Object.values(checks)) {
        if (loopWord(check)) found++;
    }
    
    function loopWord(check) {
        for (let i = 0; i < searchWord.length; i++) {
            if (!check(i) || check(i) != searchWord[i]) return false;
        }
        return true;
    }

    return found;
}


/* A2 */
let xMASFound = 0;

for (let y = 1; y < rows.length - 1; y++) {
    for (let x = 1; x < rows[y].length - 1; x++) {
        const target = rows[y][x];
        if (target != "A") continue; //center
        
        if (!checkFields(rows[y-1][x-1], rows[y+1][x+1])) continue; //top left & bottom right
        if (!checkFields(rows[y-1][x+1], rows[y+1][x-1])) continue; //top right & bottom left

        xMASFound++;
    }
}
console.log("X-MAS Found", xMASFound);

function checkFields(f1, f2) {
    return ((f1 == "M" && f2 == "S") || (f1 == "S" && f2 == "M"));
}