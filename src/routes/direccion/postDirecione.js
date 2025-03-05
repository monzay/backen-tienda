import express from "express";
import prisma from "../../prisma/client.js";
import autenticarToken from "../../middleware/autenticarToken.js";
import autenticaUsur from "../../middleware/autenticarUsuario.js";
import { resClient } from "../../resClient.js";
import { body, param, validationResult } from "express-validator";

const router = express.Router();

const validaciones = () => {
  body("nombre").isString().notEmpty().withMessage("El nombre es obligatorio.");
  body("telefono").isString().notEmpty().withMessage("El teléfono es obligatorio.");
  body("barrio").isString().notEmpty().withMessage("El barrio es obligatorio.");
  body("codigoPostal").isInt().notEmpty().withMessage("El código postal es obligatorio.");
  body("pais").isString().notEmpty().withMessage("El país es obligatorio.");
  body("cuidad").isString().notEmpty().withMessage("La ciudad es obligatoria.");
  body("provincia").isString().optional();
  body("calle").isString().notEmpty().withMessage("La calle es obligatoria.");
  body("numero").isString().optional();
  body("referencia").isString().optional();
  body("tipo").isString().optional();
};

router.post(
  "/direciones",
  validaciones,
  autenticarToken,
  autenticaUsur,
  async (req, res) => {
     const {
      nombre,
      telefono,
      barrio,
      codigoPostal,
      pais,
      cuidad,
      provincia,
      calle,
      numero,
      referencia,
      tipo
    } = req.body;

    // dato token user 
    const usuarioId = req.user.id
    const errors = validationResult(req);

    // validacion
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        errors: errors.array(),
      });
    }

    try {
     await prisma.direcciones.create({
         data:{
          usuarioId,
          nombre,
          telefono,
          barrio,
          codigoPostal,
          pais,
      cuidad,
      provincia,
      calle,
      numero,
      referencia,
      tipo,
         }
      });

      resClient(res,201,"se creo la direccion con exito ")


    } catch (error) {
      console.error("error al crear la direccion:", error);
      resClient(res, 500, "error al crear la direccion ");
    }
  }
);

export default router;
