
const fs = require('node:fs');
const input = fs.readFileSync(__dirname+'/input.txt', 'utf8');

/* create two lists (left 0 & right 1) from input */
const inputLineSplit = input.split(/\s+/);

const lists = {0: [], 1: []};

for (let i = 0; i < inputLineSplit.length; i++) {
    const el = inputLineSplit[i];
    lists[i % 2].push(el);
}

lists[0].sort();
lists[1].sort();


/* A1 - total difference left - right */
let sumDiff = 0;
for (let i = 0; i < lists[0].length; i++) {
    const eL = lists[0][i];
    const eR = lists[1][i];
    
    sumDiff += Math.abs(eL - eR);
}
console.log("Difference", sumDiff);


/* A2 - similarity score */
let sumSimilarity = 0;
for (const left of lists[0]) {
    sumSimilarity += left * lists[1].filter((el)=>el == left).length;
}
console.log("Similarity", sumSimilarity);
