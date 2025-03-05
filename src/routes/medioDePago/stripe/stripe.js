import  express from "express"
const router = express.Router();
import Stripe from 'stripe';
import prisma from "../../../prisma/client.js";
import { resClient } from "../../../resClient.js";
const stripe = new Stripe(process.env.STRIPE_SECRE_KEY);

router.post("/checkout",async(req,res)=>{

  const idUsuario = 10
  const moldeCompra = []
   
  try {
    const carrito =  await prisma.carrito.findFirst({
      where:{idUsuario},
      include:{
        productos:true 
      }
    })


    for(let i =0;i< 1 - carrito.productos.length; i++  ){
      const producto = carrito.productos[i]
       moldeCompra.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: producto.nombre,
          },
          unit_amount:  producto.precio,
        },
        quantity: producto.stock,
      },)
    }

    
    const session = await stripe.checkout.sessions.create({
      line_items: carrito ,
      mode: 'payment',
      success_url: `http://localhost:3000/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/canceled.html`,
    });
    res.redirect(session.url)
  } catch (error) {
    console.log(error)
    resClient(res,500,"error al hacer la compra ")
  }
 
})


export default router;