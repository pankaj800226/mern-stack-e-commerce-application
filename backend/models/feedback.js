import mongoose from 'mongoose'

const ratingSchema = new mongoose.Schema({
    stars: {
        type: String,
        required: true,
    },

    comment: {
        type: String,
        required: true,
    }
})

export const ratingModel = mongoose.model('rating', ratingSchema)


