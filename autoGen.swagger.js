const swaggerAutogen = require('swagger-autogen')();
const doc = {
    info: {
        title: "API robusta e simplificada para a gestão de enquetes",
        description: "O objetivo do projeto foi construir uma API robusta e simplificada para a gestão de enquetes. A API permite a criação e gerenciamento de questionários, bem como a vinculação de perguntas e respostas, tudo com um forte foco na segurança e na validação de dados",
    },
    host: "localhost:3333",
    security: [{ "apiKeyAuth": [] }],
    securityDefinitions: {
        apiKeyAuth: {
            type: "apiKey",
            in: "header",
            name: "Authorization",
            description: "Bearer <token>"
        }
    },
};

const outputFile = './swagger_output.json';
const routes = ['./src/server.js'];

swaggerAutogen(outputFile, routes, doc);
