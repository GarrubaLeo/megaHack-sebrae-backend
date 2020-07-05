const express = require('express');
const router = express.Router();

const multer = require('multer');
const configMulter = require('./config/multer');

const Login = require('./middlewares/Login');

const Upload = multer(configMulter);

const Precautions = require('./controllers/PrecationsController');
const Restaurants = require('./controllers/RestaurantsController');
const Users = require('./controllers/UsersController');
const Authentication = require('./controllers/AuthenticationController');
const Schedules = require('./controllers/SchedulingController');
const Profile = require('./controllers/ProfileController');
const Menu = require('./controllers/MenuController');
const Vouchers = require('./controllers/VouchersController');

router.get('/precautions', Precautions.index);

router.post('/restaurants/register', Upload.single('image'), Restaurants.create);
router.get('/restaurant/:cnpj', Restaurants.show);
router.get('/restaurants', Login, Restaurants.index)
router.get('/restaurants/localization', Login, Restaurants.indexLocalization);

router.post('/user/register', Users.create);
router.get('/users', Login, Users.index);

router.get('/profile', Login, Profile.show);

router.post('/login', Authentication.authentication);

router.post('/schedules/:cnpj', Login, Schedules.create);
router.get('/schedules/user', Login, Schedules.showSchedulesUser);
router.get('/schedules/restaurant/:cnpj', Schedules.showSchedulesRestaurant);

router.post('/menu/:cnpj', Upload.single('image') ,Menu.create);
router.get('/menu/:cnpj', Menu.show);

router.post('/vouchers/create/:cnpj', Vouchers.create);
router.get('/vouchers/restaurant/:cnpj', Vouchers.show);
router.get('/vouchers', Vouchers.index);

module.exports = router;