var mongoose = require('mongoose')

function connect(log=true) {
    mongoose.set("useNewUrlParser", true);
        mongoose.set("useFindAndModify", false);
        mongoose.set('useCreateIndex', true);
        mongoose.set('useUnifiedTopology', true);
        var url = process.env.DATABASE_URL
        mongoose.connect(url).then(function() {
            if (log) {
                console.log("Connected to DB");
            }
        }).catch(function(err){
            console.log("ERROR:", err.message);
        });
}

module.exports = {connect}