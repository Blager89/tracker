const knex = require('../../knexfile');


module.exports = role => async function (req, res, next) {

  if (role === req._user.role_title) {
    next();
  } else {
    return res.status(403).end();
  }


};