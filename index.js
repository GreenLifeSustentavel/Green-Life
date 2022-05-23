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

function session(id){
    axios.get(`http://localhost:7000/usuarios/?id=${id}`).then(resp => {

    });
}


var log = false;
var nome = "";
var email = "";
var senha = "";
var image = "ftPerfil.png";

app.get("/", function(req, res){
    var token = req.query.token;
    if(token === undefined){
        res.render("index.ejs", {"nome": nome, "email": email, "senha": senha, "image": image, "token": token});
    } else {
        axios.get(`http://localhost:7000/usuarios/?token=${token}`).then(resp => {
            var dados = resp.data[0];
            console.log("2: ", dados);
            if(dados != undefined){
                res.render("index.ejs", {"nome": dados.nome, "email": dados.email, "senha": dados.senha, "image": dados.image, "token": token});
            } else {
                res.render("index.ejs", {"nome": nome, "email": email, "senha": senha, "image": image, "token": token});
            }
        })
    }
    
});

app.post("/newUser", function(req, res){
    var nwnome = req.body.nome;
    var nwemail = req.body.email;
    var nwsenha = req.body.senha;
    var nwimage = "ftPerfil.png";

    var token = require('crypto')
		.randomBytes(50)
		.toString('hex');

    axios.post('http://localhost:7000/usuarios', {
        nome: nwnome,
        email: nwemail,
        senha: nwsenha,
        image: nwimage,
        token: token
    }).then(resp => {
        console.log(resp.data);
        console.log("==========================================================================================================");
        var token = resp.data.token;
        res.redirect(`/?token=${token}`)
    }).catch(erro => {
        console.log(erro);
        console.log("==========================================================================================================");
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
            var token = resp.data[0].token;
            res.redirect(`/?token=${token}`);
        }
        
    }).catch(erro => {
        console.log("==========================================================================================================");
        console.log(erro);
        console.log("==========================================================================================================");
        nome = "";
        email = "";
        senha = "";
        image = "ftPerfil.png";
        res.send("<html><head></head><body><script>alert(\"Credenciais incorretas\");window.open(document.referrer,'_self')</script></body></html>");
    })
});

app.get("/perfil", function(req, res){
    var token = req.query.token;
    if(token != undefined){
        axios.get(`http://localhost:7000/usuarios/?token=${token}`).then(resp => {
            var dados = resp.data[0];
            console.log("Perfil: ", dados);
            if(dados != undefined){
                res.render("perfil.ejs", {"nome": dados.nome, "email": dados.email, "senha": dados.senha, "image": dados.image, "token": token});
            } else {
                res.send("<html><head></head><body><script>alert(\"Faça login\");window.location.href='/'</script></body></html>");
            }
        });
    } else {
        res.send("<html><head></head><body><script>alert(\"Faça login\");window.location.href='/'</script></body></html>");
    }
});

app.get("/log", function(req, res){
    res.send(log);
});

app.get("/deslog", function(req, res){
    nome = "";
    email = "";
    senha = "";
    image = "ftPerfil.png";
    res.redirect("/");
});

app.post("/delet", function(req, res){
    axios.get(`http://localhost:7000/usuarios/?token=${req.body.token}`).then(resp => {
        var id = resp.data[0].id;
        var imagem = resp.data[0].image;

        fs.unlink(`./public/fts/${imagem}`, (err => {
            if (err) console.log(err);
            else {
              console.log(`\nDeleted file: ${imagem}`);
            }
        }));

        axios.delete(`http://localhost:7000/usuarios/${id}`);
        nome = "";
        email = "";
        senha = "";
        image = "ftPerfil.png";
        res.send("<html><head></head><body><script>alert(\"Perfil apagado\");window.location.href='/'</script></body></html>");
    });
});

app.post("/update", upload.single('ft'), function(req, res){
    axios.get(`http://localhost:7000/usuarios/?token=${req.body.token}`).then(resp => {
        var id = resp.data[0].id;
        console.log(id);
        if(req.file){
            axios.patch(`http://localhost:7000/usuarios/${id}`, {
                nome: req.body.nome,
                email: req.body.email,
                image: req.file.filename
            }).then(resp => {
                
            });
        } else {
            axios.patch(`http://localhost:7000/usuarios/${id}`, {
                nome: req.body.nome,
                email: req.body.email,
                image: image
            }).then(resp => {
            });
        }
    });
    res.send(`<html><head></head><body><script>alert("Alterado");window.location.href="/perfil/?token=${req.body.token}"</script></body></html>`);
});

app.get("/vidaSustentavel", function(req, res){
    var token = req.query.token;
    if(token === undefined){
        res.render("vidaSustentavel.ejs", {"nome": nome, "email": email, "senha": senha, "image": image, "token": token});
    } else {
        axios.get(`http://localhost:7000/usuarios/?token=${token}`).then(resp => {
            var dados = resp.data[0];
            console.log("2: ", dados);
            if(dados != undefined){
                res.render("vidaSustentavel.ejs", {"nome": dados.nome, "email": dados.email, "senha": dados.senha, "image": dados.image, "token": token});
            } else {
                res.render("vidaSustentavel.ejs", {"nome": nome, "email": email, "senha": senha, "image": image, "token": token});
            }
        })
    }
});

app.get("/impactos", function(req, res){
    var token = req.query.token;
    if(token === undefined){
        res.render("impactos.ejs", {"nome": nome, "email": email, "senha": senha, "image": image, "token": token});
    } else {
        axios.get(`http://localhost:7000/usuarios/?token=${token}`).then(resp => {
            var dados = resp.data[0];
            console.log("2: ", dados);
            if(dados != undefined){
                res.render("impactos.ejs", {"nome": dados.nome, "email": dados.email, "senha": dados.senha, "image": dados.image, "token": token});
            } else {
                res.render("impactos.ejs", {"nome": nome, "email": email, "senha": senha, "image": image, "token": token});
            }
        })
    }
});

app.listen(3000);