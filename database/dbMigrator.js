let db = require('./workDB.json'),
    dbManager = require('./dbManager.js'),
    Work = require('./workSchema.js');


db.works.forEach( (id) => {
    let og = dbManager.read(id);
    let newWork = new Work();
    for (let attr in newWork) {
        if (og[attr] !== undefined) {
            newWork[attr] = og[attr];
        }
    }
    dbManager.update(id, newWork);
});