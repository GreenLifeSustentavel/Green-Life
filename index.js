var express = require("express");
var app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded());
app.use(express.json());

app.get("/", function(req, res){
    res.render("index.ejs");
});

app.listen(3000);