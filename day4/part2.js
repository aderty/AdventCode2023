import fs from 'fs';



async function run() {
    const rows = fs.readFileSync(`day4/input.txt`).toString().split(`\n`);
    let count = 0;
    const cards = [];

    const cardsNum = rows.map(r => 1);
    
    for(const rowIn of rows) {
        const gameIn = rowIn.split(':');
        const id = parseInt(gameIn[0].replace('Card', '').trim(), 10);
        const sets = gameIn[1].split('|');
        const winners = sets[0].split(' ').filter(n => n.length);
        const currents = sets[1].split(' ').filter(n => n.length);

        let points = currents.filter(n => winners.includes(n)).length;
        const card = {
            id,
            points,
            from: points > 0 ? id + 1 : null,
            to: points > 0 ? id + points : null,
        };
        cards.push(card);
        // console.info(rowIn, points, card);
    }

    for(const card of cards) {
        if (card.points > 0) {
            const curNum = cardsNum[card.id - 1];
            for (let i = card.from; i <= card.to; i++) {
                cardsNum[i - 1] += curNum;
              }
        }
    }
    
    console.info(cardsNum.reduce((acc, count) => {
        return acc += count;
    }, 0));
}

run();