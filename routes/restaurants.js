const express = require('express');
const router = express.Router();
const restaurantsController = require('../controllers/restaurants');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/', restaurantsController.index);
router.get('/new', restaurantsController.new);
router.get('/:id', restaurantsController.show);
router.post('/', restaurantsController.create);
router.get('/:id/edit', restaurantsController.edit);
router.put('/:id', restaurantsController.update);
router.delete('/:id', restaurantsController.delete);

module.exports = router;
