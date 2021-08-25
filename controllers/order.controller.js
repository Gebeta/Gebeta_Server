const orderModel = require('../models/order.model');
const clientModel = require('../models/client.model')

exports.viewAllorders = async (req, res) => {

    try {
        const orders = await orderModel.find({});
        res.json(orders)
    } catch (error) {
        
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
    
}

exports.viewOrder = async (req, res) => {

    try {
        const order = await orderModel.findById(req.params.id)
        res.json(order)
    } catch (error) {
        res.status(404).json({
            error: true,
            message: error
        })
    }

}

exports.updateOrder = async (req, res) => {

    try {
        let order =  await orderModel.findById(req.params.id)
        if(order) {
            await orderModel.updateOne({_id: order._id},req.body)
            return res.json(await orderModel.findById(order._id))
        }

        throw new Error('Order dosen\'t exist')

    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}

exports.removeOrder = async (req, res) => {

    try {
        let order = await orderModel.findById(req.params.id)
        if(order) {
            await orderModel.remove({
                _id: order._id
            })
            return res.status(200).json({
                message: "Successfully deleted"
            })
        }

        res.status(200).json({
            message: 'order doesn\t exist',
    
        })

        
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error
        })
    }
}