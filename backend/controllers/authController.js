const {User}  = require("../models");
const generateToken  = require("../utils/generateToken") 

const registerUser = async(req,res)=>{
    try{
    const { username, email, password, phoneNumber, dateOfBirth }  = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists!" });
    }
    const user = await User.create({ username, email, password,phoneNumber,dateOfBirth });
   
    res.status(201).json({ message: "User registered success!", user:{
        id  : user.id,
        username : user.username,
        email : user.email,
        phoneNumber :user.phoneNumber,
        dateOfBirth : user.dateOfBirth,
        token : generateToken(user.id)
    } });
}catch(error){
            res.status(500).json({ message: "user registration error!", error: error.message });
}
}

const loginUser = async (req,res) => {
 try{
    const {email, password} = req.body;

    const checkUser = await User.findOne({where : {email}})
    
    console.log(checkUser)

    if(!checkUser || password !== checkUser.password){
        return  res.status(400).json({message : "Invalid credentials!"})
    }

    res.status(201).json({
        message: "Login success!", user: {
            id: checkUser.id,
            username: checkUser.username,
            email: checkUser.email,
            phoneNumber: checkUser.phoneNumber,
            dateOfBirth: checkUser.dateOfBirth,
            token: generateToken(checkUser.id)
        }
    });

 }catch(error){
     res.status(500).json({ message: "login error!", error: error.message });
 }
}


module.exports =  {registerUser,loginUser}