'use strict'

const repository = require('../repositories/usuario-repository');
const validation = require('../helpers/validation');
const ctrlBase = require('../base/controller-base');
const _repo = new repository();
const md5 = require('md5');
const jwt = require('jsonwebtoken') ;
const variables = require('../configuration/variables');


function produtoController(){
   
}

produtoController.prototype.post = async (req,res) =>{
  
    //Realiza a validação primeiro
    const _validationContact = new  validation();
 

    _validationContact.isRequired(req.body.email,'Informe seu e-mail');
    _validationContact.isRequired(req.body.email,'Informe o nome');
    _validationContact.isEmail(req.body.email,'O e-mail informado é inválido');
    _validationContact.isRequired(req.body.senha,'Informe uma senha válida');
    _validationContact.isRequired(req.body.senhaConfirmacao,'A senha de confirmação é obrigatória');
    _validationContact.isTrue(req.body.senha != req.body.senhaConfirmacao,'As senhas não condizem');
    
    let usuarioIsEmailExiste = await _repo.isEmailExiste(req.body.email);
    if(usuarioIsEmailExiste){
        _validationContact.isTrue((usuarioIsEmailExiste.nome != undefined),'Já existe o e-mail '+req.body.email)
    }

    
    //Criptografa a senha
    req.body.senha = md5(req.body.senha);


    ctrlBase.post(_repo,_validationContact,req,res);
    
   
};

produtoController.prototype.put = async (req,res) =>{
     //Realiza a validação primeiro
     const _validationContact = new  validation();
 
     _validationContact.isRequired(req.body.email,'Informe o nome');
     _validationContact.isRequired(req.body.email,'Informe seu e-mail');
     _validationContact.isEmail(req.body.email,'O e-mail informado é inválido');
     _validationContact.isRequired(req.params.id,'Imforme o id do usuário');
     
     let usuarioIsEmailExiste = await _repo.isEmailExiste(req.body.email);
     if(usuarioIsEmailExiste){
         _validationContact.isTrue((usuarioIsEmailExiste.nome != undefined) && (usuarioIsEmailExiste._id != req.params.id ),'Já existe o e-mail '+req.body.email)
     }
 
 
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

//Metodo para autenticação na api
produtoController.prototype.autenticar = async (req,res) =>{
    let _validationContact = new validation();

    _validationContact.isRequired(req.body.email,'Informe seu e-mail');
    _validationContact.isRequired(req.body.senha,'Informe sua senha');
    _validationContact.isEmail(req.body.email,'O e-mail informado é inválido');
  
    if(!_validationContact.isValid()){
        Response.status(400).send({message:'Não foi possível efetuar o login',validation: _validationContact.errors()});
        return;
    }
    
    let usuarioEncontrado = await _repo.autenticate(req.body.email,req.body.senha);
    console.log(req.body);
    //Se usuário encontrado então retorna com os dados e um token de autenticação
    if(usuarioEncontrado){
        res.status(200).send({
            usuario:usuarioEncontrado,
            token:jwt.sign({user:usuarioEncontrado}, variables.Security.secretKey)
        })
    }else{
        res.status(400).send({message:'Usuário e senha inválidos!'})
    }
};



module.exports = produtoController;