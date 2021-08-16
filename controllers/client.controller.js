const clientModel = require('../models/client.model')

exports.viewAllclients = async (req, res) => {

    try {
        const clients = await clientModel.paginate({});
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
        let client =  await clientModel.find({_id:req.client.data._id})
        if(client) {
            client = await clientModel.updateOne({_id: req.client.data._id}, req.body)
            return res.json({message :"successfully updated"})
        }

        throw new Error('Client dosen\'t exist')

    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}

exports.removeClient = async (req, res) => {

    try {
        let client = await clientModel.findById(req.params.id)
        if(client) {
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

