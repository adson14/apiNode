'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;


const usuarioModel = new schema({
    nome:{trim:true,index:true,required:true,type:String},
    email:{type:String, required:true},
    senha:{type:String, required:true},
    telefone:{type:String},
    tipo:{type:String},
    endereco:{type:String, required:true},
    numero:{type:Number, required:true},
    complemento:{type:String},
    bairro:{type:String, required:true},
    cidade:{type:String, required:true},
    cep:{type:String, required:true},
    uf:{type:String, required:true},
    foto:{type:String},
    dataCriacao:{type:Date, default:Date.now}
},{versionKey:false});


usuarioModel.pre('save',next => {
    let agora = new Date();
    if(!this.dataCriacao){
        this.dataCriacao = agora;
    }
    next();
});

module.exports = mongoose.model('Usuario',usuarioModel);
