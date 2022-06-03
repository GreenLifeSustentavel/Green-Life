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

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "greenlifesustentavel@gmail.com",
        pass: "Senha do Email"
    }
  });

const mailchimp = require("@mailchimp/mailchimp_marketing")
mailchimp.setConfig({ 
    apiKey: "tokenDoMailchimp-us10", 
    server: "us10", 
})

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded());
app.use(express.json());

var multer = require("multer");





//EMAIL DE BOAS VINDAS

const bemVindo = `<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head>
<!--[if gte mso 15]>
<xml>
<o:OfficeDocumentSettings>
<o:AllowPNG/>
<o:PixelsPerInch>96</o:PixelsPerInch>
</o:OfficeDocumentSettings>
</xml>
<![endif]-->
<meta charset="UTF-8"/>
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>*|MC:SUBJECT|*</title>
<style> img{-ms-interpolation-mode:bicubic;} table, td{mso-table-lspace:0pt; mso-table-rspace:0pt;} .mceStandardButton, .mceStandardButton td, .mceStandardButton td a{mso-hide:all !important;} p, a, li, td, blockquote{mso-line-height-rule:exactly;} p, a, li, td, body, table, blockquote{-ms-text-size-adjust:100%; -webkit-text-size-adjust:100%;} @media only screen and (max-width: 480px){ body, table, td, p, a, li, blockquote{-webkit-text-size-adjust:none !important;} } .mcnPreviewText{display: none !important;} .bodyCell{margin:0 auto; padding:0; width:100%;} .ExternalClass, .ExternalClass p, .ExternalClass td, .ExternalClass div, .ExternalClass span, .ExternalClass font{line-height:100%;} .ReadMsgBody{width:100%;} .ExternalClass{width:100%;} a[x-apple-data-detectors]{color:inherit !important; text-decoration:none !important; font-size:inherit !important; font-family:inherit !important; font-weight:inherit !important; line-height:inherit !important;} body { height: 100%; margin: 0px; padding: 0px; width: 100%; background: rgb(255, 255, 255); }p { margin: 0px; padding: 0px; }table { border-collapse: collapse; }td, p, a { word-break: break-word; }h1, h2, h3, h4, h5, h6 { display: block; margin: 0px; padding: 0px; }img, a img { border: 0px; height: auto; outline: none; text-decoration: none; }@media only screen and (max-width: 480px) {body { width: 100% !important; min-width: 100% !important; }colgroup { display: none; }img { height: auto !important; }.mceColumn { display: block !important; width: 100% !important; }.mceSpacing-24 { padding-right: 12px !important; padding-left: 12px !important; }.mceText, .mceText p { font-size: 16px !important; line-height: 150% !important; }h1 { font-size: 36px !important; line-height: 125% !important; }}@media only screen and (max-width: 640px) {.mceClusterLayout td { padding: 4px !important; }} body { background-color: rgb(255, 255, 255); }.mceText h1, .mceText h2, .mceText h3, .mceText h4 { font-family: "Helvetica Neue", Helvetica, Arial, Verdana, sans-serif; }.mceText, .mceLabel { font-family: "Helvetica Neue", Helvetica, Arial, Verdana, sans-serif; }.mceText h1, .mceText h2, .mceText h3, .mceText h4 { color: rgb(0, 0, 0); }.mceText, .mceLabel { color: rgb(0, 0, 0); }.mceText a { color: rgb(0, 0, 0); }.mceSpacing-24 h1 { margin-bottom: 24px; }.mceSpacing-24 .last-child { margin-bottom: 0px; }.mceSpacing-24 .last-child { margin-bottom: 0px; }.mceSpacing-24 .last-child { margin-bottom: 0px; }.mceSpacing-24 .last-child { margin-bottom: 0px; }.mceSpacing-24 p { margin-bottom: 24px; }.mceSpacing-24 p:last-child { margin-bottom: 0px; }.mceSpacing-24 .last-child { margin-bottom: 0px; }.mceSpacing-24 .last-child { margin-bottom: 0px; }.mceSpacing-24 .last-child { margin-bottom: 0px; }.mceSpacing-24 label { margin-bottom: 24px; }.mceSpacing-24 input { margin-bottom: 24px; }.mceSpacing-24 .last-child { margin-bottom: 0px; }.mceSpacing-24 .mceInput + .mceErrorMessage { margin-top: -12px; }.mceSpacing-12 label { margin-bottom: 12px; }.mceSpacing-12 input { margin-bottom: 12px; }.mceSpacing-12 .mceInput + .mceErrorMessage { margin-top: -6px; }.mceSpacing-48 label { margin-bottom: 48px; }.mceSpacing-48 input { margin-bottom: 48px; }.mceSpacing-48 .mceInput + .mceErrorMessage { margin-top: -24px; }.mceInput { background-color: transparent; border: 2px solid rgb(208, 208, 208); width: 60%; color: rgb(77, 77, 77); display: block; }.mceInput[type="radio"], .mceInput[type="checkbox"] { float: left; margin-right: 12px; display: inline; width: auto !important; }.mceLabel > .mceInput { margin-bottom: 0px; margin-top: 2px; }.mceLabel { display: block; }.mceText h1 { font-size: 31.248px; font-weight: 700; } @media only screen and (max-width: 480px) {.mobileClass-204 {padding-left: 12 !important;padding-top: 0 !important;padding-right: 12 !important;}.mobileClass-204 {padding-left: 12 !important;padding-top: 0 !important;padding-right: 12 !important;}} @media only screen and (min-width: 481px) and (max-width: 768px) {}</style></head>
<body>
<!--*|IF:MC_PREVIEW_TEXT|*-->
<!--[if !gte mso 9]><!----><span class="mcnPreviewText" style="display:none; font-size:0px; line-height:0px; max-height:0px; max-width:0px; opacity:0; overflow:hidden; visibility:hidden; mso-hide:all;"> Você se cadastrou em nossa plataforma </span><!--<![endif]-->
<!--*|END:IF|*-->
<center>
<table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" style="background-color: rgb(255, 255, 255);">
<tbody><tr>
<td id="root" class="bodyCell" align="center" valign="top"><!--[if (gte mso 9)|(IE)]><table align="center" border="0" cellspacing="0" cellpadding="0" width="660" style="width:660px;"><tr><td><![endif]--><table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:660px" role="presentation"><tbody><tr class="mceRow"><td style="background-position:center;background-repeat:no-repeat;background-size:cover" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed" role="presentation"><colgroup><col span="1"/><col span="1"/><col span="1"/><col span="1"/><col span="1"/><col span="1"/><col span="1"/><col span="1"/><col span="1"/><col span="1"/><col span="1"/><col span="1"/></colgroup><tbody><tr><td style="background-color:#ffffff;background-position:center;background-repeat:no-repeat;background-size:cover;padding-top:24px" class="mceColumn" valign="top" colspan="12" width="100%"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td style="padding-top:12px;padding-bottom:12px;padding-right:0;padding-left:0" class="mceSpacing-24" align="center" valign="top"><img width="225.2199413489736" style="width:225.2199413489736px;height:auto;max-width:100%;display:block" alt="Logo" src="https://dim.mcusercontent.com/cs/065853383d109740fc7e3acd7/images/b9962a33-5df0-7ffd-ea40-ef53cbc2542d.png?w=225&dpr=2"/></td></tr><tr><td style="padding-top:12px;padding-bottom:12px;padding-right:24px;padding-left:24px" class="mceSpacing-24" valign="top"><div class="mceText" style="font-size:16px;line-height:1.5;text-align:center;width:100%"><h1>Bem-vindo à Green Life ;)</h1><p>Obrigado por se cadastrar na nossa plataforma. A partir de hoje você receberá atualizações relacionadas à como ter uma vida sustentável</p><p class="last-child"></p></div></td></tr><tr><td style="padding-top:12px;padding-bottom:12px;padding-right:0;padding-left:0" class="mceSpacing-24" align="center" valign="top"><img width="564" style="width:564px;height:auto;max-width:100%;display:block" alt="" src="https://dim.mcusercontent.com/cs/065853383d109740fc7e3acd7/images/b62f1f5d-caa8-4028-d19b-b248f1115a43.jpg?w=564&dpr=2" role="presentation"/></td></tr><tr><td style="padding-top:12px;padding-bottom:12px;padding-right:24px;padding-left:24px" class="mceSpacing-24" valign="top"><div class="mceText" style="font-size:16px;text-align:center;width:100%"><p class="last-child"><span style="font-size: 13px">Algo de errado com seu cadastro? entre em contato com nossa equipe</span></p></div></td></tr><tr><td style="background-color:transparent;padding-top:12px;padding-bottom:12px;padding-right:24px;padding-left:24px" class="mceSpacing-24" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:transparent" role="presentation"><tbody><tr><td style="min-width:100%;border-top:2px solid #000000" valign="top"></td></tr></tbody></table></td></tr><tr><td style="padding-top:12px;padding-bottom:12px;padding-right:0;padding-left:0" class="mceSpacing-24" valign="top"><table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr class="mceRow"><td style="background-position:center;background-repeat:no-repeat;background-size:cover" valign="top"><table border="0" cellpadding="0" cellspacing="24" width="100%" style="table-layout:fixed" role="presentation"><colgroup><col span="1"/><col span="1"/><col span="1"/><col span="1"/><col span="1"/><col span="1"/><col span="1"/><col span="1"/><col span="1"/><col span="1"/><col span="1"/><col span="1"/></colgroup><tbody><tr><td style="background-position:center;background-repeat:no-repeat;background-size:cover" class="mceColumn" valign="top" colspan="12" width="100%"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td class="mceSpacing-24" align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="" role="presentation" class="mceClusterLayout"><tbody><tr><td style="padding-left:24px;padding-top:0;padding-right:24px" data-breakpoint="204" valign="top" class="mobileClass-204"><a href="https://instagram.com/greenlifesustentavel" style="display:block" target="_blank"><img width="40" style="border:0;width:40px;height:auto;max-width:100%;display:block" alt="Instagram icon" src="https://dim.mcusercontent.com/https/cdn-images.mailchimp.com%2Ficons%2Fsocial-block-v3%2Fblock-icons-v3%2Finstagram-filled-dark-40.png?w=40&dpr=2"/></a></td><td style="padding-left:24px;padding-top:0;padding-right:24px" data-breakpoint="204" valign="top" class="mobileClass-204"><a href="mailto:greenlifesustentavel@gmail.com" style="display:block" target="_blank"><img width="40" style="border:0;width:40px;height:auto;max-width:100%;display:block" alt="Email icon" src="https://dim.mcusercontent.com/https/cdn-images.mailchimp.com%2Ficons%2Fsocial-block-v3%2Fblock-icons-v3%2Femail-filled-dark-40.png?w=40&dpr=2"/></a></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td style="padding-top:12px;padding-bottom:12px;padding-right:48px;padding-left:48px" class="mceSpacing-24" valign="top"><table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation" id="section_fa168446dbb7b0a183886dc1351ad523"><tbody><tr class="mceRow"><td style="background-position:center;background-repeat:no-repeat;background-size:cover" valign="top"><table border="0" cellpadding="0" cellspacing="12" width="100%" style="table-layout:fixed" role="presentation"><colgroup><col span="1"/><col span="1"/><col span="1"/><col span="1"/><col span="1"/><col span="1"/><col span="1"/><col span="1"/><col span="1"/><col span="1"/><col span="1"/><col span="1"/></colgroup><tbody><tr><td style="background-position:center;background-repeat:no-repeat;background-size:cover;padding-top:0;padding-bottom:0" class="mceColumn" valign="top" colspan="12" width="100%"><table border="0" cellpadding="0" cellspacing="0" width="100%" role="presentation"><tbody><tr><td style="padding-top:12px;padding-bottom:12px;padding-right:0;padding-left:0" class="mceSpacing-24" align="center" valign="top"><img width="225.2199413489736" style="width:225.2199413489736px;height:auto;max-width:100%;display:block" alt="Logo" src="https://dim.mcusercontent.com/cs/065853383d109740fc7e3acd7/images/b9962a33-5df0-7ffd-ea40-ef53cbc2542d.png?w=225&dpr=2"/></td></tr><tr><td style="padding-top:12px;padding-bottom:12px;padding-right:24px;padding-left:24px" class="mceSpacing-24" align="center" valign="top"><div class="mceText" style="font-size:12px;display:inline-block;width:100%"><p class="last-child"><em>Copyright (C) 2022. All rights reserved.</em><br/></p></div></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr></table></td>
</tr>
</tbody></table>
</center>
</body></html>`






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
    listId = "2143e64eb1";
    tag = "sustentavel"

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

                const addListMember = async () => {
                    try {
                        const response = await  mailchimp.lists.addListMember(listId, {
                            email_address: nwemail,
                            status: 'subscribed',
                            email_type: 'html',
                            merge_fields: {
                                FNAME: nwnome
                            },
                            tags: [tag]
                        })
                        //console.log(response)
                        const mailOptions = {
                            from: 'greenlifesustentavel@gmail.com',
                            to: nwemail,
                            subject: 'Bem Vindo à Green Life ;)',
                            html: bemVindo
                        };

                        transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                              console.log("Erro ao enviar primeiro email: ", error);
                            } else {
                              console.log('Email enviado: ' + info.response);
                            }
                        });
                    }
                    catch (err) {
                        console.log(err)
                    }
                }
                addListMember();


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
    if(token === undefined || token === "undefined" || token === ""){
        res.render("cad-log.ejs", {"nome": nome, "email": email, "senha": senha, "image": image, "token": token});
    } else {
        console.log("Token: ", token)
        axios.get(`http://localhost:7000/usuarios/?token=${token}`).then(resp => {
            var dados = resp.data[0];
            if(dados != undefined){
                res.render("cad-log.ejs", {"nome": nome, "email": email, "senha": senha, "image": image, "token": token});
            } else {
                res.send(`<html><head></head><body><script>alert("Você já esta logado");window.location.href="/?token=${req.body.token}"</script></body></html>`);
            }
        });
        
    }
});




//AUTOMAÇÃO DE ENVIO DE EMAIL

app.post('/adm/createlist', async (req, res) => {
    const { name, company, address, city, state, zip, country, from_name, from_email, subject, language } = req.body
const footerContactInfo = { company, address1: address, city, state, zip, country }
const campaignDefaults = { from_name, from_email, subject, language }
async function createAudience() {
        try {
            const audience = await mailchimp.lists.createList({
                name: name,
                contact: footerContactInfo,
                permission_reminder: "*|LIST:DESCRIPTION|*",
                email_type_option: true,
                campaign_defaults: campaignDefaults
            })
res.send(audience.id)
        }
        catch (err) {
            res.status(400).send(err)
        }
    }
createAudience()
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