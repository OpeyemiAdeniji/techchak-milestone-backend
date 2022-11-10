const express = require('express');

//Controller methods
const {
	login,
	logout
} = require('../../../controller/authController');

// router
const router = express.Router();
const { protect } = require('../../../middleware/auth.mw');

router.post('/login', login);
router.get('/logout', logout);

module.exports = router;
