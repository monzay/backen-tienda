import express from "express";
import prisma from "../../prisma/client.js";
import autenticarToken from "../../middleware/autenticarToken.js";
import autenticaUsur from "../../middleware/autenticarUsuario.js";
import { resClient } from "../../resClient.js";
const router = express.Router();

router.get('/producto',autenticarToken , autenticaUsur,async (req, res) => {
    try {
        const productos =   await prisma.producto.findMany()
        res.status(201).json({
         status:201,
         data:productos
        })
    } catch (error) {
         console.log(error);
         resClient(res,500,"error del servidor")
            }
});

export default router;
