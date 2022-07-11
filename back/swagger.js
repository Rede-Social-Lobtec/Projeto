const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
      title: 'Rede Social',
      description: 'API de manipulação de dados do sistema de Rede Social.',
    },
    host: 'localhost:8686',
    schemes: ['http']
};

const outputFile = './swagger/swagger_output.json';
const endpointsFiles = ['./index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);