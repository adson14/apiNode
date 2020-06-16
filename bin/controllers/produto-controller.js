'use strict'

const repository = require('../repositories/produto-repository');
const validation = require('../helpers/validation');
const ctrlBase = require('../base/controller-base');
const _repo = new repository();

const jwt = require('jsonwebtoken') ;
const variables = require('../configuration/variables');

function produtoController(){

}

produtoController.prototype.post = async (req,res) =>{

    const _validationContact = new  validation();
    _validationContact.isRequired(req.body.nome,'Informe o nome do produto');
    _validationContact.isRequired(req.body.foto,'Informe uma foto');
    _validationContact.isRequired(req.body.medida,'Informe a medida ');
    _validationContact.isRequired(req.body.volume,'Informe o volume do produto');
    _validationContact.isRequired(req.body.tipo,'Informe o tipo avulso ou combo');
    _validationContact.isRequired(req.body.valor,'Informe o valor do produto');
  
    ctrlBase.post(_repo,_validationContact,req,res);
 
   
};

produtoController.prototype.put = async (req,res) =>{
    const _validationContact = new  validation();
    _validationContact.isRequired(req.body.nome,'Informe o nome do produto');
    _validationContact.isRequired(req.body.foto,'Informe uma foto');
    _validationContact.isRequired(req.body.medida,'Informe a medida ');
    _validationContact.isRequired(req.body.volume,'Informe o volume do produto');
    _validationContact.isRequired(req.body.tipo,'Informe o tipo avulso ou combo');
    _validationContact.isRequired(req.body.valor,'Informe o valor do produto');
  
    _validationContact.isRequired(req.params.id,'O Id é obrigatório');
  
    ctrlBase.put(_repo,_validationContact,req,res);
 
   
};

produtoController.prototype.get = async (req,res) =>{
    ctrlBase.get(_repo,req,res);
};

produtoController.prototype.getById = async (req,res) =>{
    ctrlBase.getById(_repo,req,res);
};

produtoController.prototype.delete = async (req,res) =>{
    ctrlBase.delete(_repo,req,res);
  
};



module.exports = produtoController;