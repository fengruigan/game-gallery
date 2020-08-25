var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    dbManager = require('./database/dbManager');

// =========
// DB setup
// =========
// mongoose.set("useNewUrlParser", true);
// mongoose.set("useFindAndModify", false);
// mongoose.set('useCreateIndex', true);
// mongoose.set('useUnifiedTopology', true);
// var url = "mongodb+srv://fengruigan:gfr1996@cluster0.7wlxm.mongodb.net/game_gallery?retryWrites=true&w=majority"
// mongoose.connect(url).then(function() {
// 	console.log("Connected to DB");
// }).catch(function(err){
// 	console.log("ERROR:", err.message);
// });




app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public", {dotfiles: 'allow'}));

// app.get('/', (req,res) => {
//     let works = dbManager.readAll();
//     res.render('home', {works: works});
// });

app.get('/', (req,res) => {
    res.sendFile(__dirname + "/views/games/CGJ.html");
})

app.get('/games', (req,res) => {
    res.sendFile(__dirname + "/views/games/CGJ.html");
})

app.listen(process.env.PORT || 8000, () => {
    console.log('Server running');
})