const express = require('express');
const router = express.Router();

const Login = require('./middlewares/Login')

const Precautions = require('./controllers/PrecationsController');
const Restaurants = require('./controllers/RestaurantsController');
const Users = require('./controllers/UsersController');
const Authentication = require('./controllers/AuthenticationController');
const Schedules = require('./controllers/SchedulingController')

router.get('/precautions', Precautions.index);

router.post('/restaurants/register', Restaurants.create);
router.get('/restaurant/:cnpj', Restaurants.show);
router.get('/restaurants', Restaurants.index);

router.post('/user/register', Users.create);
router.get('/users', Login, Users.index);

router.post('/login', Authentication.authentication);

router.post('/schedules/:cnpj', Login, Schedules.create);

module.exports = router;