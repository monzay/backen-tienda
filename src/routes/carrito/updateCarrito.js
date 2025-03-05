import express from "express";
import prisma from "../../prisma/client.js";
import autenticarToken from "../../middleware/autenticarToken.js";
import autenticaUsur from "../../middleware/autenticarUsuario.js";
import { resClient } from "../../resClient.js";
const router = express.Router();

// arreglar la logica

router.put('/carritoProducto/:idProducto', autenticarToken, autenticaUsur, async (req, res) => {
    const idProducto = Number(req.params.idProducto);
    const {stock} = req.body;

    try {
        if(!(stock > 0) ){
             resClient(res,200,"no se puede comprar menos de 1 ")
        }
        const productoActualizado = await prisma.carritoProducto.update({
           where:{idProducto},
           data: {stock}
        });
       return  res.status(200).json({
            status: 200,
            mensaje: "Producto actualizado en el carrito con éxito",
            data:productoActualizado
        });
        
    } catch (error) {
        console.error("Error al actualizar el producto del carrito:", error);
        resClient(res, 500, "Error del servidor al actualizar el producto del carrito");
    }
});

export default router;