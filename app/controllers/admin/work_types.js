const express = require('express');
const router = express.Router();
const knex = require('./../../../knexfile');
const Validator = require('validatorjs');


const rules = {
  create: {
    work_title: 'required'
  },
  update: {
    id: 'required|numeric',
    work_title: 'required'
  },
  delete: {
    id: 'required|numeric',
  }

};


//show
router.get('/', async function (req, res, next) {
  try {
    const projects = await knex('work_types')
      .orderBy('created_at','desc')
      .select();
    res.send(projects);
  }catch (e) {
    return next(e);

  }

});

//show curent work type
router.get('/:id', async function (req, res, next) {
  const currentWorkType = await knex('work_types as type')
    .where('type.id', req.params.id)
    .first();
  if (currentWorkType) {
    res.status(200).send(currentWorkType);
  }

});


//create new type
router.post('/create', async function (req, res, next) {
  const validation = new Validator(req.body, rules.create);
  if (validation.fails()) {
    return next(validation.errors);
  }

  try {
    await knex('work_types').insert(req.body);
    res.send(200);
  }catch (e) {
    next(e);
  }


});
//update
router.put('/update/:id', async function (req, res, next) {
  const data = {
    id: req.params.id,
    work_title: req.body.work_title
  };

  const validation = new Validator(data, rules.update);
  if (validation.fails()) {
    return next(validation.errors);
  }

  const count = await knex('work_types')
    .where('work_types.id', req.params.id)
    .count('work_types.id as ctn')
    .first();

  if (count.ctn){
    try {
      await knex('work_types')
        .where('work_types.id',req.params.id)
        .update(req.body);
      res.sendStatus(200);
    }catch (e) {
      return next(e);
    }
  }else{
    return next();
  }

});
//delete
router.delete('/delete/:id', async function (req, res, next) {
  const validation = new Validator(req.params, rules.delete);
  if (validation.fails()) {
    return next(validation.errors);
  }

  const count = await knex('work_types')
    .where('work_types.id', req.params.id)
    .count('work_types.id as ctn')
    .first();


  if (count.ctn) {
    try {
      await knex('work_types')
        .where('work_types.id', req.params.id)
        .del();
      res.sendStatus(200);
    }catch (e) {
      return next(e);

    }
  }else{
    return next();
  }

});


module.exports = router;