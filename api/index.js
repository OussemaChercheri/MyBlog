import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js';

dotenv.config();

mongoose.connect(process.env.MONGO).then( ()=>{

console.log('database connected')})
.catch((err) => { console.error(err);});




const app = express();

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});

app.use('/api/user', userRoutes);
