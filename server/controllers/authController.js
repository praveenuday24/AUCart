
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const {OAuth2Client} = require("google-auth-library");
const client= new OAuth2Client ( process.env.GOOGLE_CLIENT_ID);
//Register New User(Signup)
const registerUser = async(req,res) => {
    try{
        const {name,email,password,role} = req.body;

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                message: "User already exists."
            });
        }

        const hashPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            name,
            email,
            password : hashPassword,
            role,
        });

        res.status(201).json({
            message: "User registered Succesfully",
            user,
        })
    } catch(error){
        res.status(500).json({
            message : error.message,
        })
    }
};

//Login

const loginUser = async(req,res) =>{
    try{
        const {email,password} = req.body;

        const user = await User.findOne({email});

        if(!user){
            res.status(400).json({
                message : "Invalid Credentials",
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if(!isMatch){
            return res.status(400).json({
                message : "Invalid Credentials",
            })
        }

        const token = jwt.sign(
            {
                id : user._id,
                role : user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn : "7d"
            }
        );

        res.status(200).json({
            message :"Login Successfull",
            token,
            user,
        });
    }
    catch(error){
        res.status(500).json({
            message:error.message,
        })
    }
};

const googleLogin = async(req,res) => {
    try{

    const {credential} = req.body; 
    const ticket  = await client.verifyIdToken({
        idToken : credential,
        audience : process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();

    const {email,name} = payload;
    let user = await User.findOne({ email });

    if(!user){
        user = await User.create({ name,email,googleId: payload.sub,role:"customer" });
    }

    const token = jwt.sign(
        {   
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );

    return res.status(200).json({
        token,
        user
    });
}
catch(error) {
    console.log("GOOGLE ERROR");
    console.log(error);
 
    res.status(500).json({
       message: error.message
    });
 }
}


module.exports = {
    registerUser,
    loginUser,
    googleLogin
}
