const { Model, DataTypes, Sequelize } = require('sequelize');

const { COMPANY_TABLE } = require('./company.model')

const PRODUCT_TABLE = 'products';

const ProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  description: {
      allowNull: false,
      type: DataTypes.TEXT,
  },
  createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: Sequelize.NOW,
  },
  CompanyNIT: {
    field: 'company_NIT',
    type: DataTypes.STRING,
    references: {
        model: COMPANY_TABLE,
        key: 'NIT',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
},
}

class Product extends Model {

  static associate(models) {
    this.belongsTo(models.Company);
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Product',
      timestamps: false
    }
  }
}

module.exports = { PRODUCT_TABLE, ProductSchema, Product }
