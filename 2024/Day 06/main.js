
const fs = require('node:fs');
const input = fs.readFileSync(__dirname+'/input.txt', 'utf8');


class Map {
    map;
    initialMap;
    
    getField(pos) {
        return this.map[pos.y] ? this.map[pos.y][pos.x] ? this.map[pos.y][pos.x] : false : false;
    }
    setField(pos, val) {
        this.map[pos.y][pos.x] = val;
    }

    constructor(mapString) {
        this.initialMap = mapString.split("\n").map(el=>el.trim());
        for (let i = 0; i < this.initialMap.length; i++) {
            this.initialMap[i] = this.initialMap[i].split("");
        }
        this.reset();
    }

    reset() {
        this.map = [];
        for (const row of this.initialMap) {
            this.map.push([...row]);
        }
    }

    print() {
        let mapString = "";
        let row = 0;
    
        this.loop((pos)=>{
            if (row != pos.y) {
                row = pos.y;
                mapString += "\n";
            }
            mapString += this.getField(pos);
        });
    
        console.log(mapString);
    }

    loop(callback) {
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                const cb = callback({y, x});
                if (cb) return cb;
            }
        }
    }
}

class Guard {
    static states = {
        "^": 0,
        ">": 1,
        "v": 2,
        "<": 3
    }
    getNewPos = {
        0: (y, x)=>{return {y: y-1, x}},
        1: (y, x)=>{return {y, x: x+1}},
        2: (y, x)=>{return {y: y+1, x}},
        3: (y, x)=>{return {y, x: x-1}},
    }

    state;
    pos;

    constructor(state, pos) {
        this.state = state;
        this.pos = pos;
    }

    simulateWalking() {
        while(map.getField(this.pos)) {
            this.walk();
        }
    }

    walk() {
        const newPos = this.getNewPos[this.state](this.pos.y, this.pos.x);
        if (map.getField(newPos) == "#") {
            this.turn();
            return;
        }
        map.setField(this.pos, "X");
        this.pos = newPos;
    }

    turn() {
        this.state = (this.state + 1) % Object.keys(Guard.states).length;
    }
}

const map = new Map(input);
//map.print();


/* A1 */
const guard = map.loop((pos)=>{
    if (Guard.states[map.getField(pos)] !== undefined) return new Guard(Guard.states[map.getField(pos)], pos);
});
guard.simulateWalking();

//console.log("----");
//map.print();

let walkedFields = 0;
map.loop((pos)=>{
    if (map.getField(pos) == "X") walkedFields++;
});
console.log("Walked Fields", walkedFields);


/* A2 */
class DetectLoopGuard extends Guard {
    initialPos;
    initialState;

    constructor(state, pos) {
        super(state, pos);
        this.initialPos = pos;
        this.initialState = state;
    }

    reset() {
        this.state = this.initialState;
        this.pos = {...this.initialPos};
    }

    simulateWalking() {
        while(map.getField(this.pos) !== false) {
            if (map.getField(this.pos).includes(this.state)) return true;
            this.walk();
        }
        return false;
    }

    walk() {
        const newPos = this.getNewPos[this.state](this.pos.y, this.pos.x);
        if (map.getField(newPos) == "#") {
            this.turn();
            return;
        }
        map.setField(this.pos, map.getField(this.pos)+this.state);
        this.pos = newPos;
    }

}

const pathFields = [];
map.loop((pos) =>{
    if (map.getField(pos) == "X") pathFields.push(pos);
    if (pathFields.length == walkedFields) return true;
});
map.reset();

const dlGuard = map.loop((pos)=>{
    if (Guard.states[map.getField(pos)] !== undefined) return new DetectLoopGuard(Guard.states[map.getField(pos)], pos);
});

let loopsDetected = 0;
for (const pos of pathFields) {
    map.setField(pos, "#");
    if (dlGuard.simulateWalking()) loopsDetected++;
    dlGuard.reset();
    map.reset();    
}
console.log("Loops", loopsDetected);


