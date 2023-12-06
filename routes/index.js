const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    res.send('Home Page coming soon...');
});

module.exports = router;
