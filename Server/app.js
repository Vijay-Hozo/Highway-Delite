const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const UserRoute = require('./Routes/UserRoute');

app.use(cors());
app.use(bodyParser.json());


mongoose.connect(
    process.env.MONGODB_URL
).then(() => {
    console.log('Connected to database!');
}).catch(() => {
    console.log('Connection failed!');
});

app.use("/",UserRoute);

app.listen(8000,()=>{
    console.log("Server is running on port 8000")
})