var sqlite = require('sqlite3').verbose();
var banco = new sqlite.Database('C:/ProjetosNode/DrinkEveryApi/drinkEveryBd.db');

var modeloPedido = function () {}; // cria um prototype

modeloPedido.prototype.insert = function(args){
    var idPedidoInserido = 0; 
    // Inserir pedido...
    var sqlPedido = "INSERT INTO PEDIDO (Id_Cliente, Data, Hora, Situacao, TotalPedido, Id_Fornecedor) VALUES ($id_cliente, $data, $hora, $situacao, $totalPedido, $id_fornecedor)";
    // Depois inserir itens do pedido...
    var sqlItensPedido = "INSERT INTO ITEM_PEDIDO (Preco_Itens, Quantidade_Total, Id_Produto, Id_Pedido, Id_Fornecedor) VALUES ($preco_itens, $quantidade_total, $id_produto, $id_pedido, $id_fornecedor)";

    console.log(args);

    // Serão dois run
    banco.serialize(function(){
        banco.run(sqlPedido, { $id_cliente: args.id_cliente, $data: args.data, $hora: args.hora, $situacao: args.situacao, $totalPedido: args.totalPedido, $id_fornecedor: args.id_fornecedor }, 
                function(error){
                    if(error != undefined)
                        console.log(error);
                    else{
                        console.log("LastID: " + this.lastID);
                        idPedidoInserido = this.lastID
                        console.log(idPedidoInserido);
                        
                        if(idPedidoInserido != 0){
                            console.log(idPedidoInserido);
                            for (var i = 0; i < args.itensPedido.length; i++){
                                banco.run(sqlItensPedido, {$preco_itens: args.itensPedido[i].precoItens, $quantidade_total: args.itensPedido[i].qtdTotal, $id_produto: args.itensPedido[i].idProduto, $id_pedido: idPedidoInserido, $id_fornecedor: args.itensPedido[i].idFornecedor}, 
                                    function(error){
                                        if(error)
                                            console.log(error);
                                });
                            }
                        }
                    }
                });
    });
}

modeloPedido.prototype.selectPorCliente = function(args, callback){
    var sql = "SELECT P.Data, P.Hora, P.Situacao, P.TotalPedido, F.Descricao FROM pedido P INNER JOIN FORNECEDOR F ON P.Id_Fornecedor = F.Identificador WHERE P.Id_Cliente = $id_cliente ";

    banco.all(sql, {$id_cliente: args.id_cliente}, function(err, rows){
        if(rows != undefined && rows.length > 0){
            callback(rows);
        }
        else
            callback(0);
    });
}

modeloPedido.prototype.selectPorFornecedor = function(args, callback){
    var sql = "SELECT P.Data, P.Hora, P.Situacao, P.TotalPedido, F.Descricao FROM pedido P INNER JOIN FORNECEDOR F ON P.Id_Fornecedor = F.Identificador WHERE P.Id_Fornecedor = $id_fornecedor";

    banco.all(sql, {$id_fornecedor: args.id_forncecedor}, function(err, rows){
        if(rows != undefined && rows.length > 0){
            callback(rows);
        }
        else
            callback(0);
    });
}

module.exports = modeloPedido; // torna o prototype com as funcoes possivel de ser importado 