const express = require("express");
const dotenv = require("dotenv").config();
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/users', userRoutes);

app.listen(port, ()=>{
    console.log(`Server is running on the port: ${port}`);
});