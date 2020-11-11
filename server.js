require('dotenv').config(); // load all our enviroment variables from .env


const express =require('express');
const app=express();
const mongoose=require('mongoose');
//connect to database with not a static URL but with a .env URL
mongoose.connect(process.env.DATABASE_URL,{ useUnifiedTopology: true, useNewUrlParser: true  });
const db=mongoose.connection;
db.on('error',(error)=>console.error(error)) //on error 
db.once('open',()=>console.log('Connected to Database'))//once we connect,only one time

//set server to acccept JSON
//this is middleware run before routing
app.use(express.json());

const subscribersRouter=require('./routes/subscribers');
app.use('/subscribers',subscribersRouter);



app.listen(3000,()=>console.log('Server Started'));
