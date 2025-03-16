import express from "express";
import Stripe from "stripe";
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRE_KEY);

router.post("/webhook",express.raw({type:'application/json'}) , async (req, res) => {
  
    const endpointSecret = "whsec_DEViNv5XSGCumoM7UgE4rfH5y1uSipJD";
    const sig = req.headers['stripe-signature'];
    

    console.log( typeof  req.body)

     let  event;
     try {
        event =  stripe.webhooks.constructEvent(req.body, sig, endpointSecret);

      } catch (err) {
          console.log(err)
      }
      switch (event.type) {
        case 'checkout.session.completed':
          const checkoutSessionCompleted = event.data.object;
          console.log(checkoutSessionCompleted)
          break;
        default:
          console.log(`Unhandled event type ${event.type}`);
      }
});

export default router;
