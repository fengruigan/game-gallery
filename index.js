var express = require('express'),
    app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get('/', (req,res) => {
    res.render('home');
});

app.get('/games', (req,res) => {
    res.sendFile(__dirname + "/views/games/demo.html");
})

app.listen(process.env.PORT || 8000, () => {
    console.log('Server running');
})