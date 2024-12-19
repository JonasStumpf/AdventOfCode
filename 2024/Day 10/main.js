
const fs = require('node:fs');
const input = fs.readFileSync(__dirname+'/input.txt', 'utf8');



const map = input.split("\n").map(el=>el.trim().split(""));


function getField(pos) {
    const {x, y} = pos;
    if (y < 0 || x < 0 || y > map.length - 1 || x > map[y].length - 1) return false;
    return map[y][x];
}
function getAdjacentFieldsPos(field) {
    const {x, y} = field;
    return [
        {x: x+1, y},
        {x: x-1, y},
        {x, y: y+1},
        {x, y: y-1}
    ];
}


/* A1 */
let totalPaths = 0;
for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
        if (getField({x, y}) == 0) totalPaths += findPaths({x, y});
    }
}
console.log("Total Paths", totalPaths);


function findPaths(fieldPos, ends = []) {
    
    const field = getField(fieldPos);

    if (field == 9) {
        if (ends.filter(el=>el.x == fieldPos.x && el.y == fieldPos.y).length > 0) return 0; //ignore already found ends
        ends.push(fieldPos)
        return 1;
    }

    let possiblePaths = 0;
    for (const adjFieldPos of getAdjacentFieldsPos(fieldPos)) {

        const adjField = getField(adjFieldPos);
        if (!adjField || (adjField - field) != 1) continue;

        possiblePaths += findPaths(adjFieldPos, ends);
    }

    return possiblePaths;
}


/* A2 */
let totalDistinctPaths = 0;
for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
        if (getField({x, y}) == 0) totalDistinctPaths += findDistinctPaths({x, y});
    }
}
console.log("Total Paths", totalDistinctPaths);


function findDistinctPaths(fieldPos) {
    
    const field = getField(fieldPos);

    if (field == 9) return 1;

    let possiblePaths = 0;
    for (const adjFieldPos of getAdjacentFieldsPos(fieldPos)) {

        const adjField = getField(adjFieldPos);
        if (!adjField || (adjField - field) != 1) continue;

        possiblePaths += findDistinctPaths(adjFieldPos);
    }

    return possiblePaths;
}