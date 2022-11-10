const express = require('express');

//Controller methods
const {
	getCategories,
} = require('../../../controller/categoryController');
const advancedResults = require('../../../middleware/advancedResults');
const Category = require('../../../model/Category.model');

// router
const router = express.Router();
const { protect } = require('../../../middleware/auth.mw');

router.get('/', protect, advancedResults(Category), getCategories);

module.exports = router;
