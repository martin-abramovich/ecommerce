const express = require('express');
const router = express.Router();
const apiController = require('./../controllers/apiController');
const db = require('../database/models');
const path = require('path');

router.get('/users', apiController.users);
router.get('/users/:id', apiController.findUser);
router.get('/products', apiController.products);
router.get('/categories', apiController.categories);
router.get('/product/:id', apiController.product);

module.exports = router;