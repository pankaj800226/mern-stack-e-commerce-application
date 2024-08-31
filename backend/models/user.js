import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },

    email: {
        type: String,
        require: true
    },

    password: {
        type: String,
        require: true,
    },

    profileImage: {
        type: String,
        require: true,
    },
}, { timestamps: true })

export const userModel = mongoose.model('User', userSchema);