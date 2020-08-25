let path = require('path');
// console.log(path.relative('../public/starcraft/scripts/main.js', '../works/starcraft'))
let uuid = require("uuid").v4,
    fs = require('fs');

let id = uuid();

fs.mkdir(path.join("./", id, "hello"), (err) => {
    if(err) {
        console.log(err);
    }
})