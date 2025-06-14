// swagger.js
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CareerMentor",
      version: "1.0.0",
      description: "API documentation for your Express project",
    },
    servers: [
      {
        url: "http://localhost:3000", // change to your server URL
      },
    ],
  },
  apis: ["./routes/*.js"], // path to files where APIs are defined using Swagger comments
};


const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
