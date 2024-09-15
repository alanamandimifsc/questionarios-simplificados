const { Router } = require('express')
const yup = require('yup')

const RespostasControllers = require('./respostas.controllers')
const { validarSchema } = require('../../middlewares/validacaoRotas')
const { garantirAutenticacaoRBAC, garantirAutenticacao } = require('../../middlewares/garantirAutenticacao')

const respostasRouter = Router()
const respostasControllers = new RespostasControllers()

// const schemaPostQuestionario = yup.object({
//     body: yup.object({
//         titulo: yup.string().required("Titulo é obrigatório"),
//         descricao: yup.string().required("Descrição é obrigatório"),
//         perguntas: yup.array(
//             yup.object({
//                 descricao: yup.string().required("Descrição da pergunta pergunta é obrigatória")
//             })
//         )
//     }),
// })
// const schemaDeleteQuestionario = yup.object({
//     params: yup.object({
//         id: yup.string().uuid("Id informado não é valido!").required("Id é obrigatório")

//     }),
// })

// respostasRouter.use(garantirAutenticacaoRBAC('criador'))

// respostasRouter.get('/', respostasControllers.index)
// respostasRouter.use(garantirAutenticacaoRBAC('estudante'))
respostasRouter.post('/:perguntaId', respostasControllers.create
    /*
    #swagger.tags = ['Respostas']
    #swagger.description = 'Cadastrar respostas'
    #swagger.parameters.['perguntaId'] = {
            in: 'path',
            name: 'perguntaId',
            description: 'id da pergunta que vai ser respondida',
            type: 'string'
    }
    #swagger.parameters.['CriarResposta'] = {
        in: 'body',
        description: 'Dados da resposta',
        required: 'true',
            schema: {
                $conteudo: "Conteudo da resposta"
            }
    }
    #swagger.responses[201] = {
            description: 'Pergunta cadastrada com sucesso.'
    }
    #swagger.responses[400] = {
        description: 'Dados inválidos'
    }
*/
)

// respostasRouter
// .delete(
//     '/:id', 
//     validarSchema(schemaDeleteQuestionario), 
//     respostasControllers.delete
// )

module.exports = respostasRouter