var _ = require('lodash');
var jwt = require('jsonwebtoken');

const { jwt_key } = require('../config/vars')
const restaurantModel = require('../models/restaurant.model')

exports.login = async (req, res) => { 
    try {     
        const restaurant = await restaurantModel.findOne({
            email: req.body.email
        });
        if(restaurant && await restaurant.verifyPassword(req.body.password)){            
            const restaurant = await restaurantModel.findOne({
                email: req.body.email
              }).select('-password')
              req.session.restaurant = restaurant;
              const restaurantfortoken = _.pick(restaurant,['userName','_id','email'])
            return res.json({
                ...restaurant._doc,
                token: jwt.sign({data: restaurantfortoken}, jwt_key,{
                    expiresIn: '7d'
                }, { algorithm: 'HS256' })
            });
        }
       throw new Error("Email/password not found")
    } catch (error) {     
        res.json({
            error: true,
            message: error.message
        })
    }    
}

exports.signup = async (req, res) => {

    try {     
        const restaurant = await restaurantModel.findOne({
            email: req.body.email
        })
        if(restaurant){
            throw new Error("User already Exists")
        }
        
        const newUser = await new restaurantModel({
            userName : req.body.userName,
            email : req.body.email,
            password : req.body.password
        })
        
        await newUser.save()
        res.status(200).json(   
            newUser
        )
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
