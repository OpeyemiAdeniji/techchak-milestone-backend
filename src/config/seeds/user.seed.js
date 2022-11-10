const fs = require('fs');
const colors = require('colors');

const User = require('../../model/User.model');

// read in the seed file
const users = JSON.parse(
	fs.readFileSync(`${__dirname.split('config')[0]}_data/users.json`, 'utf-8')
);

exports.seedUsers = async () => {

    try {

        const c = await User.find({});
        if (c && c.length > 0) return;

        const seed = await User.create(users);

        if(seed){
            console.log('Users seeded successfully.'.green.inverse);
        }

    } catch (err) {
        console.log(`${err}`.red.inverse);
    }

}