// import 'dotenv/config';
import express from "express";
import dotenv from "dotenv";
import {mongoose} from "mongoose";
import userRouter from "./route/user.js";
import productRouter from "./route/product.js";
const server = express();
server.use(express.json());
dotenv.config()

server.listen(5000, () => {
    console.log(`Server is running in port ${process.env.PORT}`);
});
 
//   Routes
server.use("/api/users", userRouter);
server.use("/api/products", productRouter);

console.log(`My name is winner`)

server.get('/', (req, res) => {   
    res.send('Hello winner');
});

mongoose.connect(process.env.MONGODB_URL) 
.then(() => {
    console.log('Connected to Database ');
}).catch((err) => {
    console.log('Error connecting to Database', err);
});


// ✅ 1. Enable CORS before everything else
// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://hgsccdigitalskills.vercel.app",
// ];
/*const allowedOrigins = [
  "https://hgsccdigitalskills.com.ng",
  "https://www.hgsccdigitalskills.com.ng",
  "http://hgsccdigitalskills.com.ng",
  "http://www.hgsccdigitalskills.com.ng",
  "http://localhost:5173",
  "https://hgsccdigitalskills.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // mobile apps, Postman
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
); */
