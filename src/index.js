import express from 'express';
import cors from "cors"
import morgan from 'morgan';
import usuario from  "./routes/form/usuario.js"
import login from "./routes/form/login.js"
import retablecerContrasena from "./routes/form/recuperarContrasena.js"
import verificarEmail from "./routes/form/verificarEmail.js"
import getProducto from "./routes/Producto/getProducto.js"
import stripe from "./routes/medioDePago/stripe/stripe.js"
import path from 'path';
import { fileURLToPath } from 'url';
import postProducto from  "./routes/Producto/postProducto.js"

const app = express();
app.use(express.json());
app.use(cors())
app.use(morgan("dev"))
app.use("/api", usuario)
app.use("/api", login)
app.use("/api", retablecerContrasena)
app.use("/api", verificarEmail)
app.use("/api", getProducto)


app.use("/api",postProducto)


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname)

app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname,"public","index.html"))
})
app.use(stripe )




app.listen(process.env.PORT,(err)=>{
  if(!err){
  console.log("se levanto el pueto 3000")
  }
})
