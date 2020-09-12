const e = require('express');

require('newrelic');

const express = require('express'),
    app = express(),
    dbManager = require('./database/dbManager'),
    Work = require('./database/models/workSchema'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    methodOverride = require('method-override'),
    cloud = require('./cloudControl')
    fs = require('fs');

dbManager.connect.connect();

try {
    cloud.connectCloud()
} catch {
    console.error("Error connecting to cloud")
}

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./public/tmp");
    },
    filename: function(req, file, callback) {
        let count = fs.readdirSync('./public/tmp').length;
        callback(null, String(count + 1) + ".png");
    }
})

var upload = multer({ storage: storage })

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req,res) => {
    dbManager.read.find({}).then( (works) => {
        res.render('home', {works: works});
    });
});

app.get('/success', (req,res) => {
    res.render('success');
});

app.get('/error', (req,res) => {
    res.render('error');
})

app.post('/works', upload.array('image', 10), (req,res) => {
    // res.send("此功能在建设中")

    let title = req.body.title;
    let authors = req.body.author
    let description = req.body.description
    let category = req.body.category
    let event = req.body.event;
    let imgCount = req.files.length;
    let download = req.body.download
    let sections = req.body.section
    let password = req.body.password

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

    let newWork = new Work(
        title,
        authors,
        description,
        imgCount,
        category,
        event,
        download,
        sections,
        password
    )
    
    dbManager.create.create(newWork);
    // if no error
    res.redirect('/success');
})

app.get('/works/create', async (req,res) => {
    // res.send("此功能在建设中")
    let categories = await dbManager.read.listCategories().then( c => {return c});
    let event = await dbManager.read.listEvents().then( e => {return e});
    let options = Object;
    options.categories = categories
    options.event = event
    res.render('works/create', {options: options});
})

app.get('/works/:id', (req,res) => {
    if (req.params.id === "5f8e7712-e877-49a2-89f8-b3a67d180e68") {
        dbManager.read.findById(req.params.id).then( work => {
            res.render('works/5f8e7712-e877-49a2-89f8-b3a67d180e68', {work: work})
        }).catch( err => {
            console.log("ERROR:", err.message)
        });
    } else {
        dbManager.read.findById(req.params.id).then( work => {
            res.render('works/show', {work: work})
        }).catch( err => {
            console.log("ERROR:", err.message)
        });
    }
})

app.get('/works/:id/edit', (req,res) => {
    // res.render('works/edit', {work: work})
    res.send("此功能还在建设中");
})
app.get('/works/:id/delete', (req,res) => {
    dbManager.read.findById(req.params.id).then( work => {
        res.render('works/delete', {work: work})
    }).catch( err => {
        console.log("ERROR:", err.message)
    });
    // res.send("此功能还在建设中")
})

app.delete('/works/:id', (req,res) => {
    dbManager.read.findById(req.params.id).then( work => {
        pw = work.password;
        if (pw) {
            if (req.body.password === pw) {
                dbManager.destroy.deleteId(req.params.id);
                res.redirect('/success');
            } else {
                res.redirect('/error');
            }
        } else {
            res.redirect('/error')
        }
    }).catch( err => {
        console.log("ERROR:", err.message)
    });
})

app.get('/about', (req,res) => {
    res.render('about');
})

app.listen(process.env.PORT || 8000, () => {
    console.log('Server running');
})