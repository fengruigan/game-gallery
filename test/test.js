// let path = require('path')
// console.log(path.relative('../public/starcraft/scripts/main.js', '../works/starcraft'))
let uuid = require("uuid").v4,
    fs = require('fs'),
    rimraf = require('rimraf'),
    dbManager = require('../database/dbManager'),
    workSchema = require('../database/workSchema')

let id = uuid()


let work = new workSchema(
    title = "title",
    authors = ["authors"],
    description = "description",
    imgCount = 1,
    category = ["category"],
    event = "event",
    download = "download",
    sections = ["sections"],
)
console.log(work)

