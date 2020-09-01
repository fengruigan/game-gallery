var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    dbManager = require('./database/dbManager'),
    bodyParser = require('body-parser'),
    multer = require('multer');

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

app.get('/', (req,res) => {
    let works = dbManager.readAll();
    res.render('home', {works: works});

});

app.post('/works/', (req,res) => {
    res.send("creating work")
})

app.get('/works/create', (req,res) => {
    res.send("create your work here");
})


app.get('/works/:id', (req,res) => {
    let work = dbManager.read(req.params.id);
    if (work) {
        // res.render("works/" + req.params.id, {work: work});
        // res.send("Going to render ID " + req.params.id);
        res.render('works/show', {work: work})
    }
})

app.get('/about', (req,res) => {
    res.render('about');
})

app.listen(process.env.PORT || 8000, () => {
    console.log('Server running');
})