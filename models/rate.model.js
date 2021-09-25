const mongoose = require('mongoose');
const { mountpath } = require('../app');

const rateSchema = new mongoose.Schema({
    restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: "restaurant" },
    client_id: { type: mongoose.Schema.Types.ObjectId, ref: "client" },
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: "order" },
    rating: { type: Number, required: true, default: 0 },
    comment: { type: String },
    likes: { type: Number, default: 0 }
},
    {
        timestamps: { createdAt: 'created_at', modifiedAt: 'modified_at' }
    })


module.exports = mongoose.model('rate', rateSchema);