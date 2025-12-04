const fs = require('node:fs');
const input = fs.readFileSync(__dirname+'/input.txt', 'utf8');

const list = input.split(/\s+/);

let currPos = 50;
let pass = 0;

for (const item of list) {
    const [dir, count] = [item[0], parseInt(item.slice(1))];
    currPos += dir === "L" ? -count : count;
    
    if (currPos < 0) currPos += 100;
    currPos %= 100;

    if (currPos === 0) pass++;
    
}

console.log('Password:', pass);


/* Part 2 */
let passAny = 0;
currPos = 50;

for (const item of list) {
    const [dir, count] = [item[0], parseInt(item.slice(1))];
    
    /* const step = dir === "L" ? -1 : 1;
    
    for (let i = 0; i < count; i++) {
        currPos += step;
        if (currPos < 0) currPos += 100;
        currPos %= 100;
        if (currPos === 0) passAny++;
    } */

    const loops = Math.floor(count / 100);
    passAny += loops;
    const remainder = count % 100;

    currPos += dir === "L" ? -remainder : remainder;
    if (currPos < 0) {
        if (currPos+remainder != 0) passAny++;
        currPos += 100;
    } else if (currPos >= 100) {
        passAny++;
        currPos %= 100;
    } else if (currPos === 0) {
        passAny++;
    }

}

console.log('Password any pass:', passAny);