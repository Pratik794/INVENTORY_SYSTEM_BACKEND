const Product = require('../models/Product');
const { v4: uuidv4 } = require('uuid'); // To generate unique IDs

// Add a saree product
exports.addProduct = async (req, res) => {
  try {
    const { name, category, price, stock } = req.body;

    // Validations
    if (!name || !category || price == null || stock == null) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (price < 0 || stock < 0) {
      return res.status(400).json({ error: 'Price and stock must be non-negative' });
    }

    const product = new Product({
      name,
      category,
      price,
      stock,
      uniqueId: uuidv4(), // Generate a unique ID for the product
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove a saree product
exports.removeProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if product exists
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: 'Product removed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update stock of a saree product
exports.updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { stock } = req.body;

    // Validation
    if (stock == null || stock < 0) {
      return res.status(400).json({ error: 'Stock must be a non-negative number' });
    }

    const product = await Product.findByIdAndUpdate(id, { stock }, { new: true });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Sell a saree product
exports.sellProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (product.stock <= 0) {
      return res.status(400).json({ error: 'Insufficient stock' });
    }

    product.stock -= 1; // Decrease stock by 1
    product.sold += 1; // Increment sold count
    await product.save();

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get total amount of saree products
exports.getTotalAmount = async (req, res) => {
  try {
    const products = await Product.find();
    const totalAmount = products.reduce((sum, product) => sum + product.price * product.stock, 0);
    res.status(200).json({ totalAmount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get saree products by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const products = await Product.find({ category });
    if (products.length === 0) {
      return res.status(404).json({ error: 'No products found in this category' });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

