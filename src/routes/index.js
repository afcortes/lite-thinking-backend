const express = require('express');

const authRouter = require('./auth.router');
const companyRouter = require('./company.router');
const productRouter = require('./product.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/auth', authRouter);
  router.use('/company', companyRouter);
  router.use('/product', productRouter);
}

module.exports = routerApi;
