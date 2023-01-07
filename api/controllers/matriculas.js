
const { Matriculas } = require('../models')

class MatriculasController {
    static async pegaTodasAsMatriculas (req, res, next) {
        try {
            const todasAsMatriculas = await Matriculas.findAndCountAll({ attributes: ['id', 'status', 'estudante_id', 'turma_id'] })
            res.json(todasAsMatriculas)
        } catch (error) {
            next(error)
        }
    }

    static async pegaUmaMatricula (req, res, next) {
        const { id } = req.params

        try {
            const umaMatricula = await Matriculas.findByPk(Number(id))
            if (umaMatricula === null) {
                throw new Error('Não Encontrado!')
            }
            res.json(umaMatricula)
        } catch (error) {
            next(error)
        }
    }
    
    static async criaMatricula (req, res, next) {
        const novaMatricula = req.body // estudante_id, turma_id

        try {
            const novaMatriculaCriada = await Matriculas.create(novaMatricula)
            res.json(novaMatriculaCriada)
        } catch (error) {
            next(error)
        }
    }

    static async atualizaMatricula (req, res, next) {
        const { id } = req.params
        const novaInfos = req.body // estudante_id, turma_id, status

        try {
            const matriculaEncontrada = await Matriculas.findByPk(Number(id))

            if (matriculaEncontrada === null) {
                throw new Error('Não Encontrado!')
            }

            await Matriculas.update(novaInfos, { where: { id: Number(id) } })
            const matriculaAtualizada = await Matriculas.findByPk(Number(id))
            res.json(matriculaAtualizada)
        } catch (error) {
            next(error)
        }
    }

    static async apagaMatricula (req, res, next) {
        const { id } = req.params

        try {
            const matriculaEncontrada = await Matriculas.findByPk(Number(id))
            if (matriculaEncontrada === null) {
                throw new Error('Não Encontrada')
            }
            await Matriculas.destroy({ where: { id: Number(id) } })
            res.json({ mensagem: `id ${id} deleteda!` })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = MatriculasController