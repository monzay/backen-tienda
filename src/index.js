import express from 'express';
import cors from "cors"
import morgan from 'morgan';
import usuario from  "./routes/form/usuario.js"
import login from "./routes/form/login.js"
import retablecerContrasena from "./routes/form/recuperarContrasena.js"
import verificarEmail from "./routes/form/verificarEmail.js"
import getProducto from "./routes/Producto/getProducto.js"
import path from 'path';
import { fileURLToPath } from 'url';
import postProducto from  "./routes/Producto/postProducto.js"
import { PORT } from '../configuracion.js';
import dotenv from 'dotenv';
import createCategoria from "./routes/categoria/CreateCategoria.js"
import prisma from './prisma/client.js';
import putProducto from "./routes/Producto/updateProducto.js"
import getProductoId from "./routes/Producto/getProductoId.js"
import deleteProducto from "./routes/Producto/deleteProducto.js"
import getTresProductos from "./routes/Producto/getTresProductos.js"

import stripWebHook from "./routes/medioDePago/stripe/webhook.js"
import medioPago from "./routes/medioDePago/stripe/stripe.js"
import postDireccion from "./routes/direccion/postDirecione.js"

import getDireccione from "./routes/direccion/getDirecciones.js"






dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use("/api",medioPago)



app.use(express.json());
app.use(cors())
app.use(morgan("dev"))


// login  y sesion 
app.use("/api", usuario)
app.use("/api", login)
app.use("/api", retablecerContrasena)
app.use("/api", verificarEmail)

// carrito 
 
// perfil 
//direcciones 
app.use("/api",postDireccion)
app.use("/api",getDireccione)




// producto
app.use("/api", getProducto)
app.use("/api",postProducto)
app.use("/api",putProducto)
app.use("/api",getProductoId)
app.use("/api",deleteProducto)
// revisar cuando haiga pedidos
app.use("/api",getTresProductos)




// categoria 
app.use("/api",createCategoria)
app.get("/api/categoria",async (req,res)=>{
  const categoria = await prisma.categoria.findMany()
  res.json(categoria)
})

//medio de pago 


app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname,"public","index.html"))
})
app.use("/api",stripWebHook)
app.get("/api/agoExitoso",(req,res)=>{
  res.sendFile(path.join(__dirname,"public","PagoExitoso.html"))
})



//Carrito 

app.get("/carrito",async(req,res)=>{
  const x = await prisma.carrito.findMany()
})
app.listen(PORT,(err)=>{
  if(!err){
  
  console.log("se levanto el pueto 3000")
  }
})
