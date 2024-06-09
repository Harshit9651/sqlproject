const { DataTypes } = require('sequelize');
const sequelize = require('../DB/connect'); 
const Company = require('./company'); 
const Employee = sequelize.define('Employee', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    companyId: {
        type: DataTypes.INTEGER,
        references: {
            model: Company,
            key: 'id',
        },
    },
}, {
    tableName: 'employees',
    timestamps: true,
});

Company.hasMany(Employee, { foreignKey: 'companyId' });
Employee.belongsTo(Company, { foreignKey: 'companyId' });

module.exports = Employee;
