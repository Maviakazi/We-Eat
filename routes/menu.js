const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu');
const ensureLoggedIn = require('../config/ensureLoggedIn');

// add new menu item for a restaurant
// router.post('/restaurants/:id/menu', menuController.create);
// DELETE /menuitem
router.delete(
    '/restaurants/:restaurantId/menu/:menuItemid',
    ensureLoggedIn,
    menuController.delete
);
router.get(
    '/restaurants/:restaurantId/menu/new',
    ensureLoggedIn,
    menuController.new
);
router.post(
    '/restaurants/:restaurantId/menu',
    ensureLoggedIn,
    menuController.create
);
router.get(
    '/restaurants/:restaurantId/menu/:menuItemId/edit',
    ensureLoggedIn,
    menuController.edit
);
router.put(
    '/restaurants/:restaurantId/menu/:menuItemId',
    ensureLoggedIn,
    menuController.update
);
module.exports = router;
