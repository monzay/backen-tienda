import express from "express";
import prisma from "../../prisma/client.js";
import autenticarToken from "../../middleware/autenticarToken.js";
import autenticaUsur from "../../middleware/autenticarUsuario.js";
import { resClient } from "../../resClient.js";

const router = express.Router();
router.get(
  "/direciones",
  autenticarToken,
  autenticaUsur,
  async (req, res) => {
    // dato token user 
    const usuarioId = req.user.id
    try {
        const direciones = await prisma.direcciones.findMany({
            where:{usuarioId,}
         })
         
         return res.status(201).json({
            status:201,
            data:direciones,
            mensaje:"direciones enviodo con exito "
         })


    } catch (error) {
      console.error("error al eviar las direcciones:", error);
      resClient(res, 500, "error al eviar las direcciones ");
    }
  }
);

export default router;
