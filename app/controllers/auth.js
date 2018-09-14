const express = require('express');
const router = express.Router();
const knex = require('../../knexfile');
const jwt = require('jsonwebtoken');
const Validator = require('../middlewares/validators/Validator');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);

//registration


router.post('/signup', function (req, res, next) {

  const rules = {
    email: 'required|email|unique',
    password: 'required|min:3'
  };

  const validate = new Validator(req.body, rules);

  validate.fails(function () {
    return res.status(400).send(validate.errors);
  });


  validate.passes(function () {
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, salt),
      // roles: req.body.roles,
    };
    knex('users').insert(data)
      .then(user_id => {
        const token = jwt.sign({id: user_id}, 'secret');
        res.status(201);
      })
      .catch(next);

  });


});



router.post('/login', async function (req, res,next) {
  const rules = {
    email: 'required|email',
    password: 'required'
  };

  const validate = new Validator(req.body,rules);



  try{
    if (validate.fails()) {
      res.status(400).send(validate.errors)
    }else{
      const user = await knex('users as user')
        .select('user.id', 'user.password','user.name')
        .where('user.email', req.body.email)
        .first();

      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          try {
            const token = jwt.sign({id: user.id,role:user.role_id}, 'secret');

            res.send({
              token,
              name: user.name

            })
          } catch (e) {
            next(e);
          }
        }else{
          res.sendStatus(401);
        }
      }else{
        next();
      }
    }

  }catch (e) {
    next(e);

  }



});


module.exports = router;
