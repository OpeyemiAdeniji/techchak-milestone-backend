const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const CategorySchema = new mongoose.Schema(
	{
		categoryName: {
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
CategorySchema.pre('save', async function (next) {
    return next()
});

module.exports = mongoose.model('Category', CategorySchema);