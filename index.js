import express from 'express';
const app = express()


app.use(
    express.urlencoded({ extended: true })
);
app.use(express.json());

import UserRoute from './Routes/userRoute.js';
import JobRoute from './Routes/jobRoute.js';
import DetailsRoute from './Routes/detailsRoute.js';
import ApplicationRoute from './Routes/applicationRoute.js';

import cors from 'cors';
app.use(cors());

import dotenv from 'dotenv';
import { connectDB } from './Middlewares/DB.js';
dotenv.config()

connectDB();

app.use('/api/users',UserRoute);
app.use('/api/jobs',JobRoute);
app.use('/api/profiles',DetailsRoute);
app.use('/api/applications',ApplicationRoute);


const PORT = process.env.PORT || 5332

app.listen(PORT,()=> console.log(`Server running at ${PORT}`));