var express = require("express");
var app = express();

const axios = require("axios");

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded());
app.use(express.json());

app.get("/", function(req, res){
    res.render("index.ejs");
});

app.post("/newUser", function(req, res){
    const nome = req.body.nome;
    const email = req.body.email;
    const senha = req.body.senha;

    axios.post('http://localhost:7000/usuarios', {
        nome: nome,
        email: email,
        senha: senha
    }).then(resp => {
        console.log(resp.data);
        console.log("==========================================================================================================");
    }).catch(erro => {
        console.log(erro);
        console.log("==========================================================================================================");
    });
});

app.get("/vidaSustentavel", function(req, res){
    res.render("vidaSustentavel.ejs");
})

app.listen(3000);