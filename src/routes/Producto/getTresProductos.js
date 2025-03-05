import express from "express";
import prisma from "../../prisma/client.js";
import autenticarToken from "../../middleware/autenticarToken.js";
import autenticaUsur from "../../middleware/autenticarUsuario.js";
import { resClient } from "../../resClient.js";
const router = express.Router();

router.get('/producto',autenticarToken , autenticaUsur,async (req, res) => {
    try {
        const productos =   await prisma.pedido.groupBy({
            by:["idProducto"],
            _sum:{stock:true},
            orderBy:{
                _sum:{
                    stock:"desc"
                }
            },
            take:3
        })
        res.status(201).json({
         status:201,
         data:productos,
         mensaje:"Se mando con exito los 3 productos mas comprados "
        }) 
    } catch (error) {
         console.log(error);
         resClient(res,500,"error al enviar los 3 productos")
            }
});

export default router;
