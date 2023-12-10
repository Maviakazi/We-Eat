const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/order', ensureLoggedIn, ordersController.index);
router.get('/order/checkout', ensureLoggedIn, ordersController.checkout);
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
