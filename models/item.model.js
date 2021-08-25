const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    foodName: { type: String, default: '' },
    description: { type: String, default: '' },
    price: { type: Number, default: 0 },
    isServed: { type: Boolean, default: false },
    imgLocation: { type: Array, default: [] }
  },
  {timestamps: {createdAt: 'created_at', modifiedAt: 'modified_at'}
})


module.exports = mongoose.model('item', itemSchema);