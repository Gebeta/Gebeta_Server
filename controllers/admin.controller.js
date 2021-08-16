var jwt = require('jsonwebtoken');
var _ = require('lodash');

const adminModel = require('../models/admin.model')
const { jwt_key } = require('../config/vars')

exports.login = async (req, res, next) => {
    try {
      const admin = await adminModel.findOne({
        email: req.body.email
      })
      if(admin && await admin.verifyPassword(req.body.password)){
        const admin = await adminModel.findOne({
          email: req.body.email
        }).select('-password')
        const adminfortoken = _.pick(admin,['_id','email'])
        return res.json({
          ...admin._doc,
          token: jwt.sign(
            {data: adminfortoken}, 
            jwt_key,
            {expiresIn: '2h'},
            { algorithm: 'HS256' })
       });
      }else{
        res.status(400).json({
          error: true,
          message: "Incorrect Email/password"
        })
      }     
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}

exports.logout = async (req, res) => {
  try {
      req.session.destroy((err)=>{
          if(err){
              throw new Error("Something went wrong")
          }
          res.send("your logged out")
      });
  } catch (error) {
      
      res.status(400).json({
          error: true,
          message: error.message
      })
  }   
}