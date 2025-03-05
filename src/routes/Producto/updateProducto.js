import express from "express";
import prisma from "../../prisma/client.js";
import autenticarToken from "../../middleware/autenticarToken.js";
import autenticaUsur from "../../middleware/autenticarUsuario.js";
import { resClient } from "../../resClient.js";

const router = express.Router();
router.put('/producto/:id', autenticarToken, autenticaUsur, async (req, res) => {
    const productoId = Number(req.params.id);
    const { nombre, descripcion, precio,idCategoria,stock,img } = req.body;

    // Validar que productoId sea un número válido 
    if (isNaN(productoId)) {
        return resClient(res, 400, "ID de producto inválido");
    }
    try {
        const producto = await prisma.producto.update({
            where: { id: productoId },
            data: {
                nombre,
                descripcion,
                precio,
                idCategoria,
                stock,
                img,
            }
        });

        if (!producto) {
            return resClient(res, 404, "Producto no encontrado");
        }
        res.status(200).json({
            status:200,
            data:producto
        })

    } catch (error) {
        console.error("Error al actualizar producto:", error);
        resClient(res, 500, "Error al actualizar el producto");
    }
});

export default router;
