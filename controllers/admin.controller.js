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
      }
      throw new Error("Email/password not found")  
        
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}