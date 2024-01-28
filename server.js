const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const path = require("node:path");
dotenv.config();
const storage = multer.diskStorage({
    destination: function (req, file, cb){
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`)
    },
  })
  
const upload = multer({ storage: storage })



const express =require("express");


let connectToMDB = async()=>{

    try{
    mongoose.connect("mongodb+srv://rajtony533:rajtony533@cluster0.qtvljfe.mongodb.net/batchof2309?retryWrites=true&w=majority")
    console.log("Successfully connected to MDB")
    
}catch(err){
    console.log("Unable to connect to MDB")

}


const app =  express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use('/uploads', express.static('uploads'))
app.use(express.static(path.join(__dirname,"./client/build")));


app.post("/signup",upload.array("profilePic"),async(req,res) => {
    console.log(req.body);
    console.log(req.files);

    let userArr = await User.find().and({email:req.body.email});

    if(userArr.length > 0){
        res.json({status:"failure",msg:"User Already Exist."})
    }else{
        let hashedPassword = await bcrypt.hash(req.body.password,10);
        try{
            let newUser = new User({
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            age:req.body.age,
            gender:req.body.gender,
            marital:req.body.marital,
            email:req.body.email,
            password:hashedPassword,
            profilePic:req.files[0].path,
            
        });
    
         
        await newUser.save();
        res.json({status:"success", msg:"User Created Successfully"});
         }catch(err){
        res.json({status:"failure",err:err});
         }
         }

    });


app.put("/updateProfile",upload.single("profilePic"),async(req,res)=>{
console.log(req.body);
console.log(req.file);

try{

    if(req.body.firstName.length>0){
        await User.updateMany({email:req.body.email},{firstName:req.body.firstName});
    }
    
    if(req.body.lastName.length>0){
        await User.updateMany({email:req.body.email},{lastName:req.body.lastName});
    }
    if(req.body.age.length>0){
        await User.updateMany({email:req.body.email},{age:req.body.age});
    }
    
    if(req.body.gender.length>0){
        await User.updateMany({email:req.body.email},{gender:req.body.gender});
    }
    
    if(req.body.marital.length>0){
        await User.updateMany({email:req.body.email},{marital:req.body.marital});
    }
    
    
    if(req.body.password.length>0){
        await User.updateMany({email:req.body.email},{password:req.body.password});
    }

    if(req.file && req.file.path){
        await User.updateMany(
            {email:req.body.email},
            {profilePic:req.file.path}
        );
    }

    res.json({status:"success", msg:"User Details updated successfully"});

 }catch(err){
    res.json({status:"failure", msg:"Something went to wrong", err:err});
 }
      });


app.delete("/deleteProfile",async(req,res)=>{
    console.log(req.query.email);
     try{
    await User.deleteMany({email:req.query.email});

    res.json({status:"success",msg:"User deleted successfully"});
}catch(err){
res.json({status:"failure",msg:"Unable to delete profile",err:err});
}
    });



    
app.post("/login",upload.none(),async(req,res)=>{
console.log(req.body);


let fetchedData= await User.find().and({email:req.body.email});
    
    console.log(fetchedData);

    if(fetchedData.length > 0){

    let passwordResult = await bcrypt.compare(req.body.password,fetchedData[0].password);

        if(passwordResult==true){

            let token = jwt.sign({email:req.body.email,password:req.body.password},"lalala");

            let dataToSend = {
                firstName:fetchedData[0].firstName,
                lastName:fetchedData[0].lastName,
                age:fetchedData[0].age,
                gender:fetchedData[0].gender,
                marital:fetchedData[0].marital,
                email:fetchedData[0].email,
                profilePic:fetchedData[0].profilePic,
                token:token,

            };
                //   console.log(dataToSend);

            res.json({status:"success",data: dataToSend});
        }else{
            res.json({status:"failure",msg:"invalid Password"});
        }

    }else{
           res.json({status:"failure", msg:"User doesnot exist"});
}
    });


app.post("/validateToken",upload.none(),async(req,res)=>{
    console.log(req.body.token);


    try{
        let decryptedObj = jwt.verify(req.body.token,"lalala");
    console.log(decryptedObj);

    let fetchedData= await User.find().and({email:decryptedObj.email});
    
    console.log(fetchedData);

    if(fetchedData.length > 0){

    if(fetchedData[0].password==decryptedObj.password){

        // let token = jwt.sign({email:req.body.email,password:req.body.password},"lalala");

            let dataToSend = {
            firstName:fetchedData[0].firstName,
            lastName:fetchedData[0].lastName,
            age:fetchedData[0].age,
            gender:fetchedData[0].gender,
            marital:fetchedData[0].marital,
            email:fetchedData[0].email,
            profilePic:fetchedData[0].profilePic,
                // token:token,

            };
            //   console.log(dataToSend);

            res.json({status:"success",data: dataToSend});
        }else{
            res.json({status:"failure",msg:"invalid Password"});
        }

    }else{
        res.json({status:"failure", msg:"User doesnot exist"});
}


    }catch(err){
        res.json({status:"failure",msg:"Invalid token",err:err})
    }
    
});

    let userSchema = new mongoose.Schema({
        firstName:String,
        lastName:String,
        age:Number,
        gender:String,
        marital:String,
        email:String,
        password:String,
        profilePic:String,
    });


    let User = new mongoose.model("user",userSchema);



app.listen(process.env.port,()=>{
    console.log(`Listening to port ${process.env.port}`);
});
};

connectToMDB();
