const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse.util');
const asyncHandler = require('./async.mw');
const User = require('../model/User.model');

// protect routes
exports.protect = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		// set token from bearer token in header
		token = req.headers.authorization.split(' ')[1]; //get the token
	}

	// set token from cookie
	// else if(req.cookies.token){
	//     token = req.cookies.token
	// }

	try {
		//make sure token exists
		if (!token) {
			return next(new ErrorResponse('Invalid token. Not authorized to access this route', 401));
		}	

		const jwtData = jwt.verify(token, process.env.JWT_SECRET);
		req.user = await User.findOne({_id: jwtData.id});

		if(req.user){
			return next();
		}else{
			return next(new ErrorResponse(`Error. Not authorized to access this route`, 401));
		}
	} catch (err) {
		return next(new ErrorResponse(`Error. Not authorized to access this route`, 401));
	}
});