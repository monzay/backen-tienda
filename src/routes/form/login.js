import jwt from "jsonwebtoken" 
import bcrypt from "bcrypt"
import express from "express" 
import autenticarUser from "../../middleware/autenticarUser";
import prisma from "../../prisma/client"
const router   = express.Router()

router.post('/login', autenticarUser, async (req, res) => { 
    try {
      // Obtener el email y la contraseña del cuerpo de la solicitud
      const { email, contraseña } = req.body;
      // Buscar el usuario por email en la base de datos
      const usuario = await prisma.usuario.findUnique({
        where: {
          email
        } 
      });

      // Si no se encuentra el usuario, devolver un error
      if (!usuario) {
        return res.status(401).json({ error: 'el usuario ya existe' });
      }
      
      // Comparar la contraseña proporcionada con la contraseña hasheada del usuario
      const isMatch = await bcrypt.compare(contraseña, usuario.contraseña);
      // Si las contraseñas no coinciden, devolver un error
      if (!isMatch) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }
      // Generar un token de autenticación para el usuario
      const token = jwt.sign({ id: usuario.id, email: usuario.email }, 'secret');
      // Devolver el usuario y el token de autenticación
      res.json({ usuario, token });
       
    } catch (error) {
      // Loggear el error en la consola
      console.error('Error al iniciar sesión:', error);
      // Devolver un error al cliente
      return res.status(500).json({ error: 'Error al iniciar sesión' });
    }
  });

  // Exportación del router para su uso en otros módulos
  export default router

