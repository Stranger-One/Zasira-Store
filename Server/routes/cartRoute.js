import express from "express"
import { addCartProduct, clearCart, removeCartProduct, fetchCartProducts, updateProductQuantity } from "../controllers/cartController.js"


const router = express.Router();

// router.post('/create/:userId', createCart);
router.post('/add', addCartProduct);
router.get('/:userId', fetchCartProducts);
router.put('/remove/:userId', removeCartProduct);
router.put('/update/:userId', updateProductQuantity);
router.delete('/clear/:userId', clearCart);

export default router