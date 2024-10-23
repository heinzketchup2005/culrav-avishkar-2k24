// swaggerDocs/swaggerOptions.js
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Your API',
    version: '1.0.0',
    description: 'A sample API',
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
