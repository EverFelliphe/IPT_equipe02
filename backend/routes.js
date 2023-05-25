const {Router} = require('express')
const routes = Router();
const PicosController = require('./src/controllers/PicosController')
const LoginController = require('./src/controllers/LoginController')
const ChoquesController = require('./src/controllers/ChoqueController')
const UserController = require('./src/controllers/UserController') 
const RelatorioController = require('./src/controllers/relatoriosController') 


// Endpoints **REDIRECT
routes.get('/meus_projetos', (req, res) => {
    // Redirect para a página "Meus projetos"
    res.redirect('/meus-projetos')
})
// Endpoints **PERFIL

// Endpoints **PROJETO
routes.get('/projeto/vagao', (req,res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    var sql = `SELECT * FROM Vagao WHERE id=${req.query.id}`
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows)
    });
    db.close();
});
routes.get('/projeto/picos', (req,res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    var sql = `SELECT * FROM Pico WHERE viagem_id=${req.body.id_vagao}`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows)
    });
    db.close();
});
routes.get('/projeto/choques', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    var sql = `SELECT * FROM Choque WHERE id_vagao=${req.body.id_vagao}`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows)
    });
    db.close();
});
routes.get('/projeto/viagem', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    var sql = `SELECT * FROM Viagem WHERE id_viagem=${req.body.id_viagem}`
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
});
// Endpoints comparação
routes.get('/projeto/comparacao', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    var sql = `SELECT * FROM Choque, Pico, Vagao WHERE id_vagao=${req.body.id_vagao}`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
});
// Endpoints página inicial
routes.get('/meus-projetos', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    var sql = `SELECT * FROM viagem`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json(rows);
    });
    db.close();
});
routes.get('/projeto/relatorio', RelatorioController.show_relatorios );
routes.get('/projetos/salvos', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var db = new sqlite3.Database(DBPATH);
    var sql = `SELECT * FROM viagem WHERE id=${req.body.id}`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        };
        res.json(rows);
    });
    db.close();
});

 routes.post("/login",LoginController.login );
 routes.post("/criarUsuario",  UserController.criaUser);
 routes.put("/atualizaUsuario", UserController.updateUser);
 routes.delete("/deletarUsuario", UserController.deleteUser);
 routes.delete("/deletarChoque",ChoquesController.delete_choque );
 routes.get("/choque1",ChoquesController.Show_choque);
 routes.get("/choque2",ChoquesController.Show_choque);
 routes.get("/pico", PicosController.Show_Pico);
routes.get("/todos", UserController.showAll);

routes.get("/perfil", UserController.showUser);
routes.post("/teste", ChoquesController.create_choque);
routes.post("/teste2", PicosController.create_picos);



module.exports = routes;