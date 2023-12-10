const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders');

router.get('/orders', ordersController.index);
router.post(
    '/orders/:restaurantId/menu/:menuItemId/add',
    ordersController.addToOrder
);

router.post(
    '/restaurants/:restaurantId/orders',
    ordersController.addToRestaurant
);

module.exports = router;
