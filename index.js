//////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Green Life

//Site original desenvolvido para apresentação da Atividade Prática Supervisionada (APS) da universidade Unip Alphaville, localizada em São Paulo, no primeiro semestre do curso de Sistemas de Informação com orientação da professora Sandra e professor Henry, na matéria de Programação Web Responsiva.

//Não nos responsabilizamos por qualquer uso indevido de trechos de código retirados do projeto.

//////////////////////////////////////////////////////////////////////////////////////////////////////////////





//REQUERIMENTO E CONFIGURAÇÃO DAS BIBLIOTECAS E MODULOS UTILIZADOS NO BACKEND

var express = require("express");
var app = express();

const axios = require("axios");

var fs = require("fs");

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded());
app.use(express.json());

var multer = require("multer");





//FUNÇÃO MULTER PARA MOVER O ARQUIVO RECEBIDO PARA A PASTA DESTINADA

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




//VARIÁVEIS GLOBAIS UTILIZADAS NO BACKEND

const upload = multer({ storage });

var nome = "";
var email = "";
var senha = "";
var image = "ftPerfil.png";





//RENDERIZAÇÃO DA PAGINA INDEX

app.get("/", function(req, res){
    var token = req.query.token;
    if(token === undefined){
        res.render("index.ejs", {"nome": nome, "email": email, "senha": senha, "image": image, "token": token});
    } else if(token === "e1aa28844ce0b036eb2a31htrgrrgroglmvbrçlgmǵma02cb2223c34048b2b48ac20480a253f82167aa3d31142cbb9932a09dd5248"){
        res.render("index.ejs", {"nome": "adm", "email": "adm@root.com", "senha": "root@root", "image": image, "token": token});
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






//LOGIN/CADASTRO E PROCESSAMENTOS RELACIONADOS AO PERFIL

app.post("/newUser", function(req, res){
    var nwnome = req.body.nome;
    var nwemail = req.body.email;
    var nwsenha = req.body.senha;
    var nwimage = "ftPerfil.png";

    var token = require('crypto')
		.randomBytes(50)
		.toString('hex');

    axios.get(`http://localhost:7000/usuarios/?email=${nwemail}`).then(resp => {
        if(resp.data[0] === undefined){
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
                console.log("Erro ao criar o cadastro de algum usuario", erro);
                console.log("==========================================================================================================");
            });
        } else {
            res.send("<html><head></head><body><script>alert(\"Email informado já existe no banco de dados\");window.open(document.referrer,'_self')</script></body></html>");
        }
    }).catch(erro => {
        console.log("Deu erro ao buscar o usuario pedido no cadastro ", erro);
    });
});

app.post("/login", function(req, res){
    var emailLogin = req.body.email;
    var senhaLogin = req.body.senha;

    if(emailLogin === "adm@root.com" && senhaLogin === "root@root"){
        res.redirect("/adm/?token=e1aa28844ce0b036eb2a31htrgrrgroglmvbrçlgmǵma02cb2223c34048b2b48ac20480a253f82167aa3d31142cbb9932a09dd5248");
    } else {
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
    }

});

app.get("/adm", function(req, res){
    token = req.query.token;
    if(token === "e1aa28844ce0b036eb2a31htrgrrgroglmvbrçlgmǵma02cb2223c34048b2b48ac20480a253f82167aa3d31142cbb9932a09dd5248"){
        axios.get("http://localhost:7000/usuarios").then(resp => {
            var dados = resp.data;
            console.log(dados);
            res.render("adm.ejs", {"dados": dados, "nome": "adm", "email": email, "senha": senha, "image": image, "token": token});
        })
    }
})

app.get("/perfil", function(req, res){
    var token = req.query.token;
    if(token === "e1aa28844ce0b036eb2a31htrgrrgroglmvbrçlgmǵma02cb2223c34048b2b48ac20480a253f82167aa3d31142cbb9932a09dd5248"){
        res.redirect("/adm/?token=e1aa28844ce0b036eb2a31htrgrrgroglmvbrçlgmǵma02cb2223c34048b2b48ac20480a253f82167aa3d31142cbb9932a09dd5248");
    } else if(token != undefined){
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

app.get("/deslog", function(req, res){
    nome = "";
    email = "";
    senha = "";
    image = "ftPerfil.png";
    res.redirect("/");
});

app.post("/delet", function(req, res){
    if(req.body.adm === "e1aa28844ce0b036eb2a31htrgrrgroglmvbrçlgmǵma02cb2223c34048b2b48ac20480a253f82167aa3d31142cbb9932a09dd5248"){
        axios.get(`http://localhost:7000/usuarios/?token=${req.body.token}`).then(resp => {
            var id = resp.data[0].id;
            var imagem = resp.data[0].image;

            if(imagem === "ftPerfil.png"){

            } else {
                fs.unlink(`./public/fts/${imagem}`, (err => {
                    if (err) console.log(err);
                    else {
                    console.log(`\nDeleted file: ${imagem}`);
                    }
                }));
            }

            

            axios.delete(`http://localhost:7000/usuarios/${id}`);
            nome = "";
            email = "";
            senha = "";
            image = "ftPerfil.png";
            res.send("<html><head></head><body><script>alert(\"Perfil apagado\");window.location.href='/adm/?token=e1aa28844ce0b036eb2a31htrgrrgroglmvbrçlgmǵma02cb2223c34048b2b48ac20480a253f82167aa3d31142cbb9932a09dd5248'</script></body></html>");
        });
    } else {
        axios.get(`http://localhost:7000/usuarios/?token=${req.body.token}`).then(resp => {
            var id = resp.data[0].id;
            var imagem = resp.data[0].image;

            if(imagem === "ftPerfil.png"){

            } else {
                fs.unlink(`./public/fts/${imagem}`, (err => {
                    if (err) console.log(err);
                    else {
                    console.log(`\nDeleted file: ${imagem}`);
                    }
                }));
            }

            axios.delete(`http://localhost:7000/usuarios/${id}`);
            nome = "";
            email = "";
            senha = "";
            image = "ftPerfil.png";
            res.send("<html><head></head><body><script>alert(\"Perfil apagado\");window.location.href='/'</script></body></html>");
        });
    }
    
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
            }).then(respo => {
                
            });
        } else {
            axios.patch(`http://localhost:7000/usuarios/${id}`, {
                nome: req.body.nome,
                email: req.body.email,
                image: resp.data[0].image
            }).then(respo => {
            });
        }
    });
    res.send(`<html><head></head><body><script>alert("Alterado");window.location.href="/perfil/?token=${req.body.token}"</script></body></html>`);
});

