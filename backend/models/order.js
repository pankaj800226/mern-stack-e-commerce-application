import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    items: [{
        shopId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Store",
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
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
    totalPrice: {
        type: Number,
        required: true,
    },
    shippingDetails: {
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },

        nearHouse: {
            type: String,
            required: true,
        },

        phone: {
            type: String,
            required: true,
        },

        pincode: {
            type: String,
            required: true,
        },
        email: String,
    },

    status: {
        type: String,
        enum: ['Confirmed', 'Canceled', 'Shipping', 'Delivered'],
        default: 'Confirmed',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

export const orderModel = mongoose.model('Order', orderSchema)