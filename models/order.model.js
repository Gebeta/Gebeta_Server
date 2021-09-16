const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    restaurant_id : {type: String},
    client_id : {type: String},
    totalPrice: { type: Number, default: 0 },
    status: { type: String, default: '' },
    items: { type: Array, default: [] }
  },
  {timestamps: {createdAt: 'created_at', modifiedAt: 'modified_at'}
})


module.exports = mongoose.model('order', orderSchema);