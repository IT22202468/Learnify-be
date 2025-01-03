import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
