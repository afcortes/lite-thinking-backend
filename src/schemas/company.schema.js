const Joi = require('joi');

const NIT = Joi.string();
const name = Joi.string();
const address = Joi.string();
const phoneNumber = Joi.string();

const createCompanySchema = Joi.object({
  NIT: NIT.required(),
  name: name.required(),
  address: address.required(),
  phoneNumber: phoneNumber.required(),
});

const updateCompanySchema = Joi.object({
  name,
  address,
  phoneNumber
});

const getCompanySchema = Joi.object({
  NIT: NIT.required(),
});

module.exports = { createCompanySchema, updateCompanySchema, getCompanySchema }
