var db = require('./workDB.json'),
    fs = require('fs'),
    uuid = require('uuid').v4,
    path = require('path'),
    rimraf = require('rimraf'),
    work = require('./workSchema');

class dbManager{

    static create = function(work) {
        // creates a new uuid'ed in the database 
        let id = uuid();
        db[id] = work;
        // ================ push allWorks array ================
        db.works.push(id);
        // ================ push category array ================
        work.category.forEach( (c) => {
            if (db.categories[c] === undefined) {
                // create category if does not exist
                db.categories[c] = [];
            }
            db.categories[c].push(id);
        });
        // ================ push event array ================
        if (work.event !== undefined) {
            if (db.event[work.event] === undefined) {
                // create event if does not exist
                db.event[work.event] = [];
            }
            db.event[work.event].push(id);
        } else {
            db.event["无"].push(id);
        }
        // ================ save db ================
        fs.writeFile("./database/workDB.json", JSON.stringify(db, null, '\t'), 'utf8', () => {
            console.log(id + " created");
        });
        // ================ create work folder in public ================
        fs.mkdirSync(path.join("./public/", id), (err) => {
            if (err) {
                console.log(err);
            }
        });
        fs.mkdirSync(path.join("./public", id, "images"), (err) => {
            if (err) {
                console.log(err);
            }
        });
        fs.mkdirSync(path.join("./public", id, "stylesheets"), (err) => {
            if (err) {
                console.log(err);
            }
        });
        fs.mkdirSync(path.join("./public", id, "scripts"), (err) => {
            if (err) {
                console.log(err);
            }
        });
        console.log("Directory created")
    }

    static readAll = function(criteria="none") {
        // returns an array of works according to criteria
        switch(criteria) {
            case "none": // return an array objects corresponding to the ids in works
                let arr = [];
                db.works.forEach(id => {
                    arr.push(dbManager.read(id));
                });
                return arr;
                break;
        }
    }

    static read = function(id) {
        // returns the work object corresponding to id in query
        if (db[id]){
            return db[id];
        } else {
            console.log("ID " + id + " unreadable, ID does not exist");
        }
    }

    static update = function(id, newWork) {
        // update the work corresponding to id in query
        if (db[id]) {
            let og = db[id];
            // ================ delete ogID from categoies array ================
            og.category.forEach( (c) => {
                // find db.categories array
                let arr = db.categories[c]
                arr.forEach( (ogID, index) => {
                    if (ogID === id) {
                        arr.splice(index, 1);
                        // break;
                    }
                });
                if (arr.length === 0) {
                    delete db.categories[c];
                }
            });
            // ================ delete ogID from event array ================
            if (og.event !== undefined){
                // find db.event array
                let arr = db.event[og.event]
                arr.forEach( (ogID, index) => {
                    if (ogID === id) {
                        arr.splice(index, 1);
                    }
                    // break;
                });
                if (arr.length === 0) {
                    delete db.event[og.event];
                }
            } else {
                // delete id from db.event["无"] array
                let arr = db.event["无"];
                arr.forEach( (ogID, index) => {
                    if (ogID === id) {
                        arr.splice(index, 1);
                    }
                });
                if (arr.length === 0) {
                    delete db.event["无"];
                }
            }
            // ================ update newWork into db ================
            db[id] = newWork;
            // push category array
            newWork.category.forEach( (c) => {
                db.categories[c].push(id);
            });
            // ================ push event array ================
            db.event[work.event].push(id);
            //  ================ save db ================
            fs.writeFile("./database/workDB.json", JSON.stringify(db, null, '\t'), 'utf8', () => {
                console.log(id + " updated");
            });
        } else {
            console.log("Update failed, ID " + id + " does not exist");
        }
    }

    static destory = function(id) {
        // delete the work corresponding to id in query
        if (db[id]) {
            // ================ delete id from works array ================
            db.works.forEach( (ID, index) => {
                if (ID === id) {
                    db.works.splice(index, 1);
                    // break;
                }
            });
            // ================ delete id from categories array ================
            db[id].category.forEach( (c) => {
                // find db.categories array
                let arr = db.categories[c]
                arr.forEach( (ID, index) => {
                    if (ID === id) {
                        arr.splice(index, 1);
                        // break;
                    }
                });
                if (arr.length === 0) {
                    delete db.categories[c];
                }
            });
            // ================ delete id from event array ================
            // find db.event array
            if (db[id].event !== undefined){
                let arr = db.event[db[id].event]
                arr.forEach( (ID, index) => {
                    if (ID === id) {
                        arr.splice(index, 1);
                    }
                    // break;
                });
                if (arr.length === 0) {
                    delete db.event[db[id].event];
                }
            } else {
                // delete id from db.event["无"] array
                let arr = db.event["无"]
                arr.forEach( (ID, index) => {
                    if (ID === id) {
                        arr.splice(index, 1);
                    }
                });
                if (arr.length === 0) {
                    delete db.event["无"];
                }
            }
            // ================ delete work object from db ================
            delete db[id];
            // ================ save db ================
            fs.writeFile("./database/workDB.json", JSON.stringify(db, null, '\t'), 'utf8', () => {
                console.log(id + " deleted");
            });
            // ================ delete directory ================
            if (id !== ""){
                rimraf(path.join("./public", id), () => {
                    console.log("Directory removed");
                })
            } else {
                console.log("ID is empty! CAREFUL!")
            }
        } else {
            console.log("ID does not exist");
        }
    }
}


module.exports = dbManager;