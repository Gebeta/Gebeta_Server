const itemModel = require('../models/item.model')
const fs = require("fs");

exports.getImage = async (req,res) => {
    try {
        res.sendFile('/public/images/' + req.params.name, { root: '.' })
    } catch (error) {
        
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}

exports.uploadImg = async (req,res) => {
    try {
        var len = req.files.length;
        var image = JSON.parse(req.body.imgs);
        var folder = './public/images/' + req.body.itemId;
        if(JSON.parse(req.body.isNewItem)){
            fs.mkdir(folder, function(err) {
                if (err) {
                    console.log(err)
                    return res.status(400).json({error: true, message:err.message})
                }
            })
        }

        suspend(1000).then(() => {
            for(var i = 0; i < len; i++){
                var file = req.files[i];
                var target_path = folder + '/' + image[i];                  
                fs.rename(file.path, target_path, err => {
                    if (err) {
                        //if [File not found] error occur, try to rename img again after 3s
                        suspend(3000).then(() => {
                            fs.rename(file.path, target_path, err => {
                                res.status(400).json({error: true, message: err.message})
                            })
                        })
                        return
                    }
                }) 
            } 

            res.status(200).json({message: len + " images added successfully"})       
        });

    } catch (error) {
        
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}


exports.deleteImage = async (req,res) => {
    try {
        var file = './public/images/' + req.params.id + '/' + req.body.img
        fs.unlink(file , error => {
            if (error) return res.status(400).json({
                error: true,
                message: error.message
            });
        })

        let item = await itemModel.findById(req.params.id)
        if(item) {
            item.imgLocation = item.imgLocation.filter(img => img !== req.body.img)
            await itemModel.updateOne({_id: item._id},item)
            return res.json(await itemModel.findById(item._id))
        }

        throw new Error('item dosen\'t exist')
        
    } catch (error) {
        
        res.status(400).json({
            error: true,
            message: error.message
        })
    }
}

function suspend(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
