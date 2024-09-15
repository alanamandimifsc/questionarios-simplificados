require('dotenv').config()

const database = require('./database/config')
const express = require('express')

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

const usuarioRouter = require('./dominios/usuarios')
const questionariosRouter = require('./dominios/questionarios')
const sessionsRouter = require('./dominios/sessions')
const respostasRouter = require('./dominios/respostas')
const { garantirAutenticacao, garantirAutenticacaoRBAC } = require('./middlewares/garantirAutenticacao')


const app = express()
/** Config */
app.use(express.json()) // middleware => interceptador
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

/** DEFINIÇÃO DE ROTAS */
app.use('/usuarios', usuarioRouter)
app.use('/questionarios', garantirAutenticacao, garantirAutenticacaoRBAC('criador'), questionariosRouter)
app.use('/sessions', sessionsRouter)
app.use('/respostas', garantirAutenticacao, garantirAutenticacaoRBAC('estudante'), respostasRouter)

async function iniciarServidor() {

    await database.authenticate()
    console.log("Banco de dados foi incializado com sucesso!")

    app.listen(3333, () => {

        console.log("Servidor rodando na porta 3333")
    })
}

iniciarServidor()