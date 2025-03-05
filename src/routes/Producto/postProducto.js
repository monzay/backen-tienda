import express from "express";
import prisma from "../../prisma/client.js";
import autenticarToken from "../../middleware/autenticarToken.js";
import autenticaUsur from "../../middleware/autenticarUsuario.js";
import { resClient } from "../../resClient.js";
import { check, validationResult, body } from 'express-validator';

const router = express.Router();

const validaciones = ()=> {
    [
        body('nombre').not().isEmpty().withMessage('El nombre es requerido'),
        body('img').not().isEmpty().withMessage('La imagen es requerida'),
        body('descripcion').not().isEmpty().withMessage('La descripción es requerida'),
        body('idCategoria').not().isEmpty().withMessage('La categoría es requerida'),
        body('stock').isInt().withMessage('El stock debe ser un número entero'),
        body('stock').isPositive().withMessage('El stock debe ser un número entero positivo'),
        body('precio').isNumeric().withMessage('El precio debe ser un número'),
    ]
}

router.post('/producto', 
    validaciones,
    async (req, res) => {
        const {nombre,descripcion,idCategoria,img,precio,stock} = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resClient(res, 400, 'Errores de validación', errors.array());
        }
        try {
            const producto = await prisma.producto.create({
                data: {
                    nombre,
                    img,
                    descripcion,
                    idCategoria,
                    stock,
                    precio,
                },
            });

            resClient(res, 201, "Producto creado con éxito", producto);
        } catch (error) {
            console.error("Error al crear producto:", error);
            resClient(res, 500, "Error del servidor al crear el producto");
        }
});

export default router;
