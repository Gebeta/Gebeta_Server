const restaurantModel = require('../models/restaurant.model')

exports.viewAllrestaurants = async (req, res) => {
    try {
        const restaurants = await restaurantModel.paginate({});
        res.json(restaurants)
    } catch (error) {
        
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
    
}

exports.viewRestaurant = async (req, res) => {
    try {
        const restaurant = await restaurantModel.findById(req.params.id)
        res.json(restaurant)
    } catch (error) {
        res.status(404).json({
            error: true,
            message: error
        })
    }

}

exports.updateRestaurant = async (req, res) => {

    try {
        let restaurant =  await restaurantModel.find({_id:req.restaurant.data._id})
        if(restaurant) {
            restaurant = await restaurantModel.updateOne({_id: req.restaurant.data._id}, req.body)
            return res.json({message :"successfully updated"})
        }
        throw new Error('restaurant dosen\'t exist')

    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}

exports.removeRestaurant = async (req, res) => {
    try {
        let restaurant = await restaurantModel.findById(req.params.id)
        if(restaurant) {
            await restaurantModel.remove({
                _id: restaurant._id
            })
            return res.status(200).json({
                message: "Successfully deleted"
            })
        }

        res.status(200).json({
            message: 'restaurant doesn\t exist',
    
        })

        
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error
        })
    }
}
