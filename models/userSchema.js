const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   Name:{
    type:String,
    required:true,
   },
   Age:{
    type:String,
    required:true,
   },
   phone:{
   type: String,
   required:true,
},
});

const User = mongoose.model("User",userSchema);

module.exports = User;
