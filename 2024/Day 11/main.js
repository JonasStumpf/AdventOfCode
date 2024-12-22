
const fs = require('node:fs');
const input = fs.readFileSync(__dirname+'/input.txt', 'utf8');


const stones = input.split(" ");


const rules = [
    {
        rule: (val)=>val == "0", // 0 to 1
        transform: ()=>["1"]
    },
    {
        rule: (val)=>val.length % 2 == 0, // split even digits
        transform: (val)=>[val.slice(0, val.length / 2), +val.slice(val.length / 2)+""]
    },
    {
        rule: ()=>true, // * 2024
        transform: (val)=>[(+val * 2024) + ""]
    }
]

/* A1 */
console.log("Num Stones 25 Blinks", blinking(stones, 25).length);

function blinking(stones, blinks) {
    
    let changedStones = stones;
    for (let i = 0; i < blinks; i++) {
        changedStones = blink(changedStones);
    }
    return changedStones;


    function blink(stones) {
        const changedStones = [];
        for (let i = 0; i < stones.length; i++) {
            transformStone(i);
        }
        return changedStones;


        function transformStone(index) {
            for (const rule of rules) {
                if (!rule.rule(stones[index])) continue;
                changedStones.push(...rule.transform(stones[index]));
                return;
            }
        }

    }
    
}



/* A2 */
const stoneMap = {}
for (const stone of stones) {
    if (!stoneMap[stone]) stoneMap[stone] = 1;
    else stoneMap[stone]++;
}

console.log("Num Stone 75 Blinks", blinkingMap(75));

function blinkingMap(blinks) {
    let map = {...stoneMap};
    
    for (let i = 0; i < blinks; i++) {
        map = blink();
    }

    let stoneCount = 0;
    for (const count of Object.values(map)) {
        stoneCount += count;
    }
    return stoneCount;
    
    function blink() {
        let newMap = {};
        for (const [stone, count] of Object.entries(map)) {
            transform(stone).forEach((val)=>{
                if (!newMap[val]) newMap[val] = 0;
                newMap[val] += count;
            });
        }
        return newMap;
    }

    function transform(stone) {
        for (const rule of rules) {
            if (!rule.rule(stone)) continue;
            return rule.transform(stone);
        }
    }

}