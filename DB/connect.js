const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('testdata', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, // Disable logging SQL queries to the console
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = sequelize;
