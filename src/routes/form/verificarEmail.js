import express from "express"; 
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { resClient } from "../../resClient.js";
import prisma from "../../prisma/client.js";
import autenticarToken from "../../middleware/autenticarToken.js";

const router = express.Router();
router.post('/verificarEmail',autenticarToken ,async (req, res) => {
    try {
        const {email} = req.body
        if (!email)  resClient(res, 400, "El correo es obligatorio");
    
        // Buscar usuario por correo
        const user = await prisma.usuario.findUnique({ where: { email } });
        if (!user)  res.status(404).json({ message: "Usuario no encontrado" });
    
        // Generar token de recuperación con expiración de 15 min
        const token = jwt.sign({ id: user.id }, process.env.JWT_SCREAT, { expiresIn: "15m" });
    
        // Configuración de transporte para enviar el correo
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          },
        });
    
        const resetLink = `http://localhost:3000/reset-password/${token}`;
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: "Recuperación de contraseña",
          html: `
          <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; text-align: center;">
            <div style="max-width: 600px; background: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); margin: auto;">
              <h2 style="color: #333;">🔒 Restablecer tu Contraseña</h2>
              <p style="color: #666; font-size: 16px;">Hemos recibido una solicitud para restablecer tu contraseña.</p>
              <p style="color: #666; font-size: 16px;">Si no hiciste esta solicitud, ignora este correo.</p>
              <p style="color: #666; font-size: 16px;">Para continuar, haz clic en el siguiente botón:</p>
        
              <a href="${resetLink}" 
                 style="display: inline-block; padding: 12px 24px; font-size: 16px; color: #fff; background: #007bff; text-decoration: none; border-radius: 5px; margin-top: 10px;">
                Restablecer Contraseña
              </a>
        
              <p style="color: #666; font-size: 14px; margin-top: 20px;">Si el botón no funciona, copia y pega el siguiente enlace en tu navegador:</p>
              <p style="word-break: break-word; font-size: 14px; color: #007bff;">${resetLink}</p>
        
              <hr style="margin: 20px 0; border: 0; border-top: 1px solid #ddd;">
              <p style="color: #999; font-size: 12px;">Este enlace expirará en 15 minutos por seguridad.</p>
              <p style="color: #999; font-size: 12px;">© 2025 Tu Empresa. Todos los derechos reservados.</p>
            </div>
          </div>
          `,
        });
        console.log(resetLink)
        resClient(res,201,"Correo de recuperación enviado")
      } catch (error) {
        console.error("Error al enviar el corrError del servidoreo:", error);
        resClient(res,500,"Error del servidor")
      }
});

export default router;
