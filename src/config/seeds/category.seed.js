const fs = require('fs');
const colors = require('colors');

const Category = require('../../model/Category.model');

// read in the seed file
const categories = JSON.parse(
	fs.readFileSync(`${__dirname.split('config')[0]}_data/categories.json`, 'utf-8')
);

exports.seedCategories = async () => {

    try {

        const c = await Category.find({});
        if (c && c.length > 0) return;

        const seed = await Category.create(categories);

        if(seed){
            console.log('Categories seeded successfully.'.green.inverse);
        }

    } catch (err) {
        console.log(`${err}`.red.inverse);
    }

}