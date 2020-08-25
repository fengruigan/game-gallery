let path = require('path');
// console.log(path.relative('../public/starcraft/scripts/main.js', '../works/starcraft'))
let uuid = require("uuid").v4,
    fs = require('fs'),
    rimraf = require('rimraf');

let id = uuid();

// fs.mkdirSync("./testing")
// fs.mkdirSync(path.join("./testing", id) , (err) => {
//     if (err) {
//         console.log(err);
//     }
// })
// fs.mkdirSync(path.join("./testing", id, "hello"), (err) => {
//     if(err) {
//         console.log(err);
//     }
// })
// fs.mkdirSync(path.join("./testing", id, "what"), (err) => {
//     if (err) {
//         console.log(err);
//     }
// })

// rimraf.sync(path.join("./28c33d70-6a18-4244-9f35-85e350aa18d2"));
// rimraf(path.join('./testing', ""), () => {
//     console.log("done");
// })

console.log(id !== "")

