var db = require('./workDB.json'),
    fs = require('fs'),
    uuid = require('uuid').v4,
    work = require('./workSchema');

class dbManager{
    static create = function(work) {
        // creates a new uuid'ed in the database 
        let id = uuid();
        db[id] = work;
        db.works.push(id);
        fs.writeFile("./database/workDB.json", JSON.stringify(db, null, '\t'), 'utf8', () => {
            console.log(id + " created");
        });
    };
    static readAll = function(identifier="none") {
        switch(identifier) {
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
        // returns the work object
        if (db[id]){
            return db[id];
        } else {
            console.log("ID " + id + " unreadable, ID does not exist");
        };
    };
    static update = function(id, newWork) {
        if (db[id]) {
            db[id] = newWork;
            fs.writeFile("./database/workDB.json", JSON.stringify(db, null, '\t'), 'utf8', () => {
                console.log(id + " updated");
            });
        } else {
            console.log("Update failed, ID " + id + " does not exist");
        };
    };
    static destory = function(id) {
        if (db[id]) {
            delete db[id];
            fs.writeFile("./database/workDB.json", JSON.stringify(db, null, '\t'), 'utf8', () => {
                console.log(id + " deleted");
            });
        } else {
            console.log("ID does not exist");
        };
    };
}


module.exports = dbManager;