const orderModel = require('../models/order.model');
const mongoose = require('mongoose');


exports.getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find().populate(['client_id', 'items._id', 'restaurant_id']);
        res.json(orders)
    } catch (error) {

        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}


exports.viewAllorders = async (req, res) => {

    try {
        const orders = await orderModel.find({ restaurant_id: req.params.id }).populate(['client_id', 'items._id']);
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
        const order = await orderModel.findById(req.params.id).populate(['items._id', 'client_id', 'restaurant_id']);
        res.json(order)
    } catch (error) {
        res.status(404).json({
            error: true,
            message: error
        })
    }

}


exports.viewActiveOrders = async (req, res) => {

    try {
        const order = await orderModel.find({ status: 'active' }).populate(['items._id', 'client_id', 'restaurant_id']);
        res.json(order)
    } catch (error) {
        res.status(404).json({
            error: true,
            message: error
        })
    }

}

exports.updateOrderByDriver = async (req, res) => {
    try {

        let order = await orderModel.find({ _id: req.body.order_id });
        console.log(order)
        if (order) {
            await orderModel.updateOne({ _id: req.body.order_id }, { ...order, status:"accepted" })
            return res.json(await orderModel.findById(order._id))
        }

        throw new Error('Order dosen\'t exist')
    } catch (error) {
        res.status(404).json({
            error: true,
            message: error.message
        })
    }
}

exports.viewCompletedOrders = async (req, res) => {

    try {
        const order = await orderModel.find({ status: "archived" }).populate(['items._id', 'client_id', 'restaurant_id']);
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
        let order = await orderModel.findById(req.params.id)
        if (order) {
            await orderModel.updateOne({ _id: order._id }, req.body)
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
        if (order) {
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
            message: error.message
        })
    }
}

exports.createOrder = async (req, res) => {
    try {
        console.log(req.body.items.map(item => {
            console.log(item.id);
        }));
        var len = 0;
        await orderModel.count({}, function (error, numOfDocs) {
            console.log(typeof numOfDocs + ' documents in my collection');
            len = numOfDocs;
            // ..
        });
        console.log(len);
        const newOrder = await new orderModel({
            id: len + 1,
            restaurant_id: mongoose.Types.ObjectId(req.body.restaurantId),
            client_id: mongoose.Types.ObjectId(req.body.clientId),
            totalPrice: req.body.totalPrice,
            deliveryfee: req.body.deliveryfee,
            isAcitive: req.body.isAcitive,
            items: req.body.items.map(item => {
                return {
                    _id: mongoose.Types.ObjectId(item.id),
                    quantity: item.quantity
                };
            })
            // items:req.body.items.map(item=>{
            //     return {id:mongoose.Types.ObjectId(item.id)}
            // })
        })
        await newOrder.save()
        res.status(200).json(
            newOrder
        )
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}