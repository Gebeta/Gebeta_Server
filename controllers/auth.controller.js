var _ = require('lodash');
var jwt = require('jsonwebtoken');

const { jwt_key } = require('../config/vars')
const restaurantModel = require('../models/restaurant.model')
const clientModel = require('../models/client.model')
const driverModel = require('../models/driver.model')

exports.login = async (req, res) => {
    try {
        const restaurant = await restaurantModel.findOne({
            email: req.body.email
        });
        if (restaurant && await restaurant.verifyPassword(req.body.password)) {
            const restaurant = await restaurantModel.findOne({
                email: req.body.email
            }).select('-password')
            req.session.restaurant = restaurant;
            const restaurantfortoken = _.pick(restaurant, ['name', '_id', 'email'])
            return res.json({
                ...restaurant._doc,
                token: jwt.sign({ data: restaurantfortoken }, jwt_key, {
                    expiresIn: '7d'
                }, { algorithm: 'HS256' })
            });
        } else {
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
    try {
        const restaurant = await restaurantModel.findOne({
            name: req.body.name
        })

        const phone = await restaurantModel.findOne({
            phone_no: req.body.phone
        })
        
        if(restaurant){throw new Error("Restaurant Name already taken")}
        if(phone){throw new Error("Phone already listed by other restaurant")}

        if (restaurant) { throw new Error("Restaurant already exist") }
        if (phone) { throw new Error("Phone already listed by other restaurant") }

        res.status(200).json(
            { message: 'data non-exist' }
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

        if (restaurant) {
            throw new Error("This Restaurant email already exists")
        }

        const newRestaurant = await new restaurantModel({
            tin: req.body.tin,
            name : req.body.name,
            phone_no : req.body.phone_no,
            address: req.body.address,
            email : req.body.email,
            password : req.body.password,
            restPic : req.body.restPic,
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
        const client = await clientModel.findOne({
            email: req.body.email
        })
        if (client) {
            throw new Error("User already Exists")
        }

        const userCurrentLocation = { type: 'Point', coordinates: [req.body.position.longitude, req.body.position.latitude] }
        const newUser = await new clientModel({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone_no: req.body.phone_no,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            location: userCurrentLocation
        })
        
        await newUser.save()
        const clientfortoken = _.pick(newUser, ['name', '_id', 'email'])
        return res.status(200).json({
            ...newUser._doc,
            token: jwt.sign({ data: clientfortoken }, jwt_key, { algorithm: 'HS256' })
        });


    } catch (error) {

        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}

exports.checkUser = async (req, res) => {

    try {
        const client = await clientModel.findOne({
            phone_no: req.body.phone_no
        });
        if (client) {
            res.status(200).json({ message: "UserExists" })
        }
        res.status(200).json({ message: "UserExistsNot" })

    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }


}


exports.clientLogin = async (req, res) => {
    try {
        const client = await clientModel.findOne({
            email: req.body.email
        });
        if (client && await client.verifyPassword(req.body.password)) {
            const client = await clientModel.findOne({
                email: req.body.email
            }).select('-password')
            req.session.client = client;
            const clientfortoken = _.pick(client, ['name', '_id', 'email'])
            return res.json({
                ...client._doc,
                token: jwt.sign({ data: clientfortoken }, jwt_key, { algorithm: 'HS256' })
            });
        } else {
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


exports.logout = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
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


exports.checkDriver = async (req, res) => {
    try {
        const driver = await driverModel.findOne({
            email: req.body.email
        })

        const phone = await driverModel.findOne({
            phone_no: req.body.phone
        })

        if (driver) { throw new Error("Driver already exist") }
        if (phone) { throw new Error("Phone already listed by other Driver") }

        res.status(200).json(
            { message: 'data non-exist' }
        )
    } catch (error) {

        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}



exports.driver_signup = async (req, res) => {

    try {
        const driver = await driverModel.findOne({
            email: req.body.email
        })

        if (driver) {
            throw new Error("This Driver email already exists")
        }

        const newDriver = await new driverModel({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone_no: req.body.phone_no,
            address: req.body.address,
            email: req.body.email,
            // profile_picture : req.path.imageUrl,
            // driving_license: req.path.driving_license,
            car_plate: req.body.car_plate,
            password: req.body.password,
            idCard: req.body.idCard,
        })

        await newDriver.save()
        res.status(200).json(
            newDriver
        )
    } catch (error) {

        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}


exports.checkDriver = async (req, res) => {
    try {
        const driver = await driverModel.findOne({
            email: req.body.email
        })

        const phone = await driverModel.findOne({
            phone_no: req.body.phone
        })

        if (driver) { throw new Error("Driver already exist") }
        if (phone) { throw new Error("Phone already listed by other Driver") }

        res.status(200).json(
            { message: 'data non-exist' }
        )
    } catch (error) {

        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}



exports.driver_signup = async (req, res) => {

    try {
        const driver = await driverModel.findOne({
            email: req.body.email
        })

        if (driver) {
            throw new Error("This Driver email already exists")
        }

        const newDriver = await new driverModel({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone_no: req.body.phone_no,
            address: req.body.address,
            email: req.body.email,
            // profile_picture : req.path.imageUrl,
            // driving_license: req.path.driving_license,
            car_plate: req.body.car_plate,
            password: req.body.password,
            idCard: req.body.idCard,
        })

        await newDriver.save()
        res.status(200).json(
            newDriver
        )
    } catch (error) {

        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}


exports.driver_login = async (req, res) => {
    try {
        const driver = await driverModel.findOne({
            email: req.body.email
        });
        if (driver && await driver.verifyPassword(req.body.password)) {
            const driver = await driverModel.findOne({
                email: req.body.email
            }).select('-password')
            req.session.driver = driver;
            const driverfortoken = _.pick(driver, ['name', '_id', 'email'])
            return res.json({
                ...driver._doc,
                token: jwt.sign({ data: driverfortoken }, jwt_key, {
                    expiresIn: '7d'
                }, { algorithm: 'HS256' })
            });
        } else {
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

