import mongoose from 'mongoose'

const storeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },

    category: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }


}, { timeseries: true, })

export const storeModel = mongoose.model('Store', storeSchema);


