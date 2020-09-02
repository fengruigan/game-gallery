var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    dbManager = require('./database/dbManager'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    fs = require('fs');

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

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./public/uploads");
    },
    filename: function(req, file, callback) {
        let count = fs.readdirSync('./public/uploads').length;
        callback(null, String(count + 1) + ".png");
    }
})

var upload = multer({ storage: storage })


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get('/', (req,res) => {
    let works = dbManager.readAll();
    res.render('home', {works: works});
});

app.post('/works', upload.array('image'), (req,res, next) => {
    // res.send("creating work");
    // console.log(req.files);
    // console.log(req.body);

    let title = req.body.title;
    let authors = req.body.author
    let description = req.body.description
    // let section = {
    //     "title": req.body.section[title],
    //     "content": req.body.section[content]
    // }
    let sections = req.body.section

    let auth = []
    if(typeof(authors.name) === "object") {
        authors.name.forEach( (name, index) => {
            auth.push({
                "name": name,
                "position": authors.position[index]
            });
        });
    } else {
        auth.push({
            "name": authors.name,
            "position": authors.position
        })
    }

    let sec = []
    if(typeof(sections.title) === "object") {
        sections.title.forEach( (title, index) => {
            sec.push({
                "title": title,
                "content": sections.content[index]
            });
        });
    } else {
        sec.push({
            "title": sections.title,
            "content": sections.content
        })
    }


    console.log(title);
    console.log(auth);
    console.log(description);
    console.log(sec);
    res.redirect('/');
})

app.get('/works/create', (req,res) => {
    res.render('works/create');
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