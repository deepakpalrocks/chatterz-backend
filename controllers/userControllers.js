const asyncHandler = require("express-async-handler");
const User = require("../models/userModel")
const generateToken = require("../config/generateToken")

const getUserProfile = asyncHandler(async (req, res)=>{
    const {name,email,pic} = req.body;
    let user = await User.findOne({email});
    if(user){
        res.status(200).json({
            _id: user._id,
            name : user.name,
            email : user.email,
            pic : user.pic,
            token : generateToken(user._id)
        })
    }
    else{
      
        user= await User.create({
            name , email, pic
        });
        res.status(200).json({
            _id: user._id,
            name : user.name,
            email : user.email,
            pic : user.pic,
            token : generateToken(user._id)
        })
    }
    
});

const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
  
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
  });
 
module.exports = {getUserProfile, allUsers}; 