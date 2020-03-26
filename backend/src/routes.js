const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentsController = require('./controllers/IncidentsController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();
/*
 * Metodos http
 * 
 * get: Busca
 * post: cria
 * put: alterar
 * delete: deletar
 */

/**
 * Tipos de Parametros
 * Query Params: Parametros nomeados na rota apos "?"(filtros,paginação) { const params = req.query; }
 * Route Params: Parametros utilizados para identificar recursos { const params = req.params; }
 * Request Body: Corpo da requisisição
 */

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.post('/incidents', IncidentsController.create);
routes.get('/incidents', IncidentsController.index);
routes.delete('/incidents/:id', IncidentsController.delete);

module.exports = routes;