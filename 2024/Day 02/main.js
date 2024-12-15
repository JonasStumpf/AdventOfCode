
const fs = require('node:fs');
const input = fs.readFileSync(__dirname+'/input.txt', 'utf8');


const reports = input.split("\n");


/* A1 */
let safeLevels = 0;
for (const report of reports) {
    if ( checkLevels(report.split(" ")) ) safeLevels++;
}
console.log("Safe Levels", safeLevels);


function checkLevels(levels) {
    let preDiff = levels[0] - levels[1];

    for (let i = 0; i < levels.length - 1; i++) {
        const level = levels[i];
        const nextLevel = levels[i+1];
        
        const diff = level - nextLevel;
        if (Math.abs(diff) > 3 || Math.abs(diff) < 1) return false;
        if ( (preDiff < 0 && diff > 0) || (preDiff > 0 && diff < 0) ) return false;
    }

    return true;
}


/* A2 */
let safeLevelsDampened = 0;
for (const report of reports) {
    if ( checkLevelsDampened(report.split(" ")) ) safeLevelsDampened++;
}
console.log("Safe Levels Dampened", safeLevelsDampened);


function checkLevelsDampened(levels) {
    let preDiff = levels[0] - levels[1];

    for (let i = 0; i < levels.length - 1; i++) {
        const level = levels[i];
        const nextLevel = levels[i+1];
        
        const diff = level - nextLevel;

        //check again with i-1 / i / i+1 removed: a-b-c-d
        //a-b increase, rest decrease, is faulty in b-c check but a needs to be removed -> i-1
        //b-c duplicate, remove b -> i
        //a-b increase, b-c decrease, b/c-d increase, remove c -> i+1
        if (Math.abs(diff) > 3 || Math.abs(diff) < 1)
            return checkLevels(levels.toSpliced(i, 1)) || checkLevels(levels.toSpliced(i+1, 1)) || checkLevels(levels.toSpliced(i-1, 1));
        if ( (preDiff < 0 && diff > 0) || (preDiff > 0 && diff < 0) )
            return checkLevels(levels.toSpliced(i, 1)) || checkLevels(levels.toSpliced(i+1, 1)) || checkLevels(levels.toSpliced(i-1, 1));
    }

    return true;
}