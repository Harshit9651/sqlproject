const { DataTypes } = require('sequelize');
const sequelize = require('../DB/connect.js'); // Ensure correct path

const Company = sequelize.define('Company', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'companies',
    timestamps: true,
});

module.exports = Company;
