const chokidar = require('chokidar');
const { exec } = require('child_process');                      // ezzel tudunk parancsot futtatni nodeJS-ben

let run = false;
chokidar.watch('./src').on('all', (event, path) => {            // csak az src-ben figyel, de mindent
    if (run) {
        exec('docker restart webstarwars-api-felveteli', (e, s) => {
            if (e) {
                return console.error(e);
            }
            console.log(`Watcher: `, s);
        })
    }
});
setTimeout(() => {
    run = true;
}, 15000);