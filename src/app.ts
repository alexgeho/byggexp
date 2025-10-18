import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import 'reflect-metadata';
import authRouter from './routes/router';
import {testingRouter} from "./routes/testing.router";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use('/', authRouter);
app.use('/testing', testingRouter);

mongoose
    .connect(process.env.MONGO_URI!)
    .then(() => console.log('✅ Mongo connected'))
    .catch((err) => console.error('❌ Mongo error:', err));

export default app;
