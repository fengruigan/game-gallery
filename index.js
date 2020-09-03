var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    dbManager = require('./database/dbManager'),
    Work = require('./database/workSchema'),
    db = require('./database/workDB.json'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    methodOverride = require('method-override'),
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

app.post('/works', upload.array('image', 10), (req,res,next) => {
    // res.send("creating work");
    // console.log(req.files);
    // console.log(req.body);

    let title = req.body.title;
    let authors = req.body.author
    let description = req.body.description
    let category = req.body.category
    let event = req.body.event;
    let imgCount = req.files.length;
    let download = req.body.download
    let sections = req.body.section
    let password = req.body.password

    let auth = []
    if(typeof(authors.name) === "object") {
        authors.name.forEach( (name, index) => {
            if (name === "") {
                name = '无名'
            }
            if (authors.position[index] === "") {
                position = '全能'
            } else {
                position = authors.position[index]
            }
            auth.push({
                "name": name,
                "position": position
            });
        });
    } else {
        let name = authors.name
        if (name === "") {
            name = '无名'
        }
        if (authors.position === "") {
            position = '全能'
        } else {
            position = authors.position
        }
        auth.push({
            "name": name,
            "position": position
        })
    }

    if (category[1] !== "") {
        category.splice(0,1)
    } else {
        category.splice(1,1)
    }
    if (event[1] !== "") {
        event = event[1]
    } else {
        event = event[0]
    }

    if (download.link === "") {
        download.link = "#";
    }

    let sec = []
    if (sections !== undefined) {
        if(typeof(sections.title) === "object") {
            sections.title.forEach( (title, index) => {
                let content = section.content[index]
                content = sanitize(content);
                if (title === "") {
                    title = "版块标题"
                }
                if (content === "") {
                    content = "版块内容"
                }
                sec.push({
                    "title": title,
                    "content": content
                });
            });
        } else {
            if (sections.title === "") {
                sections.title = "版块标题"
            }
            let content = sections.content
            if (content === "") {
                content = "版块内容"
            }
            content = sanitize(content);
            sec.push({
                "title": sections.title,
                "content": content
            })
        }
    }

    let newWork = new Work(
        title,
        auth,
        description,
        imgCount,
        category,
        event,
        download,
        sec,
        password
    )
    
    dbManager.create(newWork);
    res.redirect('/');
})

app.get('/works/create', (req,res) => {
    let categories = db.categories.list;
    let event = db.event.list
    let options = Object;
    options.categories = categories
    options.event = event
    res.render('works/create', {options: options});
})


app.get('/works/:id', (req,res) => {
    if (req.params.id === "5f8e7712-e877-49a2-89f8-b3a67d180e68") {
        let work = dbManager.read(req.params.id);
        res.render('works/5f8e7712-e877-49a2-89f8-b3a67d180e68', {work: work})
    } else {
        let work = dbManager.read(req.params.id);
        if (work) {
            // res.render("works/" + req.params.id, {work: work});
            // res.send("Going to render ID " + req.params.id);
            res.render('works/show', {work: work})
        }
    }
})

app.get('/works/:id/edit', (req,res) => {
    // res.render('works/edit', {work: work})
    // res.send("此功能还在建设中");
    res.status(200).json({ok:true});
})
app.get('/works/:id/delete', (req,res) => {
    let work = dbManager.read(req.params.id)
    res.render('works/delete', {work: work})
    // res.send("此功能还在建设中")
})

app.delete('/works/:id', (req,res) => {
    res.send("将要删除" + String(req.params.id) + "号作品");
})

app.get('/about', (req,res) => {
    res.render('about');
})

app.listen(process.env.PORT || 8000, () => {
    console.log('Server running');
})


function sanitize(text){
    var sanitized = text.replace("<script>", "");
    sanitized = sanitized.replace("</script>", "");
    return sanitized;
}