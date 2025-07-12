// var jwt = require('jsonwebtoken');


exports.roleDetermine = async(req , res) =>{
    
    const data = await req.user;
    res.status(200).json({success:true , message : "your user credentials are successfully fetched" , data})

}