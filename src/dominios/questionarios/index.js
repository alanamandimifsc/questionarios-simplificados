const { Router } = require('express')
const yup = require('yup')

const QuestionariosControllers = require('./questionarios.controllers')
const { validarSchema } = require('../../middlewares/validacaoRotas')
const { garantirAutenticacao, garantirAutenticacaoRBAC } = require('../../middlewares/garantirAutenticacao')

const questionariosRouter = Router()
const questionariosControllers = new QuestionariosControllers()

const schemaPostQuestionario = yup.object({
    body: yup.object({
        titulo: yup.string().required("Titulo é obrigatório"),
        descricao: yup.string().required("Descrição é obrigatório"),
        perguntas: yup.array(
            yup.object({
                descricao: yup.string().required("Descrição da pergunta pergunta é obrigatória")
            })
        )
    }),
})
const schemaDeleteQuestionario = yup.object({
    params: yup.object({
        id: yup.string().uuid("Id informado não é valido!").required("Id é obrigatório")

    }),
})

questionariosRouter.use(garantirAutenticacaoRBAC('criador'))

questionariosRouter.get('/', questionariosControllers.index
    /*
            #swagger.tags = ['Questionarios']
            #swagger.description = 'Listar questionarios cadastrados'
            #swagger.responses[200] = {
                    description: 'Lista de questionarios obtida com sucesso.'
            }
            #swagger.responses[404] = {
                description: 'Nenhum questionario encontrado.'
            }
        */
)

questionariosRouter.post('/', validarSchema(schemaPostQuestionario), questionariosControllers.create
    /*
            #swagger.tags = ['Questionarios']
            #swagger.description = 'Cadastrar um novo questionario'
            #swagger.parameters.['CriarUsuario'] = {
                in: 'body',
                description: 'Dados do Usuário',
                required: 'true',
                    schema: {
                        $titulo: "Titulo do questionario",
                        $descricao: "Descrição do questionario",
                        $perguntas: "lista das perguntas do questionario"
                    }
            }
            #swagger.responses[201] = {
                    description: 'Questionario cadastrado com sucesso.'
            }
            #swagger.responses[400] = {
                description: 'Dados inválidos'
            }
        */
)

questionariosRouter
    .delete(
        '/:id',
        validarSchema(schemaDeleteQuestionario),
        questionariosControllers.delete
        /*
            #swagger.tags = ['Questionarios']
            #swagger.description = 'Exclui questionarios cadastrados'
            #swagger.parameters['id'] = {
                in: 'path',
                name: 'id',
                description: 'id do questionario a ser excluido',
                type: 'string'
            } 
            #swagger.responses[200] = {
                    description: 'Questionario excluido com sucesso.'
            }
            #swagger.responses[400] = {
                description: 'id invalido'
            }
            #swagger.responses[404] = {
                description: 'Nenhum questionario encontrado com esse id.'
            }
        */
    )

module.exports = questionariosRouter