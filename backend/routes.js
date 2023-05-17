const {Router} = require('express')
const routes = Router();

const LoginController = require('./src/controllers/loginController')


 routes.post("/login",LoginController.login );
 //function(req,res)
// {
//     res.header("Access-Control-Allow-Origin", "*");
//     var usuario = req.body.usuario;
//     var senha = req.body.senha;
//     var sql =`SELECT * FROM user WHERE usuario="${usuario}" and senha=${senha}`
//     var db = new sqlite3.Database(DBPATH);
//     db.all(sql,[],function(err,row){
//         if(err)
//         {
//             res.send("algo deu errado" + err)
//         }
//         else if(row.length === 0)
//         {
//             res.send("algo deu errado esse usuario ou esta senha não existe.")
//         }
//         else
//         {
//             res.json({
//                 "msg":"success"
//             })
//         }
//     });
//     db.close()
// }


routes.get("/todos", function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    var db = new sqlite3.Database(DBPATH);
    db.all(`SELECT * FROM user`, [], (err, rows)=>
    {
        if(err)
        {
            res.send(err);
        }
        res.send(rows);
    });
    db.close()
});

routes.post("/criarUsuario", function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    var usuario = req.body.usuario;
    var senha = req.body.senha;
    var empresa = req.body.empresa;
    var email = req.body.email;
    sql = `INSERT INTO user (usuario,senha,empresa,email) VALUES ("${usuario}",${senha},"${empresa}","${email}")`
    var db = new sqlite3.Database(DBPATH);
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
    db.close()
});
routes.post("/adicionarChoque", function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    var{Data_Hora,Latitude,Longitude,Velocidade,Position,Placa_Virtual,Trecho,F_max,ACT,PEG,id_vagao,tipo_choque} = req.body
    console.log(id_vagao)
    var db = new sqlite3.Database(DBPATH);
    sql = `INSERT INTO choque(Data_Hora,Latitude,Longitude,Velocidade,Position,Placa_Virtual,Trecho,F_max,ACT,PEG,id_vagao,tipo_choque) VALUES (${Data_Hora},${Latitude},${Longitude},${Velocidade},${Position},"${Placa_Virtual}","${Trecho}",${F_max},${ACT},${PEG},${id_vagao},${tipo_choque})`
    db.all(sql, [], (err, rows)=>
    {
        if(err)
        {
            res.send("Erro na gravação: "+err);
        }else
        {
            res.send(" Choque adicionado!");
        }
    });
    db.close()
});

routes.put("/atualizaUsuario", function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    var id = req.body.id;
    var usuario = req.body.usuario;
    var senha = req.body.senha;
    var empresa = req.body.empresa;
    var email = req.body.email;
    sql = `UPDATE user SET usuario="${usuario}", senha="${senha}",empresa="${empresa}",email="${email}" WHERE id=${id}`
    var db = new sqlite3.Database(DBPATH);
    db.all(sql, [], (err, rows)=>
    {
        if(err)
        {
            res.send("Erro na atualização: "+err);
        }
        res.send("Usuário atualizado!");
        
    });
    db.close()
});

routes.delete("/deletarUsuario", function(req,res){
    res.header("Access-Control-Allow_Origin", "*");
    var id = req.body.id;
    sql = `DELETE FROM user WHERE id=${id}`
    var db = new sqlite3.Database(DBPATH);
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
    db.close()
});
routes.delete("/deletarChoque", function(req,res){
    res.header("Access-Control-Allow_Origin", "*");
    var id = req.body.id;
    sql = `DELETE FROM choque WHERE id=${id}`
    var db = new sqlite3.Database(DBPATH);
    db.all(sql, [], (err, rows)=>
    {
        if(err)
        {
            res.send("Erro na delecao: "+err);
        }else
        {
            res.send(" Deletado!");
        }
    });
    db.close()
});

routes.get("/perfil", function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    var id = req.body.id;
    sql = `SELECT * FROM user WHERE id="${id}"`
    var db = new sqlite3.Database(DBPATH);
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
    db.close()
});
routes.get("/choque1", function(req,res){ 
    res.header("Access-Control-Allow-Origin", "*");
    const{id_vagao}=req.body
    
    sql = `SELECT * FROM choque  WHERE id_vagao=${id_vagao} and tipo_choque = 1 `
    var db = new sqlite3.Database(DBPATH);
    db.all(sql, [], (err, rows)=>
    {
        if(err)
        {
            res.send("identificação invalida"+err);
        } 
        else if (rows.length === 0){
            res.send("vagão não existe")

        }
        else {
            res.json(rows);
        }
        
    });
    db.close()
});
routes.get("/choque2", function(req,res){ 
    res.header("Access-Control-Allow-Origin", "*");
    const{id_vagao}=req.body
    
    sql = `SELECT * FROM choque  WHERE id_vagao=${id_vagao} and tipo_choque = 2 `
    var db = new sqlite3.Database(DBPATH);
    db.all(sql, [], (err, rows)=>
    {
        if(err)
        {
            res.send("identificação invalida"+err);
        } 
        else if (rows.length === 0){
            res.send("vagão não existe")

        }
        else {
            res.json(rows);
        }
        
    });
    db.close()
});
routes.get("/pico", function(req,res){ 
    res.header("Access-Control-Allow-Origin", "*");
    const{id_vagao}=req.body
    
    sql = `SELECT * FROM pico  WHERE id_vagao=${id_vagao} and tipo_choque = 3 `
    var db = new sqlite3.Database(DBPATH);
    db.all(sql, [], (err, rows)=>
    {
        if(err)
        {
            res.send("identificação invalida"+err);
        } 
        else if (rows.length === 0){
            res.send("vagão não existe")

        }
        else {
            res.json(rows);
        }
        
    });
    db.close()
});
module.exports = routes;