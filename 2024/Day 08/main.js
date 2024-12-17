
const fs = require('node:fs');
const input = fs.readFileSync(__dirname+'/input.txt', 'utf8');



class Map {
    map;
    antennas = {};
    antinodes = [];

    constructor(mapString) {
        this.map = mapString.split("\n").map(el=>el.trim().split(""));

        this.detectAntennas();
        this.detectAntinodes();
    }

    detectAntennas() {
        this.loop((pos)=>{
            const field = this.getField(pos);
            if (field == ".") return;

            if (!this.antennas[field]) this.antennas[field] = [];
            this.antennas[field].push(pos);
        });
    }

    
    detectAntinodes() {
        for (const antennas of Object.values(this.antennas)) {
            for (let i = 0; i < antennas.length; i++) {
                this.setAntinodesForAntenna(antennas[i], antennas.toSpliced(i, 1));
            }
        }
    }
    setAntinodesForAntenna(target, antennas) {
        for (const antenna of antennas) {
            const pos = {
                x: antenna.x + (antenna.x - target.x),
                y: antenna.y + (antenna.y - target.y)
            }
            if (!this.isInBounds(pos) || this.antinodeExists(pos)) continue;
            this.antinodes.push(pos);
        }
    }
    antinodeExists(pos) {
        for (const anitnode of this.antinodes) {
            if (anitnode.x == pos.x && anitnode.y == pos.y) return true;
        }
        return false;
    }

    getField(pos) {
        return (this.isInBounds(pos)) ? this.map[pos.y][pos.x] : false;
    }

    loop(callback) {
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                callback({y, x});
            }
        }
    }

    isInBounds(pos) {
        return (pos.y < this.map.length && pos.y >= 0 && pos.x < this.map[0].length && pos.x >= 0);
    }

}

const map = new Map(input);

/* A1 */
console.log("Antinodes", map.antinodes.length);


/* A2 */
class AdvancedMap extends Map {
    constructor(mapString) {
        super(mapString);
    }

    setAntinodesForAntenna(target, antennas) {
        for (const antenna of antennas) {
            const diffX = (antenna.x - target.x);
            const diffY = (antenna.y - target.y);
            
            const pos = {
                x: antenna.x,
                y: antenna.y
            }

            while (this.isInBounds(pos)) {
                if (!this.antinodeExists(pos)) this.antinodes.push({...pos});
                pos.x += diffX;
                pos.y += diffY;
            }

        }

    }

}

const advancedMap = new AdvancedMap(input);

console.log("Advanced Antinodes", advancedMap.antinodes.length);
