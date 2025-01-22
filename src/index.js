const express = require('express');
const { subscribe } = require('./routes/subscriber');
const newsletter = require('./routes/newsletter');
const emailHandler = require('./routes/email');
const connectDB = require('./config/database');

const app = express();

app.use(express.json());
app.use('/subscriber',subscribe);
app.use('/newsletter',newsletter);
app.use('/emailhandler',emailHandler);

connectDB();
app.listen(3000,()=>console.log("Server is running"));