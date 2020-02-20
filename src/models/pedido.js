'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente'
    },
    
    dataCadastro : {
        type: Date,
        required: true,
        default: Date.now
    },
    
    dataAtualizacao: {
        type: Date,
        required: true,
        default: Date.now
    },

    produtos: [ {
        produto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Produto'
        },
        descricao: {
            type: String,
            trim: true,
            required: true
        },
        quantidade: {
            type: Number,
            required: true,
            default: 1
        },
        preco: {
            type: Number,
            required: true
        }
    }]
});


module.exports = mongoose.model('Pedido', schema);