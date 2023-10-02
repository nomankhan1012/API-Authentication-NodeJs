const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB,{dbname:process.env.DBNAME}).then(()=>{
     console.log('connected to mongodb!');
}).catch((err)=>{
     console.log(err,'somthing went wrong!');
})

mongoose.connection.on("connected",()=>{
     console.log('mongoose connected to db');
})

mongoose.connection.on("err",()=>{
     console.log(err.message);
})

mongoose.connection.on("disconneted",()=>{
     console.log(`mongoose connection is disconnected!`);
})

process.on("SIGINT",async()=>{
     await mongoose.connection.close();
     process.exit(0)
})