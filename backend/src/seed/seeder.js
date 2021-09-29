const fsp = require('fs').promises;
const Characters = require('../models/characters.model');

const seedCollection = async (model, fileName) => {
    try {
        const exists = await model.find().count();
        if (!exists) {
            throw new Error();
        }
    } catch (e) {
        const source = await fsp.readFile(
            `./src/seed/${fileName}.json`,
            'utf8'
        );
        const list = JSON.parse(source);
        if (model && model.insertMany) {
            await model.insertMany(list, { limit: 500 });
        }
    }
};

(async () => {

    try {
        await Characters.db.dropCollection('characters');
    } catch (e) {
        console.log('CHARACTERS NOT FOUND');
    }

    seedCollection(Characters, 'characters');

})();