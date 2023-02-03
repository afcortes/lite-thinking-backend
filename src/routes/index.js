const express = require('express');

const usersRouter = require('./users.router');
const authRouter = require('./auth.router');
const companyRouter = require('./company.router');
const productRouter = require('./product.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/users', usersRouter);
  router.use('/auth', authRouter);
  router.use('/company', companyRouter);
  router.use('/product', productRouter);
}

module.exports = routerApi;
