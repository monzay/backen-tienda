import express from "express";
import prisma from "../../prisma/client.js";
import autenticarToken from "../../middleware/autenticarToken.js";
import autenticaUsur from "../../middleware/autenticarUsuario.js";
import { resClient } from "../../resClient.js";
import { param } from "express-validator";

const router = express.Router();


const validacion = () => {
    param("idDireccion").isInt().withMessage("El id de la dirección debe ser un número entero").toInt();
}

router.put(
    "/direciones/:idDireccion", // Cambié a usar el parámetro de ruta
    validacion(),
    autenticarToken,
    autenticaUsur,
    async (req, res) => {
      
      try {
          const { idDireccion } = req.params.idDireccion; 
          const { nombre, barrio, telefono, codigoPostal, pais, ciudad, provincia, calle, numero, referencia, tipo } = req.body; // Obtener los datos de la dirección desde el cuerpo de la solicitud

          const direccionActualizada = await prisma.direcciones.update({
              where: { id:idDireccion }, 
              data: {
                  nombre,
                  barrio,
                  telefono,
                  codigoPostal,
                  pais,
                  ciudad,
                  provincia,
                  calle,
                  numero,
                  referencia,
                  tipo,
              },
          });
  
          return res.status(200).json({
              status: 200,
              data: direccionActualizada,
              mensaje: "Dirección actualizada con éxito"
          });
      } catch (error) {
          console.error("Error al actualizar la dirección:", error);
          resClient(res, 500, "Error al actualizar la dirección");
      }
    }
  );

export default router;
