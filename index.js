var express = require("express");
var app = express();

const axios = require("axios");

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded());
app.use(express.json());

var log = false;
var nome = "";
var email = "";
var senha = "";

app.get("/", function(req, res){
    res.render("index.ejs");
});

app.post("/newUser", function(req, res){
    nome = req.body.nome;
    email = req.body.email;
    senha = req.body.senha;

    axios.post('http://localhost:7000/usuarios', {
        nome: nome,
        email: email,
        senha: senha
    }).then(resp => {
        console.log(resp.data);
        console.log("==========================================================================================================");
        log = true;
        res.redirect("/");
    }).catch(erro => {
        console.log(erro);
        console.log("==========================================================================================================");
        nome = "";
        email = "";
        senha = "";
    });
});

app.post("/login", function(req, res){
    var emailLogin = req.body.email;
    var senhaLogin = req.body.senha;

    axios.get(`http://localhost:7000/usuarios/?email=${emailLogin}&senha=${senhaLogin}`).then(resp => {
        if(resp.data === undefined){
            
        } else {
            console.log(resp.data[0]);
            console.log("==========================================================================================================");
            log = true;
            nome = resp.data[0].nome;
            email = resp.data[0].email;
            senha = resp.data[0].senha;
            res.redirect("/");
        }
        
    }).catch(erro => {
        console.log("==========================================================================================================");
        console.log(erro);
        console.log("==========================================================================================================");
        log = false;
        nome = "";
        email = "";
        senha = "";
        res.send("<html><head></head><body><script>alert(\"credenciais incorretas\");window.open(document.referrer,'_self')</script></body></html>");
    })
});

app.get("/perfil", function(req, res){
    res.render("perfil.ejs");
});

app.get("/log", function(req, res){
    res.send(log);
});

app.get("/deslog", function(req, res){
    log = false;
    res.redirect("/");
})

app.get("/vidaSustentavel", function(req, res){
    res.render("vidaSustentavel.ejs");
})

app.listen(3000);