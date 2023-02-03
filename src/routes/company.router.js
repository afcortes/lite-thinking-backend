const express = require('express');

const CompanyService = require('./../services/company.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { updateCompanySchema, createCompanySchema, getCompanySchema } = require('./../schemas/company.schema');

const router = express.Router();
const service = new CompanyService();

router.get('/', async (req, res, next) => {
  try {
    const companies = await service.find();
    res.json(companies);
  } catch (error) {
    next(error);
  }
});

router.get('/:NIT',
  validatorHandler(getCompanySchema, 'params'),
  async (req, res, next) => {
    try {
      const { NIT } = req.params;
      const company = await service.findOne(NIT);
      res.json(company);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createCompanySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCompany = await service.create(body);
      res.status(201).json(newCompany);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:NIT',
  validatorHandler(getCompanySchema, 'params'),
  validatorHandler(updateCompanySchema, 'body'),
  async (req, res, next) => {
    try {
      const { NIT } = req.params;
      const body = req.body;
      const company = await service.update(NIT, body);
      res.json(company);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:NIT',
  validatorHandler(getCompanySchema, 'params'),
  async (req, res, next) => {
    try {
      const { NIT } = req.params;
      await service.delete(NIT);
      res.status(201).json({NIT});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

