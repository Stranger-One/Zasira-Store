import express from 'express'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRouter from './routes/authRoute.js'
import productRouter from './routes/productsRoute.js'
import cartRouter from './routes/cartRoute.js'
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js'
import bannerRouter from './routes/bannerRoute.js'
import paymentRouter from './routes/paymentRoute.js';
import reviewRouter from './routes/reviewRoute.js'

import './helpers/passport.js'
import passport from 'passport';
import session from 'express-session';

import dotenv from 'dotenv';
import { connectDB } from './helpers/db.js';
dotenv.config();


connectDB();


const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = process.env.CLIENT_URL.split(',');

// session must come after cors
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // true if using https
      httpOnly: true,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
              callback(null, true);
            } else {
              callback(new Error("Not allowed by CORS"));
            }
          },
        methods: ["GET", "POST", "DELETE", "PUT"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
        ],
        credentials: true
    })
);

app.use(cookieParser())
app.use(express.json())

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const { token } = req.user; // token was passed from passport.use
    res.redirect(`${process.env.USER_BASE_URL}/auth/login/success?token=${token}`);
  }
);

app.use("/api/auth", authRouter)
app.use("/api/products", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/addresses", addressRouter)
app.use("/api/orders", orderRouter)
app.use("/api/banner", bannerRouter)
app.use("/api/payment", paymentRouter);
app.use("/api/review", reviewRouter);

app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`))