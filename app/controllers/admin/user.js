const express = require('express');
const router = express.Router();
const knex = require('../../../knexfile');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(10);
const Validator = require('../../middlewares/validators/Validator');





const rules = {
  create: {
    name: 'required',
    email: 'required|email|unique',
    password: 'required'
  },
  update: {
    id: 'required|numeric',
    name: 'required',
    email: 'required|email'
  },
  delete: {
    id: 'required|numeric'
  }
};

//create new user
router.post('/create', function (req, res, next) {
  console.log(req.body);
  const validation = new Validator(req.body, rules.create);

  validation.fails(function () {
    return res.status(400).send(validation.errors);
  });


  validation.passes(async function () {
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, salt),
      role_id: req.body.role_id,
    };

    try {
      await knex('users').insert(data);
      res.sendStatus(200);
    } catch (e) {
      return next(e);

    }

  });


});
//update user
router.put('/update/:id', async function (req, res, next) {
  const data = {
    id: req.params.id,
    name: req.body.name,
    email: req.body.email,
    // password: req.body.password,
    role_id: req.body.role_id
  };

  const validation = new Validator(data, rules.update);

  validation.fails(function () {
    return res.status(400).send(validation.errors);
  });

  try {
    await knex('users as u')
      .where('u.id', req.params.id)
      .update(data);
    res.sendStatus(200);
  } catch (e) {
    return next(e);
  }

});
//delete user
router.delete('/delete/:id', async function (req, res, next) {
  const validation = new Validator(req.params, rules.delete);
  if (validation.fails()) {
    return next(validation.errors);
  }
  const count = await knex('users')
    .where('users.id', req.params.id)
    .count('users.id as ctn')
    .first();

  if (count.ctn) {
    try {
      await knex('users')
        .where('users.id', req.params.id)
        .del();
      res.sendStatus(200);
    } catch (e) {
      return next(e);
    }

  }else{
    return next();
  }

});
//show user
router.get('/', async function (req, res, next) {
  try {
    const users = await knex('users')
      .join('roles','roles.id','users.role_id')
      .select('users.id','users.name','users.email','users.role_id','roles.role_title')
      .orderBy('users.id','desc');
    res.send(users);
  }catch (e) {
    next(e);
  }

});

//show curent user
router.get('/:id', async function (req, res, next) {
  try {
    const current_user = await knex('users as u')
      .where('u.id', req.params.id)
      .first();

    res.send(current_user);
  }catch (e) {
    return next(e);
  }

});



module.exports = router;
