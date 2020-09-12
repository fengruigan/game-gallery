let db = require('../workDB.json'),
    dbManager = require('../dbManager.js'),
    dbManagerOg = require('../../test/dbManagerOg')
    myWork = require('../models/workSchema.js');

// dbManager.connect.connect()
// db.works.forEach( (id) => {
//     let og = dbManagerOg.read(id);
//     let work = new myWork();
//     for (let attr in work) {
//         if (attr === '_id') {
//             work[attr] = id
//         } else if (og[attr] !== undefined) {
//             work[attr] = og[attr]
//         }
//     }
//     dbManager.create.create(work)
// });

