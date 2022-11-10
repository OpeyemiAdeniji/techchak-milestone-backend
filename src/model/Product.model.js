const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ProductSchema = new mongoose.Schema(
	{
        title: {
			type: String,
		},

        price: {
			type: String,
		},

        category: {
			type: String,
		},
        
        image: {
			type: String,
		},

		description: {
			type: String,
		},

	},
	{
		timestamps: true,
	}
);

// Encrypt password using bcrypt
ProductSchema.pre('save', async function (next) {
    return next()
});

module.exports = mongoose.model('Product', ProductSchema);