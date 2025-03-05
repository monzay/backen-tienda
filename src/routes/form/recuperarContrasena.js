import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { resClient } from "../../resClient.js";
import prisma from "../../prisma/client.js";

const router = express.Router();

router.post('/resetPassword/:token', async (req, res) => {
  const { nuevaContra } = req.body;
  const tokenUrl = req.params.token;

  try {
    // Verificar el token JWT
    const decoded = jwt.verify(tokenUrl, process.env.JWT_SCREAT);

    // Verificar si el usuario existe en la base de datos
    const user = await prisma.usuario.findUnique({
      where: { id: decoded.id }
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(nuevaContra, 10);

    // Actualizar la contraseña del usuario
    await prisma.usuario.update({
      where: { id: decoded.id },
      data: { password: hashedPassword },
    });

    // Responder al cliente
    resClient(res, 201, "Contraseña cambiada con éxito");
  } catch (error) {
    console.error("Error al actualizar la contraseña:", error);
    resClient(res,500,"token invalido")
  }
});

export default router;
