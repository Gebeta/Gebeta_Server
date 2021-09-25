const itemModel = require('../models/item.model')
const fs = require("fs");

exports.viewAllOfItems = async (req, res) => {

    try {
        const items = await itemModel.find({}).populate('restaurandId');
        res.json(items)
    } catch (error) {
        
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
    
}


exports.viewAllitems = async (req, res) => {

    try {
        const items = await itemModel.find({}).populate('restaurant_id');
        res.json(items)
    } catch (error) {
        
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
    
}

exports.viewitem = async (req, res) => {

    try {
        const item = await itemModel.findById(req.params.id).populate('restaurant_id')
        res.json(item)
    } catch (error) {
        res.status(404).json({
            error: true,
            message: error
        })
    }

}

exports.updateitem = async (req, res) => {

    try {
        let item = await itemModel.findById(req.params.id)
        if(item) {
            await itemModel.updateOne({_id: item._id},req.body)
            return res.json(await itemModel.findById(item._id))
        }

        throw new Error('item dosen\'t exist')

    } catch (error) {
        console.log(error)
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}

exports.additem = async (req, res) => { 
    try {          
        req.body.isServed ? req.body.isServed = true : req.body.isServed = false       
        const newitem = await new itemModel({
            foodName : req.body.foodName,
            description : req.body.description,
            price: req.body.price,
            isServed : req.body.isServed,
            imgLocation: req.body.imgLocation,
            catagory: req.body.catagory,
            restaurandId: req.body.restaurandId
        })
        
        await newitem.save()
        res.status(200).json(
            newitem
        )
        
    } catch (error) {
        
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
    
}

exports.removeitem = async (req, res) => {

    try {
        let item = await itemModel.findById(req.params.id)
        if(item) {
            await itemModel.deleteOne({
                _id: item._id
            })
            fs.rm('./public/images/' + req.params.id, { recursive: true }, error => {
                if (error) return res.status(400).json({
                    error: true,
                    message: error.message
                });
                res.status(200).json({message: item.foodName + " successfully Deleted"})
            });
        
        }else{
            res.status(400).json({
                message: 'item doesn\t exist',   
            })   
        }
        
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error
        })
    }
}


