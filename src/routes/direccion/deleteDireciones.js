import express from "express";
import prisma from "../../prisma/client.js";
import autenticarToken from "../../middleware/autenticarToken.js";
import autenticaUsur from "../../middleware/autenticarUsuario.js";
import { resClient } from "../../resClient.js";
import { body, param, validationResult } from "express-validator";

const router = express.Router();

router.delete(
  "/direciones:idDirecion",
  param("idDireccion").isInt().withMessage("el id debe ser un numero entero").toInt(),
  autenticarToken,
  autenticaUsur,
  async (req, res) => {
    const idDireccion = req.params.idDireccion
    

     const error = validationResult(req);
     if(!error.isEmpty){
        return res.status(400).json({error:error.array()})
     }
    try {
         await prisma.direcciones.delete({
            where:{id:idDireccion},
        })
        
        const direciones =  await prisma.direcciones.findMany({
            where:{usuarioId:idUser}
        })
        
        return res.status(201).json({
            status:201,
            data:direciones,
            mensaje:"se elimino con exito "
        })


    } catch (error) {
      console.error("error al eliminar la direccion:", error);
      resClient(res, 500, "error al eliminar la direccion ");
    }
  }
);

export default router;
