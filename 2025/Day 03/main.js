const fs = require('node:fs');
const input = fs.readFileSync(__dirname+'/input.txt', 'utf8');

const lines = input.split('\n');

let sum = 0;
for (const line of lines) {
    const num = [0, 0];

    for (let i = 0; i < line.length; i++) {
        const curr = line[i];

        if (curr > num[0] && i < line.length - 2) {
            num[0] = curr;
            num[1] = 0;
        } else if (curr > num[1]) {
            num[1] = curr;
        }

    }
    sum += +(num[0] + num[1]);
}

console.log(sum);