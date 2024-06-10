const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 
const sequelize = require('./DB/connect'); 
const path = require('path')
const Employee = require('./model/employe.js'); 
const company = require('./model/company.js')
const ejsmate = require("ejs-mate");
const companyroute = require('./routes/companyrouter.js')
const employeeroute = require('./routes/employerouter.js')
//middlewares 
app. use(express.json());
app.use(express.urlencoded({extended:true})) 
app.set("view engine","ejs");
app.engine("ejs",ejsmate)
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log('App running on port number 3000');
});
const syncDatabase = async () => {
    try {
        await sequelize.sync({ force:true }); 
        console.log('Database schema updated!');
    } catch (error) {
        console.error('Error updating database schema:', error);
    }
};
syncDatabase();
app.use('/', companyroute);
app.use('/',employeeroute)
