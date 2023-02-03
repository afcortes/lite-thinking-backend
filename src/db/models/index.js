const { Company, CompanySchema } = require('./company.model');
const { Product, ProductSchema } = require('./product.model');
const { User, UserSchema } = require('./user.model');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Company.init(CompanySchema, Company.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));

  Product.associate(sequelize.models);
;}

module.exports = setupModels;
