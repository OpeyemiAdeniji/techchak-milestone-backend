// import { Response } from "miragejs";

// /**
//  * All the routes related to Product are present here.
//  * These are Publicly accessible routes.
//  * */

// /**
//  * This handler handles gets all products in the db.
//  * send GET Request at /api/products
//  * */

// export const getAllProductsHandler = function () {
//   return new Response(200, {}, { products: this.db.products });
// };

// /**
//  * This handler handles gets all products in the db.
//  * send GET Request at /api/user/products/:productId
//  * */

// export const getProductHandler = function (schema, request) {
//   const productId = request.params.productId;
//   try {
//     const product = schema.products.findBy({ _id: productId });
//     return new Response(200, {}, { product });
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

// @desc           Get all Products
// @route          GET /api/v1/products
exports.getProducts = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);   
});