
const { Pessoas, Turmas, Matriculas } = require('../models')

class PessoasController {
    static async pegaTodasAsPessoas (req, res, next) {
        try {
            const todasAsPessoas = await Pessoas.findAndCountAll({ attributes: ['id', 'nome', 'ativo', 'role'] })
            res.json(todasAsPessoas)
        } catch (error) {
            next(error)
        }
    }

    static async pegaUmPessoa (req, res, next) {
        const { id } = req.params

        try {
            const umaPessoa = await Pessoas.findByPk(Number(id))
            if (umaPessoa === null) {
                throw new Error("Não encontrado!")
            }
            res.json(umaPessoa)
        } catch (error) {
            next(error)
        }
    }

    static async pegaTodasAsTurmasDeUmDocente (req, res, next) {
        const { docenteId } = req.params

        try {
            const pessoaEncontrada = await Pessoas.findOne({ where: { id: Number(docenteId), role: 'docente' } })
            if (pessoaEncontrada === null) {
                throw new Error('Pessoa não é professor!')
            }
            const todasAsTurmasDeUmaPessoa = await Turmas.findAndCountAll({
                where: { docente_id: Number(docenteId) },
                attributes: ['id', 'data_inicio', 'nivel_id', 'docente_id']
            })
            res.json(todasAsTurmasDeUmaPessoa)
        } catch (error) {
            next(error)
        }
    }

    static async pegaTodasAsMatriculasDeUmEstudante (req, res, next) {
        const { estudanteId } = req.params

        try {
            const pessoaEncontrada = await Pessoas.findOne({ where: { id: Number(estudanteId), role: 'estudante'} })
            if (pessoaEncontrada === null) {
                throw new Error('Não Encontrado!')
            }
            const todasAsMatriculasDeUmEstudante = await Matriculas.findAndCountAll({
                where: { estudante_id: Number(estudanteId) },
                attributes: ['id', 'status', 'turma_id', 'estudante_id']
            })
            res.json(todasAsMatriculasDeUmEstudante)
        } catch (error) {
            next(error)
        }
    }

    static async criaPessoa (req, res, next) {
        const novaPessoa = req.body

        try {
            const novaPessoaCriada = await Pessoas.create(novaPessoa)
            res.status(201).json(novaPessoaCriada)
        } catch (error) {
            next(error)
        }
    }

    static async atualizaPessoa (req, res, next) {
        const { id } = req.params
        const novaInfos = req.body

        try {
            const umaPessoa = await Pessoas.findByPk(Number(id))
            if (umaPessoa === null) {
                throw new Error('Não Encontrado!')
            }
            await Pessoas.update(novaInfos, { where: { id: Number(id) } })
            const pessoaAtualizada = await Pessoas.findByPk(Number(id))
            res.json(pessoaAtualizada)
        } catch (error) {
            next(error)
        }
    }

    static async apagaPessoa (req, res, next) {
        const { id } = req.params

        try {
            const umaPessoa = await Pessoas.findByPk(Number(id))
            if (umaPessoa === null) {
                throw new Error('Não Encontrado!')
            }
            await Pessoas.destroy({ where: { id: Number(id) } })
            res.json({ messagem: `id ${id} deletado!`})
        } catch (error) {
            next(error)
        }
    }

    static async pegaUmaTurma (req, res, next) {
        const { docenteId, turmaId } = req.params

        try {
            const umaTurma = await Turmas.findOne({ where: {
                id: Number(turmaId), docente_id: Number(docenteId) 
            }})
            const umaPessa = await Pessoas.findByPk(Number(docenteId))
            if (umaTurma === null || umaPessa === null) {
                throw new Error('Não Encontrado')
            }
            res.json(umaTurma)
        } catch (error) {
            next(error)
        }
    }

    static async pegaUmaMatricula (req, res, next) {
        const { estudanteId, matriculaId } = req.params

        try {
            const umaMatricula = await Matriculas.findOne({ where: {
                id: Number(matriculaId), estudante_id: Number(estudanteId) 
            }})
            const umaPessa = await Pessoas.findByPk(Number(estudanteId))
            if (umaMatricula === null || umaPessa === null) {
                throw new Error('Não Encontrado')
            }
            res.json(umaMatricula)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = PessoasController