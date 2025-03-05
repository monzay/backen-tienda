import express from "express";
import prisma from "../../prisma/client.js";
import autenticarToken from "../../middleware/autenticarToken.js";
import autenticaUsur from "../../middleware/autenticarUsuario.js";
import { resClient } from "../../resClient.js";

const router = express.Router();

router.get('/producto/:id', autenticarToken, autenticaUsur, async (req, res) => {
    const productoId = Number(req.params.id);

    // Validar que productoId sea un número válido
    if (isNaN(productoId)) {
        return resClient(res, 400, "ID de producto inválido");
    }

    try {
        const producto = await prisma.producto.findFirst({
            where: { id: productoId }
        });

        if (!producto) {
            return resClient(res, 404, "Producto no encontrado");
        }

        resClient(res, 200, "Producto encontrado", producto);
    } catch (error) {
        console.error("Error al obtener producto:", error);
        resClient(res, 500, "Error del servidor");
    }
});

export default router;
