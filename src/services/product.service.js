const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class ProductService {
  constructor() {}

  async create(data) {

    const { companyNIT } = data;

    const company = await models.Company.findByPk(companyNIT);

    if (!company) {
      throw boom.notFound('Company not found');
    }

    const productData = {...data, CompanyNIT: companyNIT};

    const newProduct = await models.Product.create(productData);

    return newProduct;
  }

  async find(companyNIT) {
    const Products = await models.Product.findAll({
      where: {
        CompanyNIT: companyNIT
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
