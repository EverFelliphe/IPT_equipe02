class RelatorioController{
    show_relatorios(req, res){
        res.statusCode = 200;
        res.setHeader('Access-Control-Allow-Origin', '*');
        var db = new sqlite3.Database(DBPATH);
        var sql = `SELECT id FROM relatorio`;
        db.all(sql, [], (err, rows) => {
            if (err) {
                throw err;
            };
            res.json(rows);
        });
        db.close();
    }
}
module.exports= new RelatorioController