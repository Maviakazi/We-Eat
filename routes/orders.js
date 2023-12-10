const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders');

router.get('/order', ordersController.index);
router.post(
    '/orders/:restaurantId/menu/:menuItemId/add',
    ordersController.addToOrder
);

router.post(
    '/restaurants/:restaurantId/orders',
    ordersController.addToRestaurant
);
router.delete('/orders/:orderId', ordersController.removeFromOrder);

module.exports = router;
