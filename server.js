'use strict'

const app = require('../APIMONGO/bin/express');
const variables = require('../APIMONGO/bin/configuration/variables');

app.listen(variables.Api.port,() => {
    console.info(`Servidor iniciado ${variables.Api.port}`);
});

/**
 * Usuario acessa a rota
 * O express direciona para a rota especpiifca em [routes]
 * A rota transafere para o controller
 * O controle recebe a solicitação e manda para o repositório
 * O repositório executa a ação desejada
 */
