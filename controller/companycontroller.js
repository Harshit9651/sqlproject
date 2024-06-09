const Company = require('../models/company');

const createCompany = async (req, res) => {
    try {
        const { name, location } = req.body;
        const newCompany = await Company.create({ name, location });
        res.status(201).json(newCompany);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating the company' });
    }
};

const getAllCompanies = async (req, res) => {
    try {
        const companies = await Company.findAll();
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching companies' });
    }
};

module.exports = { createCompany, getAllCompanies };
