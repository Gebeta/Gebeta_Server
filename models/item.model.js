const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const itemSchema = new mongoose.Schema({
    foodName: { type: String, default: '' },
    description: { type: String, default: '' },
    price: { type: Number, default: 0 },
    isServed: { type: Boolean, default: false },
    imgLocation: { type: Array, default: [] }
  },
  {timestamps: {createdAt: 'created_at', modifiedAt: 'modified_at'}
})

itemSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('item', itemSchema);