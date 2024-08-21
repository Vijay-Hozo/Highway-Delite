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
    "mongodb+srv://vijay2304a:1234@cluster0.8euax.mongodb.net/user?retryWrites=true&w=majority&appName=Cluster0"
).then(() => {
    console.log('Connected to database!');
}).catch(() => {
    console.log('Connection failed!');
});

app.use("/",UserRoute);

app.listen(5000,()=>{
    console.log("Server is running on port 5000")
})