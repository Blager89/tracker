const express = require('express');
const router = express.Router();
const knex = require('./../../../knexfile');
const Validator = require('validatorjs');
const moment = require('moment');


const rules = {
  create: {
    title: 'required'
  },
  update: {
    id: 'required|numeric',
    project_title: 'required'
  },
  delete: {
    id: 'required|numeric'
  }
};


//show
router.get('/', async function (req, res, next) {
  const project_count = await
    knex('projects as project')
      .count('project.id as cnt')
      .first();
  if (project_count.cnt) {
    try {
      const projects = await knex('projects')
        .orderBy('created_at', 'desc')
        .select();
      res.send(projects);
    } catch (e) {
      return next(e);
    }
  } else {
    res.send([]);
  }

});
//show curent project
router.get('/:id', async function (req, res, next) {
  const currentProject = await knex('projects as project')
    .where('project.id', req.params.id)
    .first();
  if (currentProject) {
    res.status(200).send(currentProject);
  }

});

//create new project 
router.post('/create', async function (req, res, next) {
  const validation = new Validator(req.body, rules.create);
  if (validation.fails()) {
    return next(validation.errors);
  }

  try {
    await knex('projects').insert({
      project_title: req.body.title
    });
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }


});

//update
router.put('/update/:id', async function (req, res, next) {
  const data = {
    id: req.params.id,
    project_title: req.body.title,
    // date: moment().format('YYYY-MM-DD HH:mm:ss')


  };
  console.log(data);
  const validation = new Validator(data, rules.update);
  if (validation.fails()) {
    return next(validation.errors);
  }

  const count = await knex('projects')
    .where('projects.id', req.params.id)
    .count('projects.id as ctn')
    .first();

  if (count.ctn) {
    try {
      await knex('projects')
        .where('projects.id', req.params.id)
        .update(data);
      res.sendStatus(200);
    } catch (e) {
      return next(e);
    }
  } else {
    return next();
  }


});
//delete
router.delete('/delete/:id', async function (req, res, next) {
  const validation = new Validator(req.params, rules.delete);
  if (validation.fails()) {
    return next(validation.fails());
  }

  const count = await knex('projects')
    .where('projects.id', req.params.id)
    .count('projects.id as ctn')
    .first();


  if (count.ctn) {
    try {
      await knex('projects')
        .where('projects.id', req.params.id)
        .del();
      res.sendStatus(200);
    } catch (e) {
      return next(e);

    }
  } else {
    return next();
  }

});

module.exports = router;