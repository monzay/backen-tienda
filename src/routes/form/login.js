import jwt from "jsonwebtoken"; 
import bcrypt from "bcrypt"; 
import express from "express"; 
import { body, validationResult } from "express-validator"; 
const router = express.Router(); 
import prisma from "../../prisma/client.js";
import { resClient } from "../../resClient.js";

router.post('/login', 
    // Validaciones con express-validator
    body('email').isEmail().withMessage('Email inválido'),
    body('contraseña').notEmpty().withMessage('La contraseña es requerida'),
    async (req, res) => {
        // Manejo de errores de validación
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        

        try {
            const { email, contraseña } = req.body;
            const usuario = await prisma.usuario.findUnique({
                where: { email }
            });

            // Verificar si el usuario existe
            if (!usuario) {
              resClient(res,401,"El correo  no existe")
            }
            const validacionContraseña =  await bcrypt.compare(contraseña, usuario.password);
      
            if(!validacionContraseña){
              resClient(res,200,"la contraseña es incorrecta")
            }

            const token = jwt.sign({
               id: usuario.id,
               email: usuario.email,
               nombre: usuario.nombre,
               rol: usuario.rol
               }
               ,process.env.JWT_SCREAT,
              { expiresIn: '1d' });
              // enviamos el token al cliente 
            res.json({ token });
            
            
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            return res.status(500).json({ error: 'Error al iniciar sesión' });
        }
    }
);

export default router;
