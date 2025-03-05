import jwt from "jsonwebtoken"
import { resClient } from "../resClient.js"

const autenticarToken =(req,res,next)=> {
     try {
        const tokenBearer = req.header("Authorization")
        if(tokenBearer) {
            const tokenString = tokenBearer.split(" ")[1]
            const tokenDecodificado =  jwt.verify(tokenString,process.env.JWT_SCREAT)
            req.user = tokenDecodificado  
            next()
        }else{
            resClient(res,401,"Acceso denegado. Token no proporcionado.")
     }
       
       
     } catch (error) {
        console.log(error)
        resClient(res,401,"token invalido")
     }
   
    

    
    
}

export default autenticarToken