const jwt = require('jsonwebtoken');
const Validator = require('./validators/Validator');
const User = require('../models/user');
const knex = require('../../knexfile');

module.exports = function (req, res, next) {
  jwt.verify(req.headers.authorization, 'secret', function (err, decoded) {
    if (err) {
      return res.status(401).end();
    }
    if (decoded) {
      knex('users as user')
        .where('user.id', decoded.id)
        .join('roles', 'user.role_id', 'roles.id')
        .select('user.id','user.name','user.email','user.role_id','roles.role_title')
        .first()
        .then((user)=>{
          req._user = user;
          next();
        })
        .catch(next)
    }
  })
};

