const rateModel = require('../models/rate.model');
const mongoose = require('mongoose');


exports.rateRestaurant = async (req, res) => {
    try {
        const newRating = await new rateModel({
            restaurant_id: mongoose.Types.ObjectId(req.body.restaurant_id),
            client_id: mongoose.Types.ObjectId(req.body.client_id),
            order_id: mongoose.Types.ObjectId(req.body.order_id),
            rating: req.body.rating,
            comment: req.body.comment,
        })

        await newRating.save()
        res.status(200).json(
            newRating
        )

    } catch (error) {

        res.status(400).json({
            error: true,
            message: error.message
        })
    }

}

exports.viewAllRating = async (req, res) => {

    try {
        const ratings = await rateModel.find({});
        res.json(ratings)
    } catch (error) {

        res.status(400).json({
            error: true,
            message: error.message
        })
    }

}

exports.viewRating = async (req, res) => {

    try {
        const ratings = await rateModel.find({ _id: req.params.id }).populate(['restaurant_id', 'client_id', 'order_id']);
        res.json(ratings)
    } catch (error) {

        res.status(400).json({
            error: true,
            message: error.message
        })
    }

}


exports.updateRating = async (req, res) => {
    var idd = mongoose.Types.ObjectId(req.params.id);
    console.log("hello ", idd);
    try {
        let rating = await rateModel.findOne({ _id: idd })
        console.log(rating);
        if (rating) {
            let numberOflikes = rating.likes;
            console.log(numberOflikes);
            rating.set({ likes: numberOflikes + 1 });
            await rating.save();
            // await rateModel.updateOne({ _id: item._id }, req.body)
            return res.json(await rateModel.findById(rating._id))
        }

        throw new Error('rating dosen\'t exist')

    } catch (error) {
        console.log(error)
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}


