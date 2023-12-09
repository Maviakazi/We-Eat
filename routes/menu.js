const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menu');

// add new menu item for a restaurant
// router.post('/restaurants/:id/menu', menuController.create);
// DELETE /menuitem
router.delete(
    '/restaurants/:restaurantId/menu/:menuItemid',
    menuController.delete
);

router.put(
    '/restaurants/:restaurantId/menu/:menuItemId',
    menuController.update
);
module.exports = router;
