// let path = require('path')
// console.log(path.relative('../public/starcraft/scripts/main.js', '../works/starcraft'))
let uuid = require("uuid").v4,
    fs = require('fs'),
    rimraf = require('rimraf'),
    dbManager = require('../database/dbManager'),
    workSchema = require('../database/workSchema'),
    bodyParser = require('body-parser')




