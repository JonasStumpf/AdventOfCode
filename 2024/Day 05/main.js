
const fs = require('node:fs');
const input = fs.readFileSync(__dirname+'/input.txt', 'utf8');


const inputSplit = input.split(/\n\s*\n/);

const orderRules = inputSplit[0].split("\n").map(el=>el.trim());
const updates = inputSplit[1].split("\n");


/* A1 */
let sumCorrectMiddles = 0;
for (const update of updates) {
    const order = update.split(",").map(el=>el.trim());
    
    if (checkOrder(order)) sumCorrectMiddles += +order[Math.floor(order.length / 2)];
}
console.log("Sum Correct Middles", sumCorrectMiddles);

function checkOrder(order) {

    for (let i = 0; i < order.length - 1; i++) {
        const item = order[i];

        for (let j = i+1; j < order.length; j++) {
            const followingItem = order[j];
            if (orderRules.includes(`${followingItem}|${item}`)) return false;
        }

    }

    return true;
}

/* A2 */
let sumCorrectedOrder = 0;
for (const update of updates) {
    let order = update.split(",").map(el=>el.trim());
    
    if (correctedOrder(order)) sumCorrectedOrder += +order[Math.floor(order.length / 2)];
}
console.log("Sum Corrected Middles", sumCorrectedOrder);

function correctedOrder(order) {

    for (let i = 0; i < order.length - 1; i++) {
        const item = order[i];

        for (let j = i+1; j < order.length; j++) {
            const followingItem = order[j];

            if (orderRules.includes(`${followingItem}|${item}`)) { //faulty order
                [order[i], order[j]] = [order[j], order[i]]; //swap
                correctedOrder(order); //try again
                return true; //was corrected
            }

        }

    }
    return false; //was already correct
}