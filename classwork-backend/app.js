import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './route/user.js';
import ProductRouter from './route/product.js';
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());

// ENABLE CORS (moved to top, before routes)
const allowedOrigins = [
  "http://localhost:5174",  // Add this — your Vite frontend port from logs
  "http://localhost:5173",  // Alternate Vite port
  "http://localhost:5000",  // Local backend if needed
  "https://assign-git-main-setrakanmistrokehshis-projects.vercel.app",  // Deployed frontend
  // Add production frontend URLs as needed
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);  // Allow Postman/mobile/no-origin
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.error(`Denied CORS origin: ${origin}`);  // Log for debug
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.use('/api/user', userRouter);
app.use('/api/product', ProductRouter);

// Root test route
app.get('/', (req, res) => {
  res.send('Hello winner');
});

// Global error handler (catches CORS/500 errors)
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  res.status(500).json({ message: 'Internal server error', details: err.message });
});

// Connect to MongoDB, then start server
mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB (winner)");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Backend is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
  });