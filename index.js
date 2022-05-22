var express = require("express");
var app = express();

const axios = require("axios");

var fs = require("fs");

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded());
app.use(express.json());

var multer = require("multer");

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/fts')
	},
	filename: function (req, file, cb) {
		// Extração da extensão do arquivo original:
		const extensaoArquivo = file.originalname.split('.')[1];

		// Cria um código randômico que será o nome do arquivo
		const novoNomeArquivo = require('crypto')
		.randomBytes(10)
		.toString('hex');

		// Indica o novo nome do arquivo:
		cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
	}
});

const upload = multer({ storage });




var log = false;
var nome = "";
var email = "";
var senha = "";
var image = "ftPerfil.png";

app.get("/", function(req, res){
    res.render("index.ejs", {"log": log, "nome": nome, "email": email, "senha": senha, "image": image});
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
        image = "ftPerfil.png";
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
            image = resp.data[0].image;
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
        image = "ftPerfil.png";
        res.send("<html><head></head><body><script>alert(\"Credenciais incorretas\");window.open(document.referrer,'_self')</script></body></html>");
    })
});

app.get("/perfil", function(req, res){
    if(log === true){
        res.render("perfil.ejs", {"log": log, "nome": nome, "email": email, "senha": senha, "image": image});
    } else {
        res.send("<html><head></head><body><script>alert(\"Faça login\");window.location.href='/'</script></body></html>");
    }
    
});

app.get("/log", function(req, res){
    res.send(log);
});

app.get("/deslog", function(req, res){
    log = false;
    nome = "";
    email = "";
    senha = "";
    image = "ftPerfil.png";
    res.redirect("/");
});

app.post("/delet", function(req, res){
    axios.get(`http://localhost:7000/usuarios/?email=${req.body.email}`).then(resp => {
        var id = resp.data[0].id;
        var imagem = resp.data[0].image;

        fs.unlink(`./public/fts/${imagem}`, (err => {
            if (err) console.log(err);
            else {
              console.log(`\nDeleted file: ${imagem}`);
            }
        }));

        axios.delete(`http://localhost:7000/usuarios/${id}`);
        log = false;
        nome = "";
        email = "";
        senha = "";
        image = "ftPerfil.png";
        res.send("<html><head></head><body><script>alert(\"Perfil apagado\");window.location.href='/'</script></body></html>");
    });
});

app.post("/update", upload.single('ft'), function(req, res){
    axios.get(`http://localhost:7000/usuarios/?email=${email}`).then(resp => {
        var id = resp.data[0].id;
        console.log(id);
        if(req.file){
            axios.patch(`http://localhost:7000/usuarios/${id}`, {
                nome: req.body.nome,
                email: req.body.email,
                image: req.file.filename
            }).then(resp => {
                nome = resp.data.nome;
                email = resp.data.email;
                senha = resp.data.senha;
                image = resp.data.image;
            });
        } else {
            axios.patch(`http://localhost:7000/usuarios/${id}`, {
                nome: req.body.nome,
                email: req.body.email,
                image: image
            }).then(resp => {
                nome = resp.data.nome;
                email = resp.data.email;
                senha = resp.data.senha;
                image = resp.data.image;
            });
        }
    });
    res.send("<html><head></head><body><script>alert(\"Alterado\");window.location.href='/perfil'</script></body></html>");
});

app.get("/vidaSustentavel", function(req, res){
    res.render("vidaSustentavel.ejs", {"log": log, "nome": nome, "email": email, "senha": senha, "image": image});
});

app.get("/impactos", function(req, res){
    res.render("impactos.ejs", {"log": log, "nome": nome, "email": email, "senha": senha, "image": image});
});

app.listen(3000);