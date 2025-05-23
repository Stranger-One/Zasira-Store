import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            }, 
            size: {  // Add this field
                type: String,
                default: null
              }
        }
    ],

},{
    timestamps: true
})

const Cart = mongoose.model("Cart", cartSchema)
export default Cart;