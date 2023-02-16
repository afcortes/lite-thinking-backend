const express = require('express');

const AuthService = require('./../services/auth.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createUserSchema, authUserSchema } = require('./../schemas/auth.shema')

const router = express.Router();
const service = new AuthService();

router.post('/register',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const user = await service.register(body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/login',
validatorHandler(authUserSchema, 'body'),
async (req, res, next) => {
  try {
    const body = req.body;
    const token = await service.login(body);
    res.json(token);
  } catch (error) {
    next(error);
  }
}
);


module.exports = router;
