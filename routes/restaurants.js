const express = require('express');
const router = express.Router();
const restaurantsController = require('../controllers/restaurants');

router.get('/', restaurantsController.index);
router.get('/new', restaurantsController.new);
router.get('/:id', restaurantsController.show);
router.post('/', restaurantsController.create);

module.exports = router;
