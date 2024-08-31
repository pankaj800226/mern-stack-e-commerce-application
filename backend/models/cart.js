import mongoose from 'mongoose'


const cartSchema = new mongoose.Schema({
    items: [{
        shopId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Store",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        },
        photo: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        }
    }],
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // }

}, { timestamps: true })

export const cartModel = mongoose.model('Cart', cartSchema)