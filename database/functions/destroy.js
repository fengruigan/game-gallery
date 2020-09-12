const   Work = require('../models/workSchemaMongo'),
        path = require('path'),
        rimraf = require('rimraf'),
        cloud = require('../../cloudControl');

function deleteId(id) {
    Work.findById(id, (err, found) => {
        if (err) {
            console.log("ERROR:", err.message);
        } else {
            // ================ delete file on google cloud ================
            for (let i = 1; i <= found.imgCount; i++) {
                cloud.deleteFile('indie-gallery', id + "/images/" + String(i) + ".png")
            }
            // ================ delete directory ================
            if (id !== undefined && id !== ""){
                rimraf(path.join("./public", id), () => {
                    console.log("Directory removed");
                })
            } else {
                console.log("Attempted to remove directory for empty ID! CAREFUL!")
            }
        }
    }).deleteOne( (err) => {
        if (err) {
            console.log("ERROR:", err.message)
        } else {
            console.log(id + " deleted")
        }
    })
}

module.exports = {deleteId}