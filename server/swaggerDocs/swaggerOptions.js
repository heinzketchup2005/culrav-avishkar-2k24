// swaggerDocs/swaggerOptions.js
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Avishkar API Docs',
    version: '1.0.0',
    description: 'An API Docs for the Avishkar-Culrav',
    contact: {
      name: 'Your Name',
      email: 'your-email@example.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./swaggerDocs/swaggerDocs.js'], // Ensure this path is correct
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;