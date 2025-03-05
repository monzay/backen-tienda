import express from "express"
import bcrypt from 'bcrypt';
const router   = express.Router()
import prisma from "../../prisma/client.js";
import { resClient } from "../../resClient.js";

router.post('/usuarios', async (req, res) => {
   // controlamos todos las execciones 
    try {
      const { nombre, email, contraseña  } = req.body;
    // vemos si ya exite el usuario 
      const usuarioExistente = await prisma.usuario.findUnique({
        where: {
          email
        }
      });

      if (usuarioExistente) {
        return res.status(409).json({ error: 'El usuario ya existe' });
      }
      
      // contraseña 
      const hash = await bcrypt.hash(contraseña, 10);
       await prisma.usuario.create({
        data: {
          nombre,
          email,
          password: hash
        }
      });
      resClient(res,201,"usuario creado con exito")
      
    } catch (error) {
      console.error('Error al crear usuario:', error);
      return res.status(500).json({ error: 'Error al crear usuario' });
    }
  });
  

export default router 