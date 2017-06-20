var sqlite = require('sqlite3').verbose();
var banco = new sqlite.Database('C:/ProjetosNode/DrinkEveryApi/drinkEveryBd.db');

var modeloPedido = function () {}; // cria um prototype

modeloPedido.prototype.insert = function(args){
    // Inserir pedido...
    var sqlPedido = "";
    // Depois inserir itens do pedido...
    var sqlItensPedido = "";

    // Serão dois run
    banco.serialize(function(args){
        banco.run(sqlPedido, {}, function(error){
                            console.log(error);
                            return;
                        });

        banco.run(sqlItensPedido,
                    {}, function(error){
                            console.log(error);
                            return;
                        });
    });
}

modeloPedido.prototype.select = function(args, callback){
    var sql = "";

    banco.all(sql, {$id_fornecedor: args.idFonecedor}, function(err, rows){
        if(rows != undefined && rows.length > 0){
            callback(rows);
        }
        else
            callback(0);
    });
}