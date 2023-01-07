const { Router } = require('express')
const MatriculasController = require('../controllers/matriculas')

const MatriculasRouter = Router()

MatriculasRouter
    .get('/matriculas', MatriculasController.pegaTodasAsMatriculas) // todas as matriculas
    .post('/matriculas', MatriculasController.criaMatricula) // cria uma matricula
    .get('/matriculas/:id', MatriculasController.pegaUmaMatricula) // pega uma matricula
    .put('/matriculas/:id', MatriculasController.atualizaMatricula)
    .delete('/matriculas/:id', MatriculasController.apagaMatricula)

module.exports = MatriculasRouter