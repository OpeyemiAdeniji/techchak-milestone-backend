// import { v4 as uuid } from "uuid";
// import { Response } from "miragejs";
// import { formatDate } from "../utils/authUtils";
// const sign = require("jwt-encode");
// /**
//  * All the routes related to Auth are present here.
//  * These are Publicly accessible routes.
//  * */

// /**
//  * This handler handles user signups.
//  * send POST Request at /api/auth/signup
//  * body contains {firstName, lastName, email, password}
//  * */

// export const signupHandler = function (schema, request) {
//   const { email, password, ...rest } = JSON.parse(request.requestBody);
//   try {
//     // check if email already exists
//     const foundUser = schema.users.findBy({ email });
//     if (foundUser) {
//       return new Response(
//         422,
//         {},
//         {
//           errors: ["Unprocessable Entity. Email Already Exists."],
//         }
//       );
//     }
//     const _id = uuid();
//     const newUser = {
//       _id,
//       email,
//       password,
//       createdAt: formatDate(),
//       updatedAt: formatDate(),
//       ...rest,
//       cart: [],
//       wishlist: [],
//     };
//     const createdUser = schema.users.create(newUser);
//     const encodedToken = sign({ _id, email }, process.env.REACT_APP_JWT_SECRET);
//     return new Response(201, {}, { createdUser, encodedToken });
//   } catch (error) {
//     return new Response(
//       500,
//       {},
//       {
//         error,
//       }
//     );
//   }
// };

// /**
//  * This handler handles user login.
//  * send POST Request at /api/auth/login
//  * body contains {email, password}
//  * */

// export const loginHandler = function (schema, request) {
//   const { email, password } = JSON.parse(request.requestBody);
//   try {
//     const foundUser = schema.users.findBy({ email });
//     if (!foundUser) {
//       return new Response(
//         404,
//         {},
//         { errors: ["The email you entered is not Registered. Not Found error"] }
//       );
//     }
//     if (password === foundUser.password) {
//       const encodedToken = sign(
//         { _id: foundUser._id, email },
//         process.env.REACT_APP_JWT_SECRET
//       );
//       foundUser.password = undefined;
//       return new Response(200, {}, { foundUser, encodedToken });
//     }
//     return new Response(
//       401,
//       {},
//       {
//         errors: [
//           "The credentials you entered are invalid. Unauthorized access error.",
//         ],
//       }
//     );
//   } catch (error) {
//     return new Response(
//       500,
//       {},
//       {
//         error,
//       }
//     );
//   }
// };

const crypto = require('crypto');
const ErrorResponse = require('../utils/errorResponse.util');
const asyncHandler = require('../middleware/async.mw');


const User = require('../model/User.model');

// @desc        Login user
// @route       POST /api/v1/auth/login
// @access      Public
exports.login = asyncHandler(async (req, res, next) => {

	const { email, password } = req.body;

	// Validate email and password
	if (!email || !password) {
		return next(new ErrorResponse('Please provide an email and password', 400, ['Please provide an email and password']));
	}

	//check for user
	const user = await User.findOne({ email }).select('+password');
	console.log(user)

	if (!user) {
		return next(new ErrorResponse('Invalid credentials', 401, ['Invalid credentials']));
	}

	//send response
	const msg = `Login successful`;
	sendTokenResponse(user, msg, 200, res);
});


// @desc    Log user out / Clear cookie
// @route   GET /api/v1/auth/logout
// @access  Public
exports.logout = asyncHandler(async (req, res, next) => {
	res.cookie('token', 'none', {
		expires: new Date(Date.now() + 10 * 1000),
		httpOnly: true,
	});

	res.status(200).json({
		error: false,
		errors: [],
		data: null,
		message: 'Logout successful',
		status: 200,
	});
});

// @desc    Helper function: get token from model, create cookie and send response
// @route   None
// @access  public
// exports.sendRouteTokenResponse = (user, message, statusCode, res) => {
// 	// create token
// 	const token = user.getSignedJwtToken();

// 	const options = {
// 		expires: new Date(
// 			Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
// 		),
// 		httpOnly: true,
// 	};

// 	// make cookie work for https
// 	if (process.env.NODE_ENV === 'production') {
// 		options.secure = true;
// 	}

// 	//data
// 	const userData = {
// 		_id: user._id,
// 		firstname: user.firstname || 'Nil',
// 		lastname: user.lastname || 'Nil',
// 		is_parent: user.is_parent,
// 		is_school: user.is_school,
// 		is_activated: user.is_activated,
// 	};

// 	res.status(statusCode).cookie('token', token, options).json({
// 		status: true,
// 		message: message,
// 		token: token,
// 		user: userData,
// 	});
// };

// Helper function: get token from model, create cookie and send response
const sendTokenResponse = async (user, message, statusCode, res) => {
	// create token
	const token = user.getSignedJwtToken();

	const options = {
		expires: new Date(
			Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
	};

	// make cookie work for https
	if (process.env.NODE_ENV === 'production') {
		options.secure = true;
	}

	const u = await User.findOne({ email: user.email})

	//data
	const userData = {
		_id: u._id,
		email: u.email,
	};

	res.status(statusCode).cookie('token', token, options).json({
		error: false,
		errors: [],
		message: message,
		token: token,
		user: userData,
	});
};