const express = require('express');

//Controller methods
const {
	getProducts,
} = require('../../../controller/productController');
const advancedResults = require('../../../middleware/advancedResults');
const Product = require('../../../model/Product.model');

// router
const router = express.Router();
const { protect } = require('../../../middleware/auth.mw');

router.get('/', protect, advancedResults(Product), getProducts);

module.exports = router;
