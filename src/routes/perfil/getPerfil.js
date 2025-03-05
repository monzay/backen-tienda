import express from "express";
import prisma from "../../prisma/client.js";
import autenticarToken from "../../middleware/autenticarToken.js";
import autenticaUsur from "../../middleware/autenticarUsuario.js";
import { resClient } from "../../resClient.js";
const router = express.Router();

// arreglar la logica

router.get('/perfil/:idUser', autenticarToken, autenticaUsur, async (req, res) => {
    const idUser = Number(req.params.idUser);
    try {
        const perfil = await prisma.usuario.findFirst({
            where:{id:idUser},
            select:{
                 nombre:true,
                 email:true,
                 telefono:true,
            },
            include:{
                direcciones:true,
                pedidos:{
                    include:{producto:true}
                },
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