const clientModel = require('../models/client.model')
const fs = require("fs");

exports.viewAllclients = async (req, res) => {

    try {
        const clients = await clientModel.find({});
        res.json(clients)
    } catch (error) {

        res.status(400).json({
            error: true,
            message: error.message
        })
    }

}

exports.viewClient = async (req, res) => {

    try {
        const client = await clientModel.findById(req.params.id)
        res.json(client)
    } catch (error) {
        res.status(404).json({
            error: true,
            message: error
        })
    }

}

exports.updateClient = async (req, res) => {

    try {
        const client = await clientModel.findById(req.params.id)
        if (client) {
            client.category = req.body.catagory
            client.price = req.body.price
            client = await clientModel.updateOne({ _id: req.client.data._id }, req.body)
            return res.json({ message: "successfully updated" })
        }

        throw new Error('Client dosen\'t exist')

    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}

exports.uploadProfile = async (req, res) => {

    try {
        var folder = './public/images/' + req.body.clientId;
        fs.mkdir(folder, function (err) {
            if (err) {
                console.log(err)
                return res.status(400).json({ error: true, message: err.message })
            }
        })
        let client = await clientModel.find({ _id: req.body.clientId })
        await clientModel.updateOne({ _id: req.body.clientId }, { ...client, address: req.body.address, profile_picture: req.files[0].originalname })

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

exports.removeClient = async (req, res) => {

    try {
        let client = await clientModel.findById(req.params.id)
        if (client) {
            await clientModel.remove({
                _id: client._id
            })
            return res.status(200).json({
                message: "Successfully deleted"
            })
        }

        res.status(200).json({
            message: 'client doesn\t exist',

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
