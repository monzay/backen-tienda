import jwt from "jsonwebtoken"
import { resClient } from "../resClient.js"

const autenticaUsur = (rol)=>{
   return  (req,res,next)=> {
      try {
         const tokenBearer = req.header("Authorization")
         if(tokenBearer) {
             const tokenString = tokenBearer.split(" ")[1]
             const tokenDecodificado =  jwt.verify(tokenString,process.env.JWT_SCREAT)
             
             if(tokenDecodificado.rol === rol ) next()
             else  resClient(res,401,"Usuario denegado ")
         }
      } catch (error) {
         console.log(error)
         resClient(res,401,"token invalido")
      }
 }
}




export default autenticaUsur