var db = require('./workDB.json'),
    fs = require('fs'),
    uuid = require('uuid').v4,
    work = require('./workSchema');

class dbManager{
    static create = function(work) {
        // creates a new uuid'ed in the database 
        let id = uuid();
        db[id] = work;
        fs.writeFile("./database/workDB.json", JSON.stringify(db, null, '\t'), 'utf8', () => {
            console.log(id + " created");
        });
    };
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

// dbManager.create(new work());
var r = dbManager.read("f0c0de2c-59c7-453a-bab8-6ee214b51710");

module.exports = dbManager;