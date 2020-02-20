'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    nome: {
        type: String,
        required: true,
        trim: true
    },
    dataNascimento: {
        type: Date,
        required: true
    },
    dataCadastro : {
        type: Date,
        default: Date.now
    },
    dataAtualizacao: {
        type: Date,
        required: true,
        default: Date.now
    }
});


module.exports = mongoose.model('Cliente', schema);