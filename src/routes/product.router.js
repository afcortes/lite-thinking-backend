const express = require('express');

const ProductService = require('./../services/product.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createProductSchema, getProductSchema } = require('./../schemas/product.schema');
const { getCompanySchema } = require('./../schemas/company.schema')

const router = express.Router();
const service = new ProductService();

router.get('/company/:NIT',
  validatorHandler(getCompanySchema, 'params'),
  async (req, res, next) => {
    try {
      const { NIT } = req.params;
      const product = await service.find(NIT);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/:NIT',
  validatorHandler(getCompanySchema, 'params'),
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { NIT } = req.params;
      const body = req.body;
      const newProduct = await service.create(body, NIT);
      res.json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
