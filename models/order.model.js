const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    restaurant_id : {type: String},
    client_id : {type: String},
    totalPrice: { type: Number, default: 0 },
    isAcitive: { type: Boolean, default: false },
    items: { type: Array, default: [] }
  },
  {timestamps: {createdAt: 'created_at', modifiedAt: 'modified_at'}
})


module.exports = mongoose.model('order', orderSchema);