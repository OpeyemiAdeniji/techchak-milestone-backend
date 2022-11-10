const fs = require('fs');
const colors = require('colors');

const Product = require('../../model/Product.model');

// read in the seed file
const products = JSON.parse(
	fs.readFileSync(`${__dirname.split('config')[0]}_data/products.json`, 'utf-8')
);

exports.seedProducts = async () => {

    try {

        const c = await Product.find({});
        if (c && c.length > 0) return;

        const seed = await Product.create(products);

        if(seed){
            console.log('Products seeded successfully.'.green.inverse);
        }

    } catch (err) {
        console.log(`${err}`.red.inverse);
    }

}