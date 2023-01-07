const { Router } = require('express')
const TurmasController = require('../controllers/turmas')

const TurmasRouter = Router()

TurmasRouter
    .get('/turmas', TurmasController.pegaTodasAsTurmas) // ok
    .post('/turmas', TurmasController.criaTurma) // ok
    .get('/turmas/:id', TurmasController.pegaUmaTurma) // ok
    .get('/turmas/:turmaId/matriculas', TurmasController.pegaTodasAsMatriculasDeUmaTurma) // todas as matriculas - estudante ok
    .get('/turmas/:turmaId/matriculas/:matriculaId', TurmasController.pegaUmaMatricula) // todas as matriculas - estudante ok
    .put('/turmas/:id', TurmasController.atualizaTurma) // ok
    .delete('/turmas/:id', TurmasController.apagaTurma) //ok

module.exports = TurmasRouter