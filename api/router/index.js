const express = require('express')
const PessoasRouter = require('./pessoas')
const NiveisRouter = require('./niveis')
const TurmasRouter = require('./turmas')
const MatriculasRouter = require('./matriculas')


module.exports = app => {
    app.use(express.json())

    app.use('/api', PessoasRouter)
    app.use('/api', NiveisRouter)
    app.use('/api', TurmasRouter)
    app.use('/api', MatriculasRouter)
}