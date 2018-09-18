const express = require('express');
const router = express.Router();
const knex = require('./../../knexfile');

//current role
router.get('/', async function (req, res, next) {
  res.send(req._user.role_title);
    

});

//show all roles

router.get('/all', async function (req, res, next) {
  const role_cnt = await knex('roles as r')
    .count('id as cnt')
    .first();
  if (role_cnt.cnt) {
    try {

      const allRoles = await knex('roles as r')
        .select();
      res.status(200).send(allRoles);
    }catch (e) {
      return next(e);

    }
  }
});


module.exports = router;