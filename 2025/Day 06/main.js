const fs = require('node:fs');
const input = fs.readFileSync(__dirname+'/input.txt', 'utf8');

const map = input.split('\n').map(l => l.trim().split(' ').filter(n => n));

let totalResult = 0;
for (let col = 0; col < map[0].length; col++) {
    let colResult = +map[0][col];
    const operation = map[map.length - 1][col];

    for (let row = 1; row < map.length - 1; row++) {
        const current = +map[row][col];

        if (operation == '*') colResult *= current;
        else colResult += current;
    }
    
    totalResult += colResult;
}
console.log("Total Result: " + totalResult);



const lines = input.split('\r\n');
const lastLine = lines.pop();
const colWidths = [];
let currentWidth = 0;
for (let i = 1; i < lastLine.length; i++) {
    const char = lastLine[i];
    if (char != ' ') {
        colWidths.push(currentWidth);
        currentWidth = 0;
    } else {
        currentWidth++;
    }
}
colWidths.push(++currentWidth);

const cols = [];
for (let i = 0; i < colWidths.length; i++) cols[i] = [];

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    let p = 0;
    for (let j = 0; j < colWidths.length; j++) {
        cols[j].push(line.slice(p, p + colWidths[j]));
        p += colWidths[j] + 1;
    }
}

const operations = lastLine.split(' ').filter(n => n);
let result = 0;
for (let i = 0; i < cols.length; i++) {
    const col = cols[i];

    const nums = [];
    for (let l = 0; l < colWidths[i]; l++) {
        let num = '';
        for (let n = 0; n < col.length; n++) {
            const char = col[n][l];
            num += char;
        }
        nums.push(+num.trim());
    }

    const colResult = nums.reduce((a, b) => {
        if (operations[i] == '*') return a * b;
        else return a + b;
    });

    result += colResult;
}
console.log("Result: " + result);