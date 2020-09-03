let db = require('./workDB.json'),
    dbManager = require('./dbManager.js'),
    Work = require('./workSchema.js');


db.works.forEach( (id) => {
    let og = dbManager.read(id);
    let newWork = new Work();
    for (let attr in newWork) {
        if (attr === "download"){
            continue;
        }
        if (og[attr] !== undefined) {
            newWork[attr] = og[attr];
        }
    }

    // console.log(newWork);
    dbManager.update(id, newWork);
});

// db.works.forEach( (id) => {
//     let og = dbManager.read(id);
//     let newWork = new Work();
//     for (let attr in newWork) {
//         if (og[attr] !== undefined) {
//             newWork[attr] = og[attr];
//         }
//     }
//     // console.log(newWork.authors);
//     let newAuth = []
//     newWork.authors.forEach( (author) => {
//         newAuth.push({
//             "name": author,
//             "position": "全能"
//         })
//     })
//     newWork.authors = newAuth;
//     // console.log(newWork.authors);
//     dbManager.update(id, newWork);
// });