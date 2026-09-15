const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/cart', cartController.viewCart);
router.post('/cart/add/:id', cartController.add); // Lo usaremos desde el detalle del producto
router.post('/cart/update', cartController.update);
router.post('/cart/clear', cartController.clear);

module.exports = router;