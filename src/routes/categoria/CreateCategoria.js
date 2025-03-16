import express from "express";
import prisma from "../../prisma/client.js";
import { body, validationResult } from "express-validator";
import { resClient } from "../../resClient.js";

const router = express.Router();

const validaciones = [
  body("nombre")
    .notEmpty()
    .withMessage("El nombre es requerido")
    .trim()
    .toLowerCase(),
];

router.post("/categoria", validaciones, async (req, res) => {

  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { nombre } = req.body;

  try {
    const categoria = await prisma.categoria.findFirst({
      where: { nombre },
    });

    if (categoria &&  categoria.nombre === nombre) {
      return resClient(res, 400, "ya exite la categoria");
    }

    await prisma.categoria.create({
        data:{nombre}
    })

    return  resClient(res, 201, "Se creo la categoria con exito");
  } catch (error) {
    console.log(error), resClient(res, 500, "error al crear la categoria ");
  }
});

export default router;
