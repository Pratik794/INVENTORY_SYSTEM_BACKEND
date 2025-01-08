const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  sold: { type: Number, default: 0 },
  uniqueId: { type: String, unique: true, required: true },
});

module.exports = mongoose.model('Product', productSchema);
