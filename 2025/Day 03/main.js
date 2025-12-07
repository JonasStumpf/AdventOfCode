const fs = require('node:fs');
const input = fs.readFileSync(__dirname+'/input.txt', 'utf8');

const lines = input.split('\n').map(l => l.trim());

let sum2 = 0;
let sum12 = 0;
for (const line of lines) {
    sum2 += getLineNum(line, 2);
    sum12 += getLineNum(line, 12);
}

console.log(sum2);

console.log(sum12);

function getLineNum(line, numLength) {
    const num = [];
    num.length = numLength;
    num.fill(0);

    for (let i = 0; i < line.length; i++) { //every digit in line
        const curr = line[i];
        
        const rest = line.length - i;
        const start = Math.max(0, numLength - rest);
        
        for (let j = start; j < numLength; j++) { //check num list
            if (curr > num[j]) {
                num[j] = curr;
                num.fill(0, j + 1);
                break;
            }
        }


    }
    
    return +num.join('');
}
