const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { models } = require('./../libs/sequelize');

class AuthService {
  constructor() {}

  async register(data) {
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(data.password, salt);
    const dataWithEncryptedPassword = { ...data, password: encryptedPassword};
    const newUser = await models.User.create(dataWithEncryptedPassword);
    const accessToken = jwt.sign({user: newUser}, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRES_IN})
    return {
      accessToken
    };
  }

  async login(data) {
    const user = await models.User.findOne({
      where: {
        email: data.email
      }
    })
    if (!user) {
      throw boom.notFound('user not found');
    }
    if(!bcrypt.compareSync(data.password, user.password)) {
      throw boom.unauthorized('password is not correct');
    }
    const accessToken = jwt.sign({user: user}, process.env.JWT_SECRET_KEY, {expiresIn: process.env.JWT_EXPIRES_IN})
    return {
      accessToken
    };
  }
}

module.exports = AuthService;
