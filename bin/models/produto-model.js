'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;


const produtoModel = new schema({
    nome:{trim:true,index:true,required:true,type:String},
    foto:{type:String, required:true},
    descricao:{type:String},
    medida:{type:String, required:true},
    volume:{type:Number, required:true},
    showNutricional:{type:Boolean},
    tipo:{type:String, required:true},
    valor:{type:Number, required:true},
    ativo:{type:Boolean ,default:true},
    dataCriacao:{type:Date, default:Date.now}
},{versionKey:false});


produtoModel.pre('save',next => {
    let agora = new Date();
    if(!this.dataCriacao){
        this.dataCriacao = agora;
    }
    next();
});

module.exports = mongoose.model('Produto',produtoModel);
