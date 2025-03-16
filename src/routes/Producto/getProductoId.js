import express from "express";
import prisma from "../../prisma/client.js";
import { resClient } from "../../resClient.js";
import { param, validationResult } from "express-validator";

const router = express.Router();

const validaciones = [
  param("id").isInt().withMessage("tiene que ser un numero").toInt(),
];

router.get(
  "/producto/:id",
  validaciones,
  async (req, res) => {
    const productoId = req.params.id;


    const errores = validationResult(req);

    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    try {
        
      const producto = await prisma.producto.findFirst({
        where: { id: productoId },
      });

      if (!producto) {
        return resClient(res, 404, "Producto no encontrado");
      }
     return  res.status(200).json(producto)
     
    } catch (error) {
      console.error("Error al obtener producto:", error);
      resClient(res, 500, "Error del servidor");
    }
  }
);

export default router;
