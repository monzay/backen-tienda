import express from "express";
import Stripe from "stripe";
import { resClient } from "../../../resClient.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRE_KEY);

router.post("/checkout", async (req, res) => {
  const idUsuario = 10;

  try {
    // Simulación de un carrito de compras
    const carrito = {
      productos: [
        { id: 1, nombre: "Producto A", precio: 2000, stock: 2 },
        { id: 2, nombre: "Producto B", precio: 3500, stock: 1 },
        { id: 2, nombre: "Producto B", precio: 3500, stock: 1 },
        { id: 2, nombre: "Producto B", precio: 3500, stock: 1 },
        { id: 2, nombre: "Producto B", precio: 3500, stock: 1 },
        { id: 2, nombre: "Producto B", precio: 3500, stock: 1 },
        { id: 2, nombre: "Producto B", precio: 3500, stock: 1 },
        { id: 2, nombre: "Producto B", precio: 3500, stock: 1 },
      ],
    };


    if (!carrito || !carrito.productos.length) {
      return resClient(res, 400, "El carrito está vacío");
    }

    // Construcción del array de items para Stripe
    const line_items = carrito.productos.map((producto) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: producto.nombre,
        },
        unit_amount: producto.precio,
      },
      quantity: producto.stock,
    }));



    // Creación de la sesión de pago con Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `http://localhost:3000/`,
      cancel_url: `http://localhost:3000/api/pagoCancelado`,
    });

    res.redirect(session.url)
  
  } catch (error) {
    console.error(error);
    resClient(res, 500, "Error al procesar la compra");
  }
});

export default router;

