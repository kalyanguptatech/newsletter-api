const express = require('express');
const Subscriber  = require('./routes/subscriber');
const newsletter = require('./routes/newsletter');
const emailHandler = require('./routes/email');
const cors = require('cors'); 

const app = express();
const { connectDB } = require('./config/database');
const { createTables } = require('./config/schema');

const initializeApp = async () => {
  await connectDB();
  await createTables();
};

app.use(cors());

initializeApp();
app.get('/',(req,res)=>{
    res.json("Testing");
});
app.use(express.json());
app.use('/subscriber', Subscriber);
app.use('/newsletter',newsletter);
app.use('/emailhandler',emailHandler);

app.listen(3000,()=>console.log("Server is running"));
