'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

// Conexao com banco
mongoose.connect('mongodb://localhost/backend', { useNewUrlParser: true });
//{ useUnifiedTopology: true }


// Carrega os Models
const Produto = require('./models/produto');
const Cliente = require('./models/cliente');
const Pedido = require('./models/pedido');


// Carregar as Rotas
const indexRoute = require('./routes/index-route');

const produtoRoute = require('./routes/produto-route');
const clienteRoute = require('./routes/cliente-route');
const pedidoRoute = require('./routes/pedido-route');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
    extended: false 
}));

app.use('/', indexRoute);

app.use('/produtos', produtoRoute);
app.use('/clientes', clienteRoute);
app.use('/pedidos', pedidoRoute);


module.exports = app;