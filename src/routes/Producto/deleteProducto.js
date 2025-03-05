import express from "express";
import prisma from "../../prisma/client.js";
import autenticarToken from "../../middleware/autenticarToken.js";
import autenticaUsur from "../../middleware/autenticarUsuario.js";
import { resClient } from "../../resClient.js";

const router = express.Router();
router.delete('/producto/:id', autenticarToken, autenticaUsur, async (req, res) => {
    const productoId = Number(req.params.id);

    // Validar que productoId sea un número válido
    if (isNaN(productoId)) {
        return resClient(res, 400, "ID de producto inválido");
    }
    try {
        const producto = await prisma.producto.delete({
            where: { id: productoId }
        });

        if (!producto) {
            return resClient(res, 404, "Producto no encontrado");
        }
        res.status(201).json({
            status:201,
            data:producto,
            mensaje:"producto eliminado con exito"
        })

    } catch (error) {
        console.error("Error al eliminar producto:", error);
        resClient(res, 500, "Error al eliminar el producto");
    }
});

export default router;
