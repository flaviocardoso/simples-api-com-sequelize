const { Router } = require('express')
const NiveisController = require('../controllers/niveis')

const NiveisRouter = Router()

NiveisRouter
    .get('/niveis', NiveisController.pegaTodasAsNiveis) // ok
    .post('/niveis', NiveisController.criaNivel) // ok
    .get('/niveis/:id', NiveisController.pegaUmNivel) // ok
    .get('/niveis/:nivelId/turmas', NiveisController.pegaTodasAsTurmasDeUmNivel) // ok
    .get('/niveis/:nivelId/turmas/:turmaId', NiveisController.pegaUmaTurma) // ok
    .put('/niveis/:id', NiveisController.atualizaNivel) // ok
    .delete('/niveis/:id', NiveisController.apagaNivel) // ok

module.exports = NiveisRouter