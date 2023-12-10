const express = require('express');
const router = express.Router();
const restaurantsController = require('../controllers/restaurants');
const ensureLoggedIn = require('../config/ensureLoggedIn');

router.get('/', restaurantsController.index);
router.get('/new', ensureLoggedIn, restaurantsController.new);
router.get('/:id', restaurantsController.show);
router.post('/', ensureLoggedIn, restaurantsController.create);
router.get('/:id/edit', ensureLoggedIn, restaurantsController.edit);
router.put('/:id', ensureLoggedIn, restaurantsController.update);
router.delete('/:id', ensureLoggedIn, restaurantsController.delete);

module.exports = router;
