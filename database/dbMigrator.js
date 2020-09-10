let db = require('./workDB.json'),
    dbManager = require('./dbManager.js'),
    mongoose = require('mongoose')
    myWork = require('./workSchema.js');



// db.works.forEach( (id) => {
//     let og = dbManager.read(id);
//     let work = new Work();
//     for (let attr in work) {
//         if (attr === 'password' && og[attr] === '') {
//             work.password = id
//         } else if (og[attr] !== undefined) {
//             work[attr] = og[attr]
//         }
//     }
//     dbManager.update(id, work)

// });

let workSchema = mongoose.Schema({
    title: String,
    authors: [],
    description: String,
    imgCount: Number,
    category: [],
    event: String,
    download: {
        "link": String,
        "key": String
    },
    sections: [],
    password: String
})

let Work = mongoose.model('Work', workSchema);

let work = new myWork();
console.log(work)