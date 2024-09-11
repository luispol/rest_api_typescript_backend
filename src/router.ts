import { Router } from 'express';
import {body, param} from 'express-validator'
import { createProduct, deleteProdudct, getProductById, getProducts, updateAvailability, updatedProduct } from './handlers/product';
import { handleInputErrors } from './middleware';

// De esta forma vamos a mandar a llmar a todas las funciones del roputer de express
const router = Router()

/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name: 
 *                      type: string
 *                      description: The Product name
 *                      example: Monitor curvo de 49 pulgadas
 *                  price:
 *                      type: number
 *                      description: The Product price
 *                      example: 300
 *                  availability:
 *                      type: boolean
 *                      description: The Product availability
 *                      example: true
 */

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags: 
 *              - Products
 *          description: Return a list of products
 *          responses: 
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array 
 *                              items: 
 *                                  $ref: '#/components/schemas/Product'
 */

//Routing
// El request, es lo que nosotros enviamos
// El response, es lo que nosotros recibimos cuadno enviamos este request
router.get('/', getProducts)


/**
 * @swagger
 * /api/products/{id}:
 *  get: 
 *      summary: Get a product by ID
 *      tags:
 *          - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrive
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful response
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Product not found
 * 
 *          400:
 *              description: Bad request
 * 
 * 
 * 
 * 
 */

// El :id es un parametro que se envia por la url
router.get('/:id', 
    
    param('id').isInt().withMessage('ID no valido'),
    // Si un dado caso falla la validacion, le pasa los errrores a la funcion handleInputErrors que esta en nuestro middleware
    handleInputErrors,
    getProductById)



/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Create a new product
 *      tags:
 *         - Products
 *      description: Return a new record in the database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor curvo 49 pulgadas"
 *                          price: 
 *                              type: number
 *                              example: 300
 *      responses:
 *          201:
 *          description: Successfull response
 *          content: 
 *              content/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad request - invalid input data
 * 
 *          
 * 
 * 
 * 
 * 
 * 
 */

router.post('/', 

    //Validacion de los datos que se envian
    body('name').notEmpty().withMessage('El nombre del Producto no puede ir vacio'),
    body('price').isNumeric().withMessage('Valor no valido').notEmpty(). withMessage('El precio de Producto no puede ir vacio').
        custom(value => value >0).withMessage('El precio de Produto no puede ir vacio'),
    handleInputErrors,                 
    createProduct)

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *    summary: Update a product
 *    tags:
 *      - Products
 *    description:  Returns the updated product
 *    parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrive
 *          required: true
 *          schema:
 *              type: integer
 *    requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor curvo 49 pulgadas"
 *                          price: 
 *                              type: number
 *                              example: 300
 *                          availability:
 *                              type: boolean
 *                              example: true
 * 
 *    responses:
 *      200:
 *          description: Successfull response
 *          content: 
 *              content/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Product'
 * 
 *      400:
 *          description: Bad request - invalid ID or invalid input data
 *      404:
 *          description: Product not found
 * 
 * 
 * 
 * 
 */


router.put('/:id',
    param('id').isInt().withMessage('ID no valido'),
    body('name').notEmpty().withMessage('El nombre del Producto no puede ir vacio'),
    body('price').isNumeric().withMessage('Valor no valido').notEmpty(). withMessage('El precio de Producto no puede ir vacio').
        custom(value => value >0).withMessage('El precio de Produto no puede ir vacio'),
    body('availability').isBoolean().withMessage('Valor para disponibilidad no valido'),
    handleInputErrors,
    updatedProduct)



/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Update the availability of a product
 *      tags:
 *          - Products
 *      description: Returns the updated product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to retrive
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *         200:
 *          description: Successfull response
 *          content: 
 *              content/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Product'
 *         400:
 *          description: Bad request - invalid ID
 *         404:
 *          description: Product not found
 *      
 *          
 * 
 * 
 * 
 * 
 */

router.patch('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    updateAvailability )



/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *    summary: Delete a product by a given ID
 *    tags:
 *     - Products
 *    description: Returns a message of confirm delete
 *    parameters:
 *        - in: path
 *          name: id
 *          description: The ID of the product to delete
 *          required: true
 *          schema:
 *              type: integer
 *    responses:
 *         200:
 *          description: Successfull response
 *          content: 
 *              content/json:
 *                  schema:
 *                      type: string
 *                      value: 'Prodcto eliminado'
 *         400:
 *          description: Bad request - invalid ID
 *         404:
 *          description: Product not found
 */

router.delete('/:id',
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,
    deleteProdudct
)


export default router