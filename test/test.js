// let path = require('path');
// console.log(path.relative('../public/starcraft/scripts/main.js', '../works/starcraft'))
let uuid = require("uuid").v4,
    fs = require('fs'),
    rimraf = require('rimraf'),
    dbManager = require('../database/dbManager');

let id = uuid()

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

// let path = "./public/e7f86cf1-e768-4659-be49-57711fa559a4/images/"

// let files = fs.readdirSync(path);
// console.log(files.length)

let work = dbManager.read("134a6835-2642-412f-a1d1-22f59b31dbd0")
let authors = work.authors.join();
if (authors !== ""){
    console.log(authors);
} else {
    console.log('作者没有留下名字');
}
