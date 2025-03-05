import express from "express";
import prisma from "../../prisma/client.js";
import autenticarToken from "../../middleware/autenticarToken.js";
import autenticaUsur from "../../middleware/autenticarUsuario.js";
import { resClient } from "../../resClient.js";
const router = express.Router();

// arreglar la logica

router.delete('/carritoProducto/:idProducto', autenticarToken, autenticaUsur, async (req, res) => {
    const idProducto = Number(req.params.idProducto);

    // Validar que carritoId y productoId sean números válidos
    if (isNaN(idProducto)) {
        return resClient(res, 400, "no se encuentra el producto en el carrito");
    }
    
    try {
        const productoEliminado = await prisma.carritoProducto.delete({
           where:{idProducto}
        });

        
       return  res.status(200).json({
            status: 200,
            mensaje: "Producto eliminado del carrito con éxito",
            data:productoEliminado
        });
        
    } catch (error) {
        console.error("Error al eliminar el producto del carrito:", error);
        resClient(res, 500, "Error del servidor al eliminar el producto del carrito");
    }
});

export default router;