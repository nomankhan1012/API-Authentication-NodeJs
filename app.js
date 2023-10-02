require('dotenv').config()
const express = require('express');
const morgan = require('morgan')
const createError = require('http-errors')
const router = require('./router/auth.rout');
const { verifyAccessToken } = require('./helper/jwt_helper');
require('./helper/mongodb');



const app = express();

const Port = process.env.PORT || 3020;


app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/auth',router)


app.get('/',verifyAccessToken,async(req,res,next)=>{
     res.send('Your Authorize User :(......')
})
    


app.use(async(req,res,next)=>{
     next(createError.NotFound())
})

app.use((err,req,res,next)=>{
     res.status(err.status || 500)
     res.send({
          error:{
               status : err.status || 500,
               message : err.message
          }
     })
})

app.listen(Port,()=>{
     console.log(`server is runing on ${Port}`);
})

