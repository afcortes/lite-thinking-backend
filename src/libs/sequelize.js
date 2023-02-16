const { Sequelize } = require('sequelize');

const { config } = require('./../config/config');

const setupModels = require('./../db/models/index');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = process.env.DATABASE_URL;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: true,
})

setupModels(sequelize);

module.exports = sequelize;
