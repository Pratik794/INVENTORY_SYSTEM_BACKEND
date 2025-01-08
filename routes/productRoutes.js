const express = require('express');
const {
  addProduct,
  removeProduct,
  updateStock,
  getTotalAmount,
  getProductsByCategory,
  sellProduct,
  getAllProducts,
} = require('../controllers/productController');

const router = express.Router();

router.post('/', addProduct);
router.delete('/:id', removeProduct);
router.put('/:id', updateStock);
router.put('/sell/:id', sellProduct); // New route for selling a product
router.get('/total', getTotalAmount);
router.get('/category/:category', getProductsByCategory);
router.get('/', getAllProducts);

module.exports = router;
