// import { Response } from "miragejs";

// /**
//  * All the routes related to Category are present here.
//  * These are Publicly accessible routes.
//  * */

// /**
//  * This handler handles gets all categories in the db.
//  * send GET Request at /api/categories
//  * */

// export const getAllCategoriesHandler = function () {
//   try {
//     return new Response(200, {}, { categories: this.db.categories });
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
//  * This handler handles gets all categories in the db.
//  * send GET Request at /api/user/category/:categoryId
//  * */

// export const getCategoryHandler = function (schema, request) {
//   const categoryId = request.params.categoryId;
//   try {
//     const category = schema.categories.findBy({ _id: categoryId });
//     return new Response(200, {}, { category });
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

const ErrorResponse = require('../utils/errorResponse.util');
const asyncHandler = require('../middleware/async.mw');

const Category = require('../model/Category.model');

// @desc           Get all Categories
// @route          GET /api/v1/categories
exports.getCategories = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);   
});
