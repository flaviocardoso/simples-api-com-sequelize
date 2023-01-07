
module.exports = app => {
    app.use((error, req, res, next) => {
        let mensagem = error.message

        if (error.name === 'SequelizeForeignKeyConstraintError') {
            mensagem = 'Não existe docente ou nivel'
        }

        res.status(500).json({ mensagem, nome: error.name})
    })
}