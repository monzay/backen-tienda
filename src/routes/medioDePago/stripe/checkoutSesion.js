import express from "express"
import { param } from "express-validator";
const router = express.Router();


const validaciones = {
    sessionId: param('sessionId').isString().notEmpty()
}

router.get('/checkout-session/:sessionId', validaciones, async (req, res) => {

    const sessionId = req.params
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.send(session);
  });

export default router