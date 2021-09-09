var _ = require('lodash');
var jwt = require('jsonwebtoken');

const { jwt_key } = require('../config/vars')
const restaurantModel = require('../models/restaurant.model')
const clientModel = require('../models/client.model')

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
              const restaurantfortoken = _.pick(restaurant,['name','_id','email'])
            return res.json({
                ...restaurant._doc,
                token: jwt.sign({data: restaurantfortoken}, jwt_key,{
                    expiresIn: '7d'
                }, { algorithm: 'HS256' })
            });
        }else{
        	res.status(400).json({
        		error: true,
        		message: "Incorrect Email/password"
        	})
        }
       
    } catch (error) {     
        res.json({
            error: true,
            message: error.message
        })
    }    
}

exports.check = async (req, res) => {
    try{
        const restaurant = await restaurantModel.findOne({
            name: req.body.name
        })

        const phone = await restaurantModel.findOne({
            phone_no: req.body.phone
        })
        
        if(restaurant){throw new Error("Restaurant already exist")}
        if(phone){throw new Error("Phone already listed by other restaurant")}

        res.status(200).json(   
            {message: 'data non-exist'}
        )
    } catch (error) {
        
        res.status(400).json({
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
            throw new Error("This Restaurant email already exists")
        }
        
        const newRestaurant = await new restaurantModel({
            name : req.body.name,
            phone_no : req.body.phone_no,
            address: req.body.address,
            email : req.body.email,
            password : req.body.password,
            idCard: req.body.idCard,
            business_license: req.body.business_license    
        })
        
        await newRestaurant.save()
        res.status(200).json(   
            newRestaurant
        )
    } catch (error) {
        
        res.status(400).json({
            error: true,
            message: error.message
        })
    }   
}

exports.clientSignup = async (req, res) => {

    try {     
        const restaurant = await clientModel.findOne({
            phone_no: req.body.phone_no
        })
        if(restaurant){
            throw new Error("Client already Exists")
        }
        
        const newUser = await new clientModel({
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            phone_no : req.body.phone_no,
            email : req.body.email,
            password : req.body.password,
            address : req.body.address
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
