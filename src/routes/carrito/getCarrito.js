import express from "express";
import prisma from "../../prisma/client.js";
import autenticarToken from "../../middleware/autenticarToken.js";
import autenticaUsur from "../../middleware/autenticarUsuario.js";
import { resClient } from "../../resClient.js";
const router = express.Router();

router.get('/carrito', autenticarToken, autenticaUsur, async (req, res) => {
    try {
        const productos = await prisma.carrito.findMany();
        if (!productos || productos.length === 0) {
            return resClient(res, 404, "Carrito vacío ");
        }
        return res.status(200).json({
            status: 200,
            data: productos,
            mensaje: "Carrito obtenido con éxito"
        });
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
        resClient(res, 500, "Error del servidor al obtener el carrito");
    }
});

export default router;
