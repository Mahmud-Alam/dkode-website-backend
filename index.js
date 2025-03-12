const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler")

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('api/blogs', blogRoutes);
app.use(errorHandler);

// Connect to MongoDB
connectDB();

// Server listen
const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server is running on the port: ${port}`);
});