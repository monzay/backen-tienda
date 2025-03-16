import express from "express";
import prisma from "../../prisma/client.js";
import autenticarToken from "../../middleware/autenticarToken.js";
import autenticaUsur from "../../middleware/autenticarUsuario.js";
import { resClient } from "../../resClient.js";
import { param, validationResult } from "express-validator";
import multer from "multer";
import cloudinary_nube from "../cloudinary.js";
const router = express.Router();

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

const validaciones = [
    param("id")
      .isInt().withMessage("El parámetro debe ser un número entero")
      .toInt(),
  ];
    const eliminarImgTemporal = (pathImgTemporal ) => {
      fs.unlinkSync(pathImgTemporal, (err) => {
        if (!err) {
          console.log("Imagen eliminada con éxito:", pathImgTemporal);
        } else {
          console.error("Error al eliminar la imagen:", err);
        }
      });
    };
  

router.put(
  "/producto/:id",
  validaciones,
 autenticarToken,
  autenticaUsur("ADMIN"),
  upload.single("img"),
  async (req, res) => {

    const { nombre, descripcion, precio, idCategoria, stock, img } = req.body;
    console.log(req.body)
    const productoId = req.params.id;

    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errores: error.array() });
    }
    // si se actuliza la img del producto 
    try {
        const exiteProducto  =  await prisma.producto.findFirst({
           where:{id:productoId}
          })
          
        if(!exiteProducto) return resClient(res,500,"no exite el producto")

        if(req.file){ 

            // ruta de la img almacena en el directorio
            const pathfile = path.join(directorioTemporal, req.file.filename);
            // guardamos la nueva img del producto 
            const newImgUrl =  await cloudinary_nube(pathfile) 
            
            // actulizamos la db  en base al nuevo producto 
            await prisma.producto.update({
                where: { id: productoId },
                data: {
                  nombre,
                  descripcion,
                  precio,
                  idCategoria,
                  stock,
                  img:newImgUrl
                },
              });
            
            // eliminamos la img del nuevo producto del directorio 
             await eliminarImgTemporal(pathfile)
             
             return  resClient(res,201,"se actulizo el producto")
            }
            // en caso de que no haya mandado una img 
            else{
                await prisma.producto.update({
                    where: { id: productoId },
                    data: {
                      nombre,
                      descripcion,
                      precio,
                      idCategoria,
                      stock,
                      img,
                    },
                  });

                  return  resClient(res,201,"se actulizo el producto")
            }
   } catch (error) {
      console.error("Error al actualizar producto:", error);
      resClient(res, 500, "Error al actualizar el producto");
    }
  }
);

export default router;
