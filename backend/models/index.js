const { Sequelize } = require("sequelize")
const { sequelize } = require('../config/db.js');

const dbConnect = {};
dbConnect.Sequelize = sequelize;
dbConnect.sequelize = sequelize;

dbConnect.Category = require('./categoryModel.js')(sequelize, Sequelize);
dbConnect.Product = require('./productModel.js')(sequelize, Sequelize);


dbConnect.Category.hasMany(dbConnect.Product, { foreignKey: 'categoryId' });
dbConnect.Product.belongsTo(dbConnect.Category, { foreignKey: 'categoryId' });


module.exports = dbConnect;