const express = require('express');

// routers
const authRoutes = require('./routers/auth.router');
const categoryRoutes = require('./routers/category.router');
const productRoutes = require('./routers/product.router');

// create router
const router = express.Router();

// define routes
router.use('/auth', authRoutes);
router.use('/category', categoryRoutes);
router.use('/product', productRoutes);

// for unmapped routes
router.get('/', (req, res, next) => {

	res.status(200).json({
		status: 'success',
		data: {
			name: 'Techchak backend service',
			version: '0.1.0'
		}
	})
	
});

module.exports = router;
