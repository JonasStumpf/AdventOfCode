const fs = require('node:fs');
const input = fs.readFileSync(__dirname+'/input.txt', 'utf8');


const parts = input.split(/\n\s*\n/).map(l => l.trim());

const freshIds = parts[0].split('\n').map(l => l.trim());
const availableIds = parts[1].split('\n').map(l => l.trim());


function inRange(id) {
    for (const fId of freshIds) {
        const [min, max] = fId.split('-').map(n => parseInt(n));
        if (id >= min && id <= max) return true;
    }
    
    return false;
}

let validIds = 0;
for (const id of availableIds) {
    if (inRange(+id)) validIds++;
}
console.log("Valid Ids: " + validIds);


// build and combine Ranges
const mergedRanges = freshIds.map(fId => {
    const [min, max] = fId.split('-').map(n => parseInt(n));
    return {min, max};
});
let didMerge;
do {
    didMerge = false;

    for (let i = 0; i < mergedRanges.length; i++) {
        const target = mergedRanges[i];
        for (let j = i + 1; j < mergedRanges.length; j++) {
            const compare = mergedRanges[j];

            if (target.max < compare.min || target.min > compare.max) continue;

            //merge
            target.min = Math.min(target.min, compare.min);
            target.max = Math.max(target.max, compare.max);
            mergedRanges.splice(j, 1);
            didMerge = true;
            j--;

        }
    }

} while (didMerge);

let totalAvailableIds = 0;
for (const range of mergedRanges) {
    totalAvailableIds += (range.max - range.min + 1);
}

console.log("Total Available Ids: " + totalAvailableIds);