app.get("/cadmob", function(req, res){
    var token = req.query.token;
    if(token === undefined){
        res.render("cad-log.ejs", {"nome": nome, "email": email, "senha": senha, "image": image, "token": token});
    } else if(token === "e1aa28844ce0b036eb2a31htrgrrgroglmvbrçlgmǵma02cb2223c34048b2b48ac20480a253f82167aa3d31142cbb9932a09dd5248"){
        res.render("cad-log.ejs", {"nome": "adm", "email": "adm@root.com", "senha": "root@root", "image": image, "token": token});
    } else {
        axios.get(`http://localhost:7000/usuarios/?token=${token}`).then(resp => {
            var dados = resp.data[0];
            console.log("2: ", dados);
            if(dados != undefined){
                res.render("cad-log.ejs", {"nome": dados.nome, "email": dados.email, "senha": dados.senha, "image": dados.image, "token": token});
            } else {
                res.render("cad-log.ejs", {"nome": nome, "email": email, "senha": senha, "image": image, "token": token});
            }
        })
    }
});





//ROTEAMENTO PARA PAGINAS DO SITE

app.get("/vidaSustentavel", function(req, res){
    var token = req.query.token;
    if(token === undefined){
        res.render("vidaSustentavel.ejs", {"nome": nome, "email": email, "senha": senha, "image": image, "token": token});
    } else if(token === "e1aa28844ce0b036eb2a31htrgrrgroglmvbrçlgmǵma02cb2223c34048b2b48ac20480a253f82167aa3d31142cbb9932a09dd5248"){
        res.render("vidaSustentavel.ejs", {"nome": "adm", "email": "adm@root.com", "senha": "root@root", "image": image, "token": token});
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
    } else if(token === "e1aa28844ce0b036eb2a31htrgrrgroglmvbrçlgmǵma02cb2223c34048b2b48ac20480a253f82167aa3d31142cbb9932a09dd5248"){
        res.render("impactos.ejs", {"nome": "adm", "email": "adm@root.com", "senha": "root@root", "image": image, "token": token});
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

app.get("/sustentabilidade", function(req, res){
    var token = req.query.token;
    if(token === undefined){
        res.render("sustentabilidade.ejs", {"nome": nome, "email": email, "senha": senha, "image": image, "token": token});
    } else if(token === "e1aa28844ce0b036eb2a31htrgrrgroglmvbrçlgmǵma02cb2223c34048b2b48ac20480a253f82167aa3d31142cbb9932a09dd5248"){
        res.render("sustentabilidade.ejs", {"nome": "adm", "email": "adm@root.com", "senha": "root@root", "image": image, "token": token});
    } else {
        axios.get(`http://localhost:7000/usuarios/?token=${token}`).then(resp => {
            var dados = resp.data[0];
            console.log("2: ", dados);
            if(dados != undefined){
                res.render("sustentabilidade.ejs", {"nome": dados.nome, "email": dados.email, "senha": dados.senha, "image": dados.image, "token": token});
            } else {
                res.render("sustentabilidade.ejs", {"nome": nome, "email": email, "senha": senha, "image": image, "token": token});
            }
        })
    }
});

app.get("/ds", function(req, res){
    var token = req.query.token;
    if(token === undefined){
        res.render("dsSustentavel.ejs", {"nome": nome, "email": email, "senha": senha, "image": image, "token": token});
    } else if(token === "e1aa28844ce0b036eb2a31htrgrrgroglmvbrçlgmǵma02cb2223c34048b2b48ac20480a253f82167aa3d31142cbb9932a09dd5248"){
        res.render("dsSustentavel.ejs", {"nome": "adm", "email": "adm@root.com", "senha": "root@root", "image": image, "token": token});
    } else {
        axios.get(`http://localhost:7000/usuarios/?token=${token}`).then(resp => {
            var dados = resp.data[0];
            console.log("2: ", dados);
            if(dados != undefined){
                res.render("dsSustentavel.ejs", {"nome": dados.nome, "email": dados.email, "senha": dados.senha, "image": dados.image, "token": token});
            } else {
                res.render("dsSustentavel.ejs", {"nome": nome, "email": email, "senha": senha, "image": image, "token": token});
            }
        })
    }
});

app.get("/TIverde", function(req, res){
    var token = req.query.token;
    if(token === undefined){
        res.render("TIverde.ejs", {"nome": nome, "email": email, "senha": senha, "image": image, "token": token});
    } else if(token === "e1aa28844ce0b036eb2a31htrgrrgroglmvbrçlgmǵma02cb2223c34048b2b48ac20480a253f82167aa3d31142cbb9932a09dd5248"){
        res.render("TIverde.ejs", {"nome": "adm", "email": "adm@root.com", "senha": "root@root", "image": image, "token": token});
    } else {
        axios.get(`http://localhost:7000/usuarios/?token=${token}`).then(resp => {
            var dados = resp.data[0];
            console.log("2: ", dados);
            if(dados != undefined){
                res.render("TIverde.ejs", {"nome": dados.nome, "email": dados.email, "senha": dados.senha, "image": dados.image, "token": token});
            } else {
                res.render("TIverde.ejs", {"nome": nome, "email": email, "senha": senha, "image": image, "token": token});
            }
        })
    }
});

app.get("/qs", function(req, res){
    var token = req.query.token;
    if(token === undefined){
        res.render("quemSomos.ejs", {"nome": nome, "email": email, "senha": senha, "image": image, "token": token});
    } else if(token === "e1aa28844ce0b036eb2a31htrgrrgroglmvbrçlgmǵma02cb2223c34048b2b48ac20480a253f82167aa3d31142cbb9932a09dd5248"){
        res.render("quemSomos.ejs", {"nome": "adm", "email": "adm@root.com", "senha": "root@root", "image": image, "token": token});
    } else {
        axios.get(`http://localhost:7000/usuarios/?token=${token}`).then(resp => {
            var dados = resp.data[0];
            console.log("2: ", dados);
            if(dados != undefined){
                res.render("quemSomos.ejs", {"nome": dados.nome, "email": dados.email, "senha": dados.senha, "image": dados.image, "token": token});
            } else {
                res.render("quemSomos.ejs", {"nome": nome, "email": email, "senha": senha, "image": image, "token": token});
            }
        })
    }
});



//BARRA DE PESQUISA


app.get("/query", function(req, res){
    var q = req.query.q;
    var token = req.query.token;
    axios.get(`http://localhost:5000/pesquisas?titulo_like=${q}`).then(resp_tit => {
        
        if(resp_tit.data[0] === undefined){

            axios.get(`http://localhost:5000/pesquisas?conteudo_like=${q}`).then(resp_con => {

                if(resp_con.data[0] === undefined){

                    res.send(`<html><head></head><body><script>alert("Não há correspondências para sua pesquisa");window.location.href="/?token=${token}"</script></body></html>`);
                } else {

                    for(let i = 0; i < resp_con.data.length; i++){
                        resp_con.data[i].conteudo = resp_con.data[i].conteudo.substring(0, 200).concat('...');
                    }

                    if(token === undefined){

                        res.render("querys.ejs", {"nome": nome, "email": email, "senha": senha, "image": image, "token": token, "dados": resp_con.data});
                    } else if(token === "e1aa28844ce0b036eb2a31htrgrrgroglmvbrçlgmǵma02cb2223c34048b2b48ac20480a253f82167aa3d31142cbb9932a09dd5248"){

                        res.render("querys.ejs", {"nome": "adm", "email": "adm@root.com", "senha": "root@root", "image": image, "token": token, "dados": resp_con.data});
                    } else {
                        
                        axios.get(`http://localhost:7000/usuarios/?token=${token}`).then(resp => {
                            var dados = resp.data[0];
                            console.log("2: ", dados);
                            if(dados != undefined){
                                res.render("querys.ejs", {"nome": dados.nome, "email": dados.email, "senha": dados.senha, "image": dados.image, "token": token, "dados": resp_con.data});
                            } else {
                                res.render("querys.ejs", {"nome": nome, "email": email, "senha": senha, "image": image, "token": token, "dados": resp_con.data});
                            }
                        })
                    }
                }
            
            });

        } else {

            console.log(resp_tit.data);

            axios.get(`http://localhost:5000/pesquisas?conteudo_like=${q}`).then(resp_con => {

                if(resp_con.data[0] === undefined){

                    for(let i = 0; i < resp_tit.data.length; i++){
                        resp_tit.data[i].conteudo = resp_tit.data[i].conteudo.substring(0, 200).concat('...');
                    }

                    if(token === undefined){

                        res.render("querys.ejs", {"nome": nome, "email": email, "senha": senha, "image": image, "token": token, "dados": resp_tit.data});
                    } else if(token === "e1aa28844ce0b036eb2a31htrgrrgroglmvbrçlgmǵma02cb2223c34048b2b48ac20480a253f82167aa3d31142cbb9932a09dd5248"){

                        res.render("querys.ejs", {"nome": "adm", "email": "adm@root.com", "senha": "root@root", "image": image, "token": token, "dados": resp_tit.data});
                    } else {
                        
                        axios.get(`http://localhost:7000/usuarios/?token=${token}`).then(resp => {
                            var dados = resp.data[0];
                            console.log("2: ", dados);
                            if(dados != undefined){
                                res.render("querys.ejs", {"nome": dados.nome, "email": dados.email, "senha": dados.senha, "image": dados.image, "token": token, "dados": resp_tit.data});
                            } else {
                                res.render("querys.ejs", {"nome": nome, "email": email, "senha": senha, "image": image, "token": token, "dados": resp_tit.data});
                            }
                        })
                    }
                } else {

                    titulo = resp_tit.data;
                    conteudo = resp_con.data;

                    for(let i = 0; i < titulo.length; i++){
                        conteudo.push(titulo[i]);
                    }
                    var final = [];

                    conteudo.forEach((item) => {
                        var duplicado  = final.findIndex(redItem => {
                            return item.id == redItem.id;
                        }) > -1;

                        if(!duplicado) {
                            final.push(item);
                        }
                    });

                    for(let i = 0; i < final.length; i++){
                        final[i].conteudo = final[i].conteudo.substring(0, 200).concat('...');
                    }

                    if(token === undefined){

                        res.render("querys.ejs", {"nome": nome, "email": email, "senha": senha, "image": image, "token": token, "dados": final});
                    } else if(token === "e1aa28844ce0b036eb2a31htrgrrgroglmvbrçlgmǵma02cb2223c34048b2b48ac20480a253f82167aa3d31142cbb9932a09dd5248"){

                        res.render("querys.ejs", {"nome": "adm", "email": "adm@root.com", "senha": "root@root", "image": image, "token": token, "dados": final});
                    } else {
                        
                        axios.get(`http://localhost:7000/usuarios/?token=${token}`).then(resp => {
                            var dados = resp.data[0];
                            console.log("2: ", dados);
                            if(dados != undefined){
                                res.render("querys.ejs", {"nome": dados.nome, "email": dados.email, "senha": dados.senha, "image": dados.image, "token": token, "dados": final});
                            } else {
                                res.render("querys.ejs", {"nome": nome, "email": email, "senha": senha, "image": image, "token": token, "dados": final});
                            }
                        })
                    }
                }
            
            });
        }
        
    });
});





//CONFIGURAÇÃO DA PORTA EXPRESS A SER MONITORADA

app.listen(3000);