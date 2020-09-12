const fs = require('fs'),
    uuid = require('uuid').v4,
    path = require('path'),
    Work = require('../models/workSchemaMongo')
    cloud = require('../../cloudControl')

function create(work) {
        // creates a new uuid'ed in the database 
        let id = uuid();
        work._id = id;
        if (work.password === "") {
            work.password = id;
        }
        Work.create(work, (err, created) => {
            if (err) {
                console.log('ERROR:', err.message)
            } else {
                console.log('New work of id ' + id + ' created')
            }
        })

        // ================ create work folder in public ================
        fs.mkdirSync(path.join("./public/", id), (err) => {
            if (err) {
                console.log('ERROR:', err.message);
            }
        });
        fs.mkdirSync(path.join("./public", id, "images"), (err) => {
            if (err) {
                console.log('ERROR:', err.message);
            }
        });
        // fs.mkdirSync(path.join("./public", id, "stylesheets"), (err) => {
        //     if (err) {
        //         console.log(err);
        //     }
        // });
        // fs.mkdirSync(path.join("./public", id, "scripts"), (err) => {
        //     if (err) {
        //         console.log(err);
        //     }
        // });
        console.log("Directory created")
        // ================ move image files into work folder in public ================
        for (let i = 1; i <= work.imgCount; i++) {
            fs.renameSync('./public/tmp/' + i + '.png', './public/' + id + '/images/' + i + '.png');
        }
        // ================ upload file to google cloud ================
        if (work.imgCount != 0) {
            cloud.uploadDirectory('indie-gallery', './public/' + id)
        }
}

module.exports = {create}