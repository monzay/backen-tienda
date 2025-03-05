import express from "express";
import prisma from "../../prisma/client.js";
import autenticarToken from "../../middleware/autenticarToken.js";
import autenticaUsur from "../../middleware/autenticarUsuario.js";
import { resClient } from "../../resClient.js";
import { body ,validationResult} from "express-validator";

const router = express.Router();


const validaciones = ()=> {
    body('nombre').isString().notEmpty().withMessage('El nombre es obligatorio.')
    body('telefono').isString().notEmpty().withMessage('El teléfono es obligatorio.')
}

router.put('/pefil/:idUser',validaciones, autenticarToken, autenticaUsur, async (req, res) => {
    const idUser = Number(req.params.idUser);
    const {nombre,telefono} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            status: 400, 
            errors: errors.array() 
        });
    }
    
    try {
        const perfil = await prisma.usuario.put({
            where:{id:idUser},
            data:{
                nombre,
                telefono,
            }
        })
        
        return res.status(201).json({
            status:201,
            data:perfil,
            mensaje:"datos del perfil envioado con exito "
        })
    } catch (error) {
        console.error("erro al mandar los datos del perfil:", error);
        resClient(res, 500, "rro al mandar los datos del perfil");
    }
});

export default router;