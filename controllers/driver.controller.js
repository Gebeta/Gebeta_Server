const driverModel = require('../models/driver.model')

exports.viewAlldrivers = async (req, res) => {
    try {
        const drivers = await driverModel.paginate({});
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

exports.updateDriver = async (req, res) => {
    try {
        let driver =  await driverModel.find({_id:req.driver.data._id})
        if(driver) {
            driver = await driverModel.updateOne({_id: req.driver.data._id}, req.body)
            return res.json({message :"successfully updated"})
        }
        throw new Error('Driver dosen\'t exist')
    } catch (error) {
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