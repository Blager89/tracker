const express = require('express');
const router = express.Router();
const knex = require('./../../knexfile');


router.get('/', async function (req, res, next) {
  res.send(req._user.role_title);
    

});


module.exports = router;