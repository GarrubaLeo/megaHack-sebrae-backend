const express = require('express');
const router = express.Router();

const Precautions = require('./controllers/PrecationsController');
const Restaurants = require('./controllers/RestaurantsController');
const Users = require('./controllers/UsersController');
const Authentication = require('./controllers/AuthenticationController');

router.get('/precautions', Precautions.index);

router.post('/restaurants/register', Restaurants.create);
router.get('/restaurant/:cnpj', Restaurants.show);
router.get('/restaurants', Restaurants.index);

router.post('/user/register', Users.create);

router.post('/login', Authentication.authentication);

module.exports = router;