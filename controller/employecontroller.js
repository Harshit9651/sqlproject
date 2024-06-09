const Employee = require('../models/employee');

const createEmployee = async (req, res) => {
    try {
        const { firstName, lastName, position, companyId } = req.body;
        const newEmployee = await Employee.create({ firstName, lastName, position, companyId });
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the employee' });
    }
};

const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll({ include: 'Company' });
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching employees' });
    }
};

module.exports = { createEmployee, getAllEmployees };
