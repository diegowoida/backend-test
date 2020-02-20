'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    descricao: {
        type: String,
        required: true,
        trim: true
    },
    preco: {
        type: Number,
        required: true
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
    }
});


module.exports = mongoose.model('Produto', schema);