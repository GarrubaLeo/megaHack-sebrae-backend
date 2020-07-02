const express = require('express');
const router = express.Router();

const Precautions = require('./controllers/PrecationsController');

router.get('/precautions', Precautions.index);

module.exports = router;