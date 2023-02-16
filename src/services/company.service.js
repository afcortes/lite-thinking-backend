const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

const initializeNodemailer = require('./../libs/nodemailer');
const nodemailer = initializeNodemailer();

const FileService = require('./file.service');
const fileService = new FileService();

class CompanyService {


  constructor() {}

  async create(data) {
    const newCompany = await models.Company.create(data);
    return newCompany;
  }

  async find() {
    const Companys = await models.Company.findAll({include: 'products'});
    return Companys;
  }

  async findOne(NIT) {
    const Company = await models.Company.findByPk(NIT, {include: 'products'});
    if (!Company) {
      throw boom.notFound('Company not found');
    }
    return Company;
  }

  async update(NIT, changes) {
    const Company = await this.findOne(NIT);
    if (!Company) {
      throw boom.notFound('Company not found');
    }
    const response = await Company.update(changes);
    return response;
  }

  async delete(NIT) {
    const Company = await this.findOne(NIT);
    if (!Company) {
      throw boom.notFound('Company not found');
    }
    await Company.destroy();
    return { NIT };
  }

  async downloadPDF(NIT) {
    const company = await this.findOne(NIT);
    const pdf = await fileService.createPdfFromTable(company.products);
    return pdf;
  }

}

module.exports = CompanyService;
