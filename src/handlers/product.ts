import {Request, Response} from 'express'
import Product from '../models/Product.model'


export const getProducts = async (req:Request,res:Response)=>{

    const products = await Product.findAll({
        order: [
            ['price', 'DESC']
        ],
        attributes: {exclude: ['createdAt', 'updatedAt'] }
    })
    res.json({data: products})
}


export const getProductById = async (req:Request,res:Response)=>{

    // console.log('desde getProductById')
    console.log(req.params.id)
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        return res.status(404).json({error: 'Producto no encontrado'})
    }

    res.json({data: product})
}




export const createProduct = async (req:Request,res:Response)=>{

    const product = await  Product.create(req.body)
        
    res.status(201).json({data: product})
    

    
}

export const updatedProduct = async  (req: Request,res:Response)=>{

    try {
        
        const { id } = req.params
        const product = await Product.findByPk(id)

        if (!product) {
            return res.status(404).json({error: 'Producto no encontrado'})
        }

        //Actualizar
        // console.log(req.body)

        await product.update(req.body)
        await product.save()
        res.json({data: product})
    } catch (error) {
        
    }
}

export const updateAvailability = async (req:Request,res:Response)=>{

        const { id } = req.params
        const product = await Product.findByPk(id)

        if (!product) {
            return res.status(404).json({error: 'Producto no encontrado'})
        }

        //Actualizar
        // console.log(req.body)

        // El update solo se actualiza lo que le mandes, peor cuando trabajas con put, tienes que actualizar todo, pero ahorita solo actualizamos lo que enviamos, por medio del update
        product.availability = !product.dataValues.availability
        await product.save()

        console.log(product.dataValues.availability)
        res.json({data: product})
}


export const deleteProdudct = async (req:Request, res:Response) =>{
        const { id } = req.params
        const product = await Product.findByPk(id)

        if (!product) {
            return res.status(404).json({error: 'Producto no encontrado'})
        }

        await product.destroy()
        res.json({data: 'Producto eliminado'})

        
}


