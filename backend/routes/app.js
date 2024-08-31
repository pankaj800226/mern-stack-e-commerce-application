import express from 'express';
const routes = express.Router()
import multer from 'multer'
import Path from 'path'
import { storeModel } from '../models/store.js'
import { cartModel } from '../models/cart.js'
import { orderModel } from '../models/order.js'
import { wishlistModel } from '../models/wishlist.js'
import { ratingModel } from '../models/feedback.js'
import { userModel } from '../models/user.js'
import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const availablePincodes = [802312, 800001, 802302];


// Create a transporter object using your email service provider
const transporter = nodemailer.createTransport({
    // host: 'smtp.gmail.com',
    service: 'email',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    logger: true,
    debug: true,
});

// Function to send an email
const sendOrderConfirmationEmail = async (email, orderDetails) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Order Confirmation',
        text: `Thank you for your order!\n\nOrder Details:\n\n${orderDetails}`, // Plain text body
        html: `<p>Thank you for your order!</p><p>Order Details:</p><pre>${orderDetails}</pre>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Order confirmation email sent successfully.');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};




// ******************************Authentication ***********************************
const storage1 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/profileimage')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + Path.extname(file.originalname))
    }
})
const upload1 = multer({ storage: storage1 })

routes.post('/signup', upload1.single('file'), async (req, res) => {
    try {
        const { name, email, password, } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const { filename } = req.file

        const existUser = await userModel.findOne({ email })

        if (existUser) {
            return res.status(400).json({ message: " user already exists" })
        }

        const hashPasword = await bcrypt.hash(password, 10)
        const newUser = new userModel({
            profileImage: filename,
            name,
            email,
            password: hashPasword
        })

        await newUser.save()
        res.send({ code: 200, message: "Signup successful" })



    } catch (error) {
        console.log(error);

        res.status(404).json({ message: "Signup error" })

    }
})

routes.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.send({ code: 500, message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {

            return res.send({ code: 401, message: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

        res.send({
            userId: user._id,
            profileImage: user.profileImage,
            name: user.name,
            email: user.email,
            code: 200,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: "error" })

    }
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/image')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + Path.extname(file.originalname))
    }
})


const upload = multer({ storage: storage })

// product create
routes.post('/storeCreate', upload.single('file'), async (req, res) => {
    try {
        const { name, price, category, stock, description } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const { filename } = req.file

        const creates = await storeModel.create({
            photo: filename,
            name,
            price,
            stock,
            category,
            description
        })

        if (!creates) {
            res.status(404).json({ message: 'creates not found' })
        }

        res.json(creates)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error creating file" })
    }
})
// product find

routes.post('/find', async (req, res) => {

    try {
        const findProduct = await storeModel.find()

        if (!findProduct) {
            res.status(404).json({ message: 'Product not found' })
        }

        res.json(findProduct)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error' })

    }
})

// product delete

routes.delete('/deleteProduct/:id', async (req, res) => {
    const { id } = req.params

    try {
        const deleteProduct = await storeModel.findByIdAndDelete(id)
        if (!deleteProduct) {
            res.status(404).json({ message: 'delete not found' })
        }

        res.json(deleteProduct)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error' })

    }
})

// product find

routes.post('/findByIdProduct/:id', async (req, res) => {
    const { id } = req.params

    try {
        const findProductOneByOne = await storeModel.findById(id)
        if (!findProductOneByOne) {
            res.status(404).json({ message: 'findByOne not found' })
        }

        res.json(findProductOneByOne)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error' })

    }
})


routes.put('/productEdit/:id', async (req, res) => {
    const { id } = req.params

    try {
        const productEdits = await storeModel.findByIdAndUpdate(id, {
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            stock: req.body.stock,
            description: req.body.description,


        })

        if (!productEdits) {
            res.status(404).json({ error: 'Edit not found' });
        }

        res.json(productEdits)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error' })

    }
})


//  ----------------------------------*add to cart*--------------------------------------
routes.post('/addToCart', async (req, res) => {
    try {
        const { shopId, quantity } = req.body

        let cart = await cartModel.findOne({})

        if (!cart) {
            // if not cart found, create a new cart ans send items[] items empty array
            cart = new cartModel({ items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.shopId.equals(shopId))
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity
        } else {
            const shopItem = await storeModel.findById(shopId)
            if (!shopItem) {
                return res.status(404).json({ error: 'Shop item not found' });
            }
            cart.items.push({
                shopId,
                quantity,
                photo: shopItem.photo,
                price: shopItem.price
            })
        }

        await cart.save()
        res.json(cart)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error' })

    }
})

routes.post('/cart', async (req, res) => {
    try {
        const cart = await cartModel.findOne({}).populate('items.shopId')
        if (!cart) {
            res.status(404).json({ message: 'cart not found' })
        }
        res.json(cart)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error' })

    }
})

routes.delete('/cartDelete/:id', async (req, res) => {
    const { id } = req.params
    try {
        let cart = await cartModel.findOne({})

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => !item.shopId.equals(id))
        await cart.save()
        res.json(cart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error' })

    }
})

routes.post('/decreaseQuantity', async (req, res) => {
    const { shopId, quantity } = req.body
    try {
        let cart = await cartModel.findOne({})
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });

        }

        const itemIndex = cart.items.findIndex(item => item.shopId.equals(shopId))
        if (itemIndex > -1) {
            if (cart.items[itemIndex].quantity > 1) {
                cart.items[itemIndex].quantity -= quantity
            }

        }
        await cart.save();
        res.json(cart)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error' })

    }
})

routes.post('/placeOrder', async (req, res) => {
    try {
        const { name, address, nearHouse, phone, pincode } = req.body.shippingDetails

        if (!availablePincodes.includes(Number(pincode))) {
            return res.status(400).json({ message: 'Pincode not available for delivery' });

        }

        const cart = await cartModel.findOne({}).populate('items.shopId')

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const totalPrice = cart.items.reduce((acc, item) => acc + (item.quantity * item.price), 0);

        const order = new orderModel({
            items: cart.items,
            totalPrice,
            shippingDetails: { name, address, nearHouse, phone, pincode }

        })


        await order.save();
        // place order so cart empty
        cart.items = []
        await cart.save();
        res.json(order)

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error' })
    }
})

routes.post('/orders', async (req, res) => {

    try {
        const order = await orderModel.find().populate('items.shopId').sort({ createdAt: -1 })
        if (!order) {
            return res.status(404).json({ message: 'No orders found' });
        }

        res.json(order)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error' })

    }

})


routes.put('/orderStatus/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const orderStatus = await orderModel.findByIdAndUpdate(id, { status }, { new: true })

        if (!orderStatus) {
            return res.status(404).json({ message: 'Order not found' });

        }

        res.json(orderStatus)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error' })

    }
})

routes.delete('/orderDelete/:id', async function (req, res) {
    const { id } = req.params
    try {
        const order = await orderModel.findByIdAndDelete(id)

        if (!order) {
            return res.status(404).json({ message: 'Orderdelete not found' });
        }

        res.json(order)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error' })

    }
})

// wishlist logic
routes.post('/wishlist', async function (req, res) {
    try {
        const { shopId, quantity } = req.body

        let wishlist = await wishlistModel.findOne({})

        if (!wishlist) {
            wishlist = new wishlistModel({ items: [] })
        }

        const itemIndex = wishlist.items.findIndex(item => item.shopId.equals(shopId))
        if (itemIndex > -1) {
            wishlist.items[itemIndex].quantity += quantity
        } else {
            const shopItem = await storeModel.findById(shopId)
            if (!shopItem) {
                return res.status(404).json({ error: 'Shop item not found' });

            }

            wishlist.items.push({
                shopId,
                quantity,
                photo: shopItem.photo,
                price: shopItem.price
            })

        }

        await wishlist.save()
        res.json(wishlist)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error' })

    }
})

routes.post('/findWishlist', async (req, res) => {
    try {
        const findWishlist = await wishlistModel.findOne({}).populate('items.shopId')

        if (!findWishlist) {
            return res.status(404).json({ error: 'widhlist  not found' });
        }

        res.json(findWishlist)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error' })

    }
})

routes.delete('/wishlistDelete/:id', async (req, res) => {
    const { id } = req.params

    try {
        let wishlistDelete = await wishlistModel.findOne({})

        if (!wishlistDelete) {
            return res.status(404).json({ error: 'widhlist  not found' });
        }

        wishlistDelete.items = wishlistDelete.items.filter(item => !item.shopId.equals(id))
        await wishlistDelete.save()
        res.json(wishlistDelete)
    } catch (error) {
        res.status(500).json({ message: 'error' })

    }
})


// rating system logic
routes.post('/Createfeedback', async (req, res) => {
    try {
        const { stars, comment } = req.body
        const rating = await ratingModel.create({
            stars,
            comment
        })

        if (!rating) {
            return res.status(404).json({ error: 'rating  not found' });
        }

        res.json(rating)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error' })

    }
})

routes.post('/ratingFind', async (req, res) => {
    try {
        const ratingFind = await ratingModel.find()
        if (!ratingFind) {
            return res.status(404).json({ error: 'find  not found' });
        }

        res.json(ratingFind)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error' })

    }
})



routes.delete('/ratingDelete/:id', async (req, res) => {
    const { id } = req.params
    try {
        const ratingRemove = await ratingModel.findByIdAndDelete(id)
        if (!ratingRemove) {
            return res.status(404).json({ error: 'delete  not found' });
        }

        res.json(ratingRemove)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'error' })

    }
})


export default routes