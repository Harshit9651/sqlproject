const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // It's good practice to use camelCase
const sequelize = require('./DB/connect'); // Correct import of sequelize instance
const Employee = require('./model/employe.js'); 
const company = require('./model/company.js')


app.use(bodyParser.json()); // Use bodyParser to parse JSON bodies

app.listen(3000, () => {
    console.log('App running on port number 3000');
});

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: false }); // force: true will drop the table if it already exists
        console.log('Database & tables created!');
    } catch (error) {
        console.error('Error creating database & tables:', error);
    }
};

syncDatabase();
