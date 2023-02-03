const boom = require('@hapi/boom');

function tokenHandler(req, res, next) {

  if (!req.headers.authorization) {
    next(boom.conflict('You did not include a token'));
  }

  const token = req.headers['Authorization'].split(" ")[1];
  const payload = jwt.decode(token, process.env.JWT_SECRET_KEY);

  if (payload.exp <= moment().unix()) {
    next(boom.forbidden("Token expired"));
  }

  next();
};

module.exports = tokenHandler;
