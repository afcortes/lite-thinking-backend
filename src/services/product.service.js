const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class ProductService {
  constructor() {}

  async create(data, companyNIT) {
    const company = await models.Company.findByPk(companyNIT);

    if (!company) {
      throw boom.notFound('Company not found');
    }

    const newProduct = await models.Product.create(data, {include: 'company_NIT'});

    return newProduct;
  }

  async find(companyNIT) {
    const Products = await models.Product.findAll({
      where: {
        companyNIT: companyNIT
      }
    });
    return Products;
  }

  async findOne(id) {
    const Product = await models.Product.findByPk(id);
    if (!Product) {
      throw boom.notFound('Product not found');
    }
    return Product;
  }
}

module.exports = ProductService;
