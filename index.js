const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);

// Connect to MongoDB
connectDB();

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server is running on the port: ${port}`);
});