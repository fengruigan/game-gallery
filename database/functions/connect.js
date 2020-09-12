var mongoose = require('mongoose')

function connect(log=true) {
    mongoose.set("useNewUrlParser", true);
        mongoose.set("useFindAndModify", false);
        mongoose.set('useCreateIndex', true);
        mongoose.set('useUnifiedTopology', true);
        var url = "mongodb+srv://fengruigan:gfr1996@cluster0.7wlxm.mongodb.net/indie_gallery?retryWrites=true&w=majority"
        mongoose.connect(url).then(function() {
            if (log) {
                console.log("Connected to DB");
            }
        }).catch(function(err){
            console.log("ERROR:", err.message);
        });
}

module.exports = {connect}