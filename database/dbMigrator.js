let db = require('./workDB.json'),
    dbManager = require('./dbManager.js'),
    mongoose = require('mongoose')
    myWork = require('./workSchema.js');

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
var url = "mongodb+srv://fengruigan:gfr1996@cluster0.7wlxm.mongodb.net/indie_gallery?retryWrites=true&w=majority"
mongoose.connect(url).then(function() {
	console.log("Connected to DB");
}).catch(function(err){
	console.log("ERROR:", err.message);
});

// db.works.forEach( (id) => {
//     let og = dbManager.read(id);
//     let work = new Work();
//     for (let attr in work) {
//         if (attr === 'password' && og[attr] === '') {
//             work.password = id
//         } else if (og[attr] !== undefined) {
//             work[attr] = og[attr]
//         }
//     }
//     dbManager.update(id, work)

// });

let workSchema = mongoose.Schema({
    title: String,
    authors: [],
    description: String,
    imgCount: Number,
    category: [],
    event: String,
    download: {
        "link": String,
        "key": String
    },
    sections: [],
    password: String
})

let Work = mongoose.model('Work', workSchema);

let work = new myWork();
console.log(work)