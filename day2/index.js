import fs from 'fs';


const MAX = {
    red: 12,
    green: 13,
    blue: 14
}
async function run() {
    const rows = fs.readFileSync(`day2/input.txt`).toString().split(`\n`);
    let count = 0;
    for(const rowIn of rows) {
        const gameIn = rowIn.split(':');
        const id = parseInt(gameIn[0].replace('Game ', ''), 10);
        const sets = gameIn[1].split(';');

        const MIN_GAME = {
            red: 1,
            green: 1,
            blue: 1
        }

        for(const set of sets) {
            const parts = set.trim().split(',');
            for(const part of parts) {
                const val = detect(part.trim());
                if (MIN_GAME[val.type] < val.val) MIN_GAME[val.type] = val.val;
            }
        }

        console.info(id, MIN_GAME)
        count += (MIN_GAME.red * MIN_GAME.green * MIN_GAME.blue);
    }
    console.info(count);
}

async function runPart1() {
    const rows = fs.readFileSync(`day2/input.txt`).toString().split(`\n`);
    let count = 0;
    for(const rowIn of rows) {
        const gameIn = rowIn.split(':');
        const id = parseInt(gameIn[0].replace('Game ', ''), 10);
        const sets = gameIn[1].split(';');

        let isPossible = true;

        for(const set of sets) {
            const parts = set.trim().split(',');
            for(const part of parts) {
                const val = detect(part.trim());
                if (MAX[val.type] < val.val) {
                    isPossible = false;
                }
            }
        }

        // console.info(id, sets)
        if (isPossible) count += id;
    }
    console.info(count);
}

function detect(value) {
    const [val, type] = value.split(' ');
    return {
        val: parseInt(val, 10),
        type
    };
}

run();