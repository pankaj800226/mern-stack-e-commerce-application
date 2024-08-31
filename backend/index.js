import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import routes from './routes/app.js';
import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT || 8000
const app = express();
app.use(cors())
app.use(express.json())
app.use(routes)
app.use(express.static('public'))

try {
  mongoose.connect(process.env.MONGODB_URL);
  console.log('database running');

} catch (error) {
  console.log('mongoose error');
}



app.listen(PORT, (console.log('Server listening on port ' + PORT)))
