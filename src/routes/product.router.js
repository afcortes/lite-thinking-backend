const express = require('express');

const ProductService = require('./../services/product.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createProductSchema, getProductSchema } = require('./../schemas/product.schema');
const { getCompanySchema } = require('./../schemas/company.schema')

const router = express.Router();
const service = new ProductService();

router.get('/general/:NIT',
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

router.get('/specific/:id',
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

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newProduct = await service.create(body);
      res.json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
