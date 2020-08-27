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
    // res.sendFile(__dirname + "/views/games/CGJ.html");
    let work = dbManager.read("e7f86cf1-e768-4659-be49-57711fa559a4");
    res.render("works/e7f86cf1-e768-4659-be49-57711fa559a4", {work: work});
})


app.get('/works/:id', (req,res) => {
    let work = dbManager.read(req.params.id);
    if (work) {
        res.render("works/" + req.params.id, {work: work});
        // res.send("Going to render ID " + req.params.id);
    }
})


// app.get('/games', (req,res) => {
//     // res.sendFile(__dirname + "/views/games/CGJ.html");
//     res.render("works/e7f86cf1-e768-4659-be49-57711fa559a4")
// })

app.listen(process.env.PORT || 8000, () => {
    console.log('Server running');
})