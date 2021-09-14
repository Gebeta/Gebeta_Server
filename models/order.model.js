const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'restaurant' },
  client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'client' },
  totalPrice: { type: Number, default: 0 },
  isAcitive: { type: Boolean, default: false },
  isAccepted: { type: Boolean, default: false },
  id: { type: Number, default: 0 },
  items: [{
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'item' },
    quantity: { type: Number }
  }],
  location: {
    type: {
      type: String,
      enum: "Point", default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true
    },
  },
},
  {
    timestamps: { createdAt: 'created_at', modifiedAt: 'modified_at' }
  })


module.exports = mongoose.model('order', orderSchema);