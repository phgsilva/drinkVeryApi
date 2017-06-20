var sqlite = require('sqlite3').verbose();
var banco = new sqlite.Database('C:/ProjetosNode/DrinkEveryApi/drinkEveryBd.db');

var modeloFornecedor = function () {}; // cria um prototype

modeloFornecedor.prototype.buscarFornecedor = function(args, callback){
    var sql = "SELECT Identificador, Descricao, Endereco FROM fornecedor";

    banco.all(sql, {}, function(err, rows){
        if(rows != undefined && rows.length > 0){
            callback(rows);
        }
        else
            callback(0);
    });
}

modeloFornecedor.prototype.insert = function(args){
    var sql = "";
    
    banco.serialize(function(){
        banco.run(sql, {},
            function(error){
                console.log(error);
            });
    });
}

modeloFornecedor.prototype.selectProdutos = function(args, callback){
    var sql = "SELECT Identificador, Descricao, Marca, Preco FROM produto WHERE Id_Fornecedor = $id_fornecedor";

    banco.all(sql, {$id_fornecedor: args.idFonecedor}, function(err, rows){
        if(rows != undefined && rows.length > 0){
            callback(rows);
        }
        else
            callback(0);
    });
}

module.exports = modeloFornecedor; // torna o prototype com as funcoes possivel de ser importado 