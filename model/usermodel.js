const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userShema = new mongoose.Schema({
     email:{
          type:String,
          require:true,
          trim:true,
          lowercase:true,
     },
     password:{
          type:String,
          require:true,
          trim:true,
     },
     create_at:{
          type:Date,
          default:Date.now()
     }
})

userShema.pre('save',async function(next){
     try {
          const salt = await bcrypt.genSalt(10)
          const hasspass = await bcrypt.hash(this.password,salt)
          this.password = hasspass;
          next() 
     } catch (error) {
          next(error)
     }
});

userShema.methods.isvalidpassword = async function (password){
     try {
        return  await bcrypt.compare(password,this.password)
     } catch (error) {
          throw error
     }
}


module.exports = new mongoose.model("Users",userShema)