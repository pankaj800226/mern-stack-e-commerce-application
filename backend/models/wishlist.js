import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
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
    }]
}, { timestamps: true })

export const wishlistModel = mongoose.model('Wishlist', wishlistSchema)