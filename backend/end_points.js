var express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();
var DBPATH = './testavel_usuariosDB.db';
var db = new sqlite3.Database(DBPATH);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/login", function(req,res)
{
    res.header("Access-Control-Allow-Origin", "*");
    var usuario = req.body.usuario;
    var senha = req.body.senha;
    var sql =`SELECT * FROM tbUsuarios WHERE usuario="${usuario}" and senha=${senha}`
    db.all(sql,[],function(err,row){
        if(err)
        {
            res.send("algo deu errado" + err)
        }
        else if(row.length === 0)
        {
            res.send("algo deu errado esse usuario ou esta senha não existe.")
        }
        else
        {
            res.redirect("/todos")
        }
    });
});

app.get("/todos", function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    
    db.all(`SELECT * FROM tbUsuarios`, [], (err, rows)=>
    {
        if(err)
        {
            res.send(err);
        }
        res.send(rows);
    });
});

app.post("/criarUsuario", function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    var usuario = req.body.usuario;
    var senha = req.body.senha;
    var empresa = req.body.empresa;
    var email = req.body.email;
    sql = `INSERT INTO tbUsuarios (usuario,senha,empresa,email) VALUES ("${usuario}",${senha},"${empresa}","${email}")`
    db.all(sql, [], (err, rows)=>
    {
        if(err)
        {
            res.send("Erro na gravação: "+err);
        }else
        {
            res.send("Usuário cadastrado!");
        }
    });
});

app.put("/atualizaUsuario", function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    var id = req.body.id;
    var usuario = req.body.usuario;
    var senha = req.body.senha;
    var empresa = req.body.empresa;
    var email = req.body.email;
    sql = `UPDATE tbUsuarios SET usuario="${usuario}", senha="${senha}",empresa="${empresa}",email="${email}" WHERE id=${id}`
    db.all(sql, [], (err, rows)=>
    {
        if(err)
        {
            res.send("Erro na atualização: "+err);
        }
        res.send("Usuário atualizado!");
        
    });
});

app.delete("/deletarUsuario", function(req,res){
    res.header("Access-Control-Allow_Origin", "*");
    var id = req.body.id;
    sql = `DELETE FROM tbUsuarios WHERE id=${id}`
    db.all(sql, [], (err, rows)=>
    {
        if(err)
        {
            res.send("Erro na delecao: "+err);
        }else
        {
            res.send("Usuário Deletado!");
        }
    });
});

app.get("/perfil", function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    var id = req.body.id;
    sql = `SELECT * FROM tbUsuarios WHERE id="${id}"`
    db.all(sql, [], (err, rows)=>
    {
        if(err)
        {
            res.send("Usuário não encontrado"+err);
        }
        else if (rows.length === 0){
            res.send("Usuário não existente.")

        }
        else {
            res.send(rows);
        }
        
    });
});

app.listen(port, () =>
{
    console.log(`Servidor rodando na porta ${port}`);
})