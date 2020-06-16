const express = require('express');
const bodyparser = require('body-parser');

const categoriaRouter = require('./routes/categoria-router');
const produtoRouter = require('./routes/produto-router');
const usuarioRouter = require('./routes/usuario-router');
const mongoose = require('mongoose');
const variables = require('../bin/configuration/variables');

const cors = require('cors')


//Criando e invocando a API do Experss
const app = express();
app.options('*', cors());

// Add headers
app.use(cors());
//Configuração de Parser do json
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

//COnfigurando a conexao com o bd
mongoose.connect(variables.Database.connection,{useNewUrlParser: true});

//COnfigurando rotas
app.use('/api/categoria',categoriaRouter);
app.use('/api/produto',produtoRouter);
app.use('/api/usuario',usuarioRouter);

//Exportando nossa API
module.exports = app;