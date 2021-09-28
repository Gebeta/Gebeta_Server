const driverModel = require('../models/driver.model')
const fs = require("fs");

exports.viewAlldrivers = async (req, res) => {
    try {
        const drivers = await driverModel.find({});
        res.json(drivers)
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}

exports.viewDriver = async (req, res) => {
    try {
        const driver = await driverModel.findById(req.params.id)
        res.json(driver)
    } catch (error) {
        res.status(404).json({
            error: true,
            message: error
        })
    }
}

exports.update = async (req, res) => {
    try {
        let driver = await driverModel.findById(req.params.id)
        if(driver) {
            driver = await driverModel.updateOne({_id: req.params.id}, req.body)
            return res.json({message :"successfully updated"})
        }
        throw new Error('driver dosen\'t exist')

    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}

exports.updateCar = async (req, res) =>{
    console.log(req.body.driverId)
    try{
        let driver = await driverModel.find({ _id: req.body.driverId })
        await driverModel.updateOne({ _id: req.body.driverId }, { ...driver, car: req.body.car, car_plate: req.body.car_plate })

        return res.json({ message: "successfully updated" })
    }catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}

exports.updateLocation = async (req, res) => {
    try{
        let driver = await driverModel.find({ _id: req.params.id })
        if(driver){
            await driverModel.updateOne({ _id: req.params.id }, { ...driver, isActive: req.body.isActive, address: req.body.address })

            return res.json({ message: "successfully updated" })
        }
       
    }catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}

exports.updateDriver = async (req, res) => {
    try {
        var folder = './public/images/' + req.body.driverId;
        fs.mkdir(folder, function (err) {
            if (err) {
                console.log(err)
                return res.status(400).json({ error: true, message: err.message })
            }
        })

        let driver = await driverModel.find({ _id: req.body.driverId })
        await driverModel.updateOne({ _id: req.body.driverId }, { ...driver, driving_license: req.files[0].originalname })

        // wait 1s till create folder for the image
        suspend(1000).then(() => {
            var file = req.files[0];
            console.log(file);
            var target_path = folder + '/' + file.originalname;

            fs.rename(file.path, target_path, err => {
                if (err) {
                    suspend(3000).then(() => {
                        fs.rename(file.path, target_path, err => {
                            res.status(400).json({ error: true, message: err.message })
                        })
                    })
                    return
                }
            })
            res.status(200).json({ message: " image uploaded successfully" })
        });

    } catch (error) {
        console.log(error)
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}

exports.removeDriver = async (req, res) => {
    try {
        let driver = await driverModel.findById(req.params.id)
        if(driver) {
            await driverModel.remove({
                _id: driver._id
            })
            return res.status(200).json({
                message: "Successfully deleted"
            })
        }
        res.status(200).json({
            message: 'driver doesn\t exist',
        })
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error
        })
    }
}

function suspend(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
