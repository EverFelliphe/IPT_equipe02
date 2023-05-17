var {resolve} = require('path')
const sqlite3 = require('sqlite3').verbose()
var DBPATH = resolve(__dirname,'..','database','banco_de_dados_ipt_grupo02.db');
const Login = require('../models/login')

class LoginController{
     async login(req,res){
     res.header("Access-Control-Allow-Origin", "*");
     var user = req.body.usuario;
     var password = req.body.senha;
     const data =  await Login.verify(user)
     console.log(!data)
     if(!data[0]) return res.json({
        msg:'usuario não existe'
     })
     const {usuario,senha}=data[0]
    if(usuario !== user) return res.json({
        msg:'usuario incorreto ou senha incorretos'
    })
    if(senha !== password) return res.json({
        msg:'usuario incorreto ou senha incorretos'
    })
    res.json({
        msg:'success'
    })
     

}
}
module.exports = new LoginController