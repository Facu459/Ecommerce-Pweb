const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/products/:id', productController.detail);
router.get('/products', productController.list);

module.exports = router;