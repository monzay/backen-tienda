import express from "express";
import prisma from "../../prisma/client.js";
import autenticarToken from "../../middleware/autenticarToken.js";
import autenticaUsur from "../../middleware/autenticarUsuario.js";
import { resClient } from "../../resClient.js";
import { param,validationResult } from "express-validator";
const router = express.Router();

const validaciones = [
  param("id").isInt().withMessage("tiene que ser un numero").toInt(),
];

router.delete(
  "/producto/:id",
  autenticarToken,
  autenticaUsur("ADMIN"),
  validaciones,
  async (req, res) => {
    
    const productoId = req.params.id 

     const errores = validationResult(req);
    
        if (!errores.isEmpty()) {
          return res.status(400).json({ errores: errores.array() });
        }

    try {
      const producto = await prisma.producto.delete({
        where: { id: productoId },
      });

      if (!producto) {
        return resClient(res, 404, "Producto no encontrado");
      }

      res.status(201).json({
        status: 201,
        data: producto,
        mensaje: "producto eliminado con exito",
      });

    } catch (error) {
      console.error("Error al eliminar producto:", error);
      resClient(res, 500, "Error al eliminar el producto");
    }
  }
);

export default router;
