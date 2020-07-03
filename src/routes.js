const express = require('express');
const router = express.Router();

const Precautions = require('./controllers/PrecationsController');
const Restaurants = require('./controllers/RestaurantsController')

router.get('/precautions', Precautions.index);

router.post('/restaurants/register', Restaurants.create);
router.get('/restaurant/:cnpj', Restaurants.show);
router.get('/restaurants', Restaurants.index);

module.exports = router;