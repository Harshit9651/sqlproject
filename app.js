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
const session = require('express-session');
const methodOverride = require('method-override');
require('dotenv');


//middlewares 
app. use(express.json());
app.use(express.urlencoded({extended:true})) 
app.set("view engine","ejs");
app.engine("ejs",ejsmate);
app.use(methodOverride('_method'));
app.use(session({
    secret:'MY SECRET',
    resave:false,
    saveUninitialized:false,
   // store:store,
    cookie: { maxAge: 6 * 60 * 60 * 1000 } // 6 hours session expiration
  }))
  app.use('/', companyroute);
  app.use('/',employeeroute)
app.listen(3000, () => {
    console.log('App running on port number 3000');
});
const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true }); 
        console.log('Database schema updated!');
    } catch (error) {
        console.error('Error updating database schema:', error);
    }
};
syncDatabase();

