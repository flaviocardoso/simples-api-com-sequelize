const { Router } = require('express')
const PessoasController = require('../controllers/pessoas')

const PessoasRouter = Router()

PessoasRouter
    .get('/pessoas', PessoasController.pegaTodasAsPessoas) // ok
    .post('/pessoas', PessoasController.criaPessoa) // ok
    .get('/pessoas/:id', PessoasController.pegaUmPessoa) // ok
    .get('/pessoas/:docenteId/turmas', PessoasController.pegaTodasAsTurmasDeUmDocente) // ok
    .get('/pessoas/:docenteId/turmas/:turmaId', PessoasController.pegaUmaTurma) // ok
    .get('/pessoas/:estudanteId/matriculas', PessoasController.pegaTodasAsMatriculasDeUmEstudante) // ok
    .get('/pessoas/:estudanteId/matriculas/:matriculaId', PessoasController.pegaUmaMatricula) // ok
    .put('/pessoas/:id', PessoasController.atualizaPessoa) // ok
    .delete('/pessoas/:id', PessoasController.apagaPessoa) // ok

module.exports = PessoasRouter
