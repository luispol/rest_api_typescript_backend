import swaggerJSDoc, { SwaggerDefinition } from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";


const options: swaggerJSDoc.Options= {
    swaggerDefinition:{
        openapi:'3.0.2',
        tags: [
            {
                name:'Products',
                description:'API operations related to products'
            }
        ],
        info: {
            title: 'REST API Node.js / Express / TypeScript',
            version: "1.0.0",
            description: "API Docs for Products"

        }
    },
    apis: ['./src/router.ts'], 
}

const swaggerSpec = swaggerJSDoc(options)

const swaggerUiOptions : SwaggerUiOptions = {
    customCss: `
        .topbar-wrapper .link{
            content: url('https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.wikipedia.org%2Fwiki%2FTypeScript&psig=AOvVaw3uo0-ov-PLMU1_tbBoEpYs&ust=1726069376337000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLCFp9LbuIgDFQAAAAAdAAAAABAE')
            height: 120px;
            wdith: auto;
        },
        swagger-ui .topbar {
            background-color: #2b3b45;
        }
    `,
    customSiteTitle: 'Documentacion REST API Express / TypeScript'

}
export default swaggerSpec

export {
    swaggerUiOptions
}