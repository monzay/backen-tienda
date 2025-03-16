import express from "express";
import { body, validationResult } from "express-validator";
import prisma from "../../prisma/client.js";
import { resClient } from "../../resClient.js";
import autenticaUsur from "../../middleware/autenticarUsuario.js";
import autenticarToken from "../../middleware/autenticarToken.js";
import multer from "multer";
import cloudinary_nube from "../cloudinary.js";
import path from "path"
import { fileURLToPath } from "url";
import fs from "fs";
const router = express.Router();

const validaciones = [
  body("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 3 })
    .withMessage("El nombre debe tener al menos 3 caracteres")
    .toLowerCase()
    .trim(),
  body("descripcion")
    .notEmpty()
    .withMessage("La descripción es obligatoria")
    .isLength({ min: 10 })
    .withMessage("La descripción debe tener al menos 10 caracteres")
    .toLowerCase()
    .trim(),
   body("idCategoria")
    .notEmpty()
    .withMessage("La categoría es obligatoria")
    .isInt()
    .withMessage("La categoría debe ser un número entero"), 
  body("precio")
    .notEmpty()
    .withMessage("El precio es obligatorio")
    .isFloat({ min: 0 })
    .withMessage("El precio debe ser un número mayor o igual a 0"),
  body("stock")
    .notEmpty()
    .withMessage("El stock es obligatorio")
    .isInt({ min: 0 })
    .withMessage("El stock debe ser un número entero mayor o igual a 0"),
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const directorioTemporal = path.join(__dirname, "imgTemporales");



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, directorioTemporal);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

  const eliminarImgTemporal = (pathImgTemporal ) => {
    fs.unlinkSync(pathImgTemporal, (err) => {
      if (!err) {
        console.log("Imagen eliminada con éxito:", pathImgTemporal);
      } else {
        console.error("Error al eliminar la imagen:", err);
      }
    });
  };

   
  const crearCarpeta = () =>{
    if (!fs.existsSync(directorioTemporal)) {
      fs.mkdirSync(directorioTemporal, { recursive: true });
    }
  }


router.post(
  "/producto",
  upload.single("img"),
  validaciones,
  autenticarToken,
  autenticaUsur("ADMIN"),
  async (req, res) => {
    const { nombre, descripcion, idCategoria, precio, stock } = req.body;

    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errores: error.array() });
    }

    // validamos si se mando una img 
    if (!req.file) {
      return res.status(400).json({ message: "No se ha subido ninguna imagen" });
    }

    await crearCarpeta()

   // await cloudinary_nube()
   const pathfile = path.join(directorioTemporal, req.file.filename);
    const imgUrl =  await cloudinary_nube(pathfile) 
    try {
      await prisma.producto.create({
        data: {
          nombre,
          img: imgUrl.url,
          descripcion,
          idCategoria,
          precio,
          stock,
        },
      });
    
      await  eliminarImgTemporal(pathfile);


      return  resClient(res, 201, "se a creado el producto con exito");
    } catch (error) {
      console.log(error);
      return  resClient(res, 500, error);
    }
  }
);

export default router;
