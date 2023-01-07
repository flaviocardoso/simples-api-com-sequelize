
const { Turmas, Matriculas } = require('../models')

class TurmasController {
    static async pegaTodasAsTurmas (req, res, next) {
        try {
            const todasAsTurmas = await Turmas.findAndCountAll({ attributes: ['id', 'data_inicio', 'docente_id', 'nivel_id'] })
            res.json(todasAsTurmas)
        } catch (error) {
            next(error)
        }
    }

    static async pegaUmaTurma (req, res, next) {
        const { id } = req.params

        try {
            const umaTurma = await Turmas.findByPk(Number(id))
            if (umaTurma === null) {
                throw new Error('Não Encontrado!')
            }
            res.json(umaTurma)
        } catch (error) {
            next(error)
        }
    }

    static async pegaTodasAsMatriculasDeUmaTurma (req, res, next) {
        const { turmaId } = req.params

        try {
            const turmaEncontrada = await Turmas.findByPk(Number(turmaId))
            if (turmaEncontrada === null) {
                throw new Error('Não Encontrado!')
            }
            const todasAsMatriculasDeUmaTurma = await Matriculas.findAndCountAll({
                where: { turma_id: Number(turmaId) },
                attributes: ['id', 'status', 'turma_id', 'estudante_id']
            })
            res.json(todasAsMatriculasDeUmaTurma)
        } catch (error) {
            next(error)
        }
    }

    static async pegaUmaMatricula (req, res, next) {
        const { turmaId, matriculaId } = req.params

        try {
            const umaTurma = await Turmas.findByPk(Number(turmaId))
            const umaMatricula = await Matriculas.findByPk(Number(matriculaId))
            if (umaTurma === null || umaMatricula === null) {
                throw new Error('Não Encontrado!')
            }
            res.json(umaMatricula)
        } catch (error) {
            next(error)
        }
    }

    static async criaTurma (req, res, next) {
        const novaTurma = req.body // docente_id, niveil_id

        try {
            const novaTurmaCriada = await Turmas.create(novaTurma)
            res.status(201).json(novaTurmaCriada)
        } catch (error) {
            next(error)
        }
    }

    static async atualizaTurma (req, res, next) {
        const novaInfos = req.body // docente_id, niveil_id, data_inicio
        const { id } = req.params

        try {
            const turmaEncontrada = await Turmas.findByPk(Number(id))
            if (turmaEncontrada === null) {
                throw new Error('Não Encontrado!')
            }
            await Turmas.update(novaInfos, { where: { id: Number(id) } })
            const turmaAtualizada = await Turmas.findByPk(Number(id))
            res.json(turmaAtualizada)
        } catch (error) {
            next(error)
        }
    }

    static async apagaTurma (req, res, next) {
        const { id } = req.params

        try {
            const turmaEncontrada = await Turmas.findByPk(Number(id))
            if (turmaEncontrada === null) {
                throw new Error('Não Encontrado!')
            }
            await Turmas.destroy({ where: { id: Number(id) } })
            res.json({ mensagem: `id ${id} deletado!` })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = TurmasController