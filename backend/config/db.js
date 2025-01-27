const { Sequelize } = require("sequelize");
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql'
    }
)

//connect databse
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected success!');

        // Sync with models
        await sequelize.sync({ force: false });
        console.log('Database synced success!');
    } catch (error) {
        console.error('Unable to connect to the database:', error.message);
        process.exit(1);
    }

}
module.exports = { sequelize, connectDB };