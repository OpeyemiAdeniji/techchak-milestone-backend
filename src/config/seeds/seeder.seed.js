const { seedUsers } = require('./user.seed');
const { seedCategories } = require('./category.seed');
const { seedProducts } = require('./product.seed');

exports.seedData = async () => {
    await seedUsers();
    await seedCategories();
    await seedProducts();
}