import express from 'express';
import cors from "cors"
import morgan from 'morgan';
import usuario from  "./routes/form/usuario.js"
import login from "./routes/form/login.js"



const app = express();
app.use(express.json());
app.use(cors())
app.use(morgan("dev"))
app.use("/api", usuario)
app.use("/api", login)




app.listen(process.env.PORT,(err)=>{
  if(!err){
  console.log("se levanto el pueto 3000")
  }
})