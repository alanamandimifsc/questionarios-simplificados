const { Router } = require('express')
const yup = require('yup')

const UsuariosControllers = require('./usuarios.controllers')
const { validarSchema } = require('../../middlewares/validacaoRotas')
const usuarioRouter = Router()
const usuariosControllers = new UsuariosControllers()

const schemaPostUsuario = yup.object({
    body: yup.object({
        nome: yup.string().required("Nome é obrigatório"),
        sobrenome: yup.string(),
        email: yup.string().email("E-mail informado não é valido").required("Email é obrigatório"),
        senha: yup.string().min(3, "Minimo de 3 caracteres").max(16, "Maximo de 16 caracteres").required("Senha é obrigatória"),
        permissao: yup.string().oneOf(['criador', 'estudante']).required("Permissão é obrigatória"),
    }),
})

usuarioRouter.get('/', usuariosControllers.index
    /*
       #swagger.tags = ['Usuários']
       #swagger.description = 'Listar usuarios cadastrados'
       #swagger.responses[200] = {
               description: 'Lista de usuários obtida com sucesso.'
           }
       }
       #swagger.responses[404] = {
           description: 'Nenhum usuário encontrado.'
       }
   */
)

usuarioRouter.post('/', validarSchema(schemaPostUsuario), usuariosControllers.create
    /*
                #swagger.tags = ['Usuários']
                #swagger.description = 'Endpoint para cadastrar usuarios'
                #swagger.parameters.['CriarUsuario'] = {
                    in: 'body',
                    description: 'Dados do Usuário',
                    required: 'true',
                    schema: {
                        $nome: "Usuário X",
                        $sobrenome: "sobrenome do Usuario X",
                        $email: "email@email.com",
                        $senha: "senha",
                        $permissao: "estudante / criador"
                    }
                }
                #swagger.responses[201] = {
                        description: 'Usuário criado com sucesso'
                    }
                #swagger.responses[400] = {
                    description: 'Dados Inválidos'
                }
            */
)

usuarioRouter.delete('/:id', usuariosControllers.delete
    /*
            #swagger.tags = ['Usuários']
            #swagger.description = 'Endpoint para deletar usuarios'
            #swagger.parameters.['id'] = {
                in: 'path',
                name: 'id',
                description: 'id do usuário que vai ser excluido',
                type: 'string'
            }
            #swagger.responses[204] = {
                    description: 'Usuário excluido com sucesso'
            }
            #swagger.responses[400] = {
                description: 'Id invalido'
            }
            #swagger.responses[404] = {
                description: 'Id não encontrado ou inexistente'
            }
    */
)


module.exports = usuarioRouter