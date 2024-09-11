import {Request, Response, NextFunction} from 'express'
import { validationResult } from 'express-validator'

export const handleInputErrors = (req:Request, res:Response, next:NextFunction) =>{
    let errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }
    
    // El next basicamente es para decirle a node "Ya termine aqui, sigue con la siguiente funcion" 
    next()
}