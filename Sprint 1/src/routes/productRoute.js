const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/product', productController.detail);
router.get('/products', productController.list);

module.exports = router;