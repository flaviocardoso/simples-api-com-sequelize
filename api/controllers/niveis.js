
const { Niveis, Turmas } = require('../models')

class NiveisController {
    static async pegaTodasAsNiveis (req, res, next) {
        try {
            const todasOsNiveis = await Niveis.findAndCountAll({ attributes: ['id', 'descr_nivel'] })
            res.json(todasOsNiveis)  
        } catch (error) {
            next(error)
        }
    }

    static async pegaUmNivel (req, res, next) {
        const { id } = req.params

        try {
            const umNivel = await Niveis.findByPk(Number(id))
            if (umNivel === null) {
                throw new Error('Não Encontrado!')
            }
            res.json(umNivel)
        } catch (error) {
            next(error)
        }
    }

    static async criaNivel (req, res, next) {
        const novoNivel = req.body

        try {
            const novoNivelCriado = await Niveis.create(novoNivel)
            res.json(novoNivelCriado)
        } catch (error) {
            next(error)
        }
    }

    static async pegaTodasAsTurmasDeUmNivel (req, res, next) {
        const { nivelId } = req.params

        try {
            const nivelEncontrada = await Niveis.findByPk(Number(nivelId))
            if (nivelEncontrada === null) {
                throw new Error('Não Encontrado!')
            }
            const todasAsTurmasDeUmNivel = await Turmas.findAndCountAll({
                where: { nivel_id: Number(nivelId) },
                attributes: ['id', 'data_inicio', 'nivel_id', 'docente_id']
            })
            res.json(todasAsTurmasDeUmNivel)
        } catch (error) {
            next(error)
        }
    }

    static async pegaUmaTurma (req, res, next) {
        const { nivelId, turmaId } = req.params

        try {
            const nivelEncontrada = await Niveis.findByPk(Number(nivelId))
            const turmaEncontrada = await Turmas.findByPk(Number(turmaId))
            if (nivelEncontrada === null || turmaEncontrada === null) {
                throw new Error('Não Encontrado!')
            }
            res.json(turmaEncontrada)
        } catch (error) {
            next(error)
        }
    }

    static async atualizaNivel (req, res, next) {
        const novaInfos = req.body
        const { id } = req.params

        try {
            const nivelEncontrado = await Niveis.findByPk(Number(id))
            if (nivelEncontrado === null) {
                throw new Error('Não Encontrado!')
            }
            await Niveis.update(novaInfos, { where: { id: Number(id) } })
            const nivelAtualizado = await Niveis.findByPk(Number(id))
            res.json(nivelAtualizado)
        } catch (error) {
            next(error)
        }
    }

    static async apagaNivel (req, res, next) {
        const { id } = req.params

        try {
            const nivelEncontrado = await Niveis.findByPk(Number(id))
            if (nivelEncontrado === null) {
                throw new Error('Não Encontrado')
            }
            await Niveis.destroy({ where : { id: Number(id) } })
            res.json({ mensagem: `id ${id} deletado!` })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = NiveisController