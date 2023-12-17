import fs from 'fs';



async function run() {
    const rows = fs.readFileSync(`day4/input.txt`).toString().split(`\n`);
    let count = 0;
    for(const rowIn of rows) {
        const gameIn = rowIn.split(':');
        const id = parseInt(gameIn[0].replace('Card', '').trim(), 10);
        const sets = gameIn[1].split('|');
        const winners = sets[0].split(' ').filter(n => n.length);
        const currents = sets[1].split(' ').filter(n => n.length);

        let points = currents.filter(n => winners.includes(n)).length;
        if (points > 1) {
            // let tmp = points - 1;
            // while(tmp >= 3) {
            //     tmp = tmp - 3;
            //     points = points * 2;
            // }
            // console.info(points, ((points - 1) / 3), Math.floor((points - 1) / 3));
            // const doubled = Math.floor((points - 1) / 3);
            const doubled = (points - 1);
            points = 1;
            for(let i = 0; i < doubled; i++) {
                points = points * 2;
            }
            // console.info(points)
        }
        console.info(rowIn, points)
        count += points;
    }
    console.info(count);
}

run();