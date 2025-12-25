const express = require("express");
const mongoose = require("mongoose");
const path = require('path');
const User = require("./models/userSchema");
const ejs = require("ejs");
const app = express();

app.set("view engine",'ejs');
app.set('views',path.join(__dirname,'/views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//database connection
mongoose.connect("mongodb://127.0.0.1:27017/demo")
.then(()=>console.log("connected to mongodb!"))
.catch((err) => console.log("could not connected!"));


//get all users - Home page
app.get("/",async(req,res)=>{
    const users = await User.find();
    res.render("users",{
        users
    })
});

//get user by id
app.get("/users/:id",async(req,res)=>{
 const user = await User.findById(req.params.id);
 res.json(user);
});


app.get("/addUser",(req,res)=>{
res.render("addUser");
});

//add data to the database
app.post("/addUser",async(req,res)=>{
    const user = new User(req.body);
    await user.save();
    
    res.redirect("/");
});

//delete by id 
app.delete("/users/:id",async(req,res)=>{
     await User.findByIdAndDelete(req.params.id);
     res.json({message:"User deleted successfully"});
})



app.listen(7000,()=>{
    console.log("server is Running!");
});

