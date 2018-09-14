const express = require('express');
const router = express.Router();
const knex = require('./../../../knexfile');
const dateFormat = require('dateformat');
const Validator = require('validatorjs');
const jwt = require('jsonwebtoken');


const rules = {
  create: {
    project_id: 'required',
    task: 'required',
    work_type_id: 'required',
    hours: 'required',
  },
  update: {
    id: 'required|numeric',
    project_id: 'required',
    task: 'required',
    work_type_id: 'required',
    hours: 'required'
  },
  delete: {
    id: 'required|numeric'
  }

};
//current track
router.get('/:id', async function (req, res, next) {
  const currentTrack = await knex('trackers as track')
    .where('track.id', req.params.id)
    .first();
  if (currentTrack) {
    res.status(200).send(currentTrack);
  }

});
//show
router.get('/', async function (req, res, next) {
  const role = req._user.role_title;
  if (role == 'admin') {
    const track_count = await
      knex('trackers as track')
        .count('track.id as cnt')
        .first();

    if (track_count.cnt) {
      const show_track = await knex('trackers as track')
        .join('users', 'users.id', 'track.user_id')
        .join('projects', 'projects.id', 'track.project_id')
        .join('work_types', 'work_types.id', 'track.work_type_id')
        .orderBy('track.date', 'desc')
        .select('track.id', 'track.hours', 'track.date',
          'users.name', 'projects.project_title',
          'track.task', 'work_types.work_title',
          'track.id', 'track.id', 'track.id', 'track.id');
      res.send(show_track)
    } else {
      res.send([]);
    }



  } else {
    const track_count = await
      knex('trackers as track')
        .where('track.user_id', req._user.id)
        .count('track.id as cnt')
        .first();

    if (track_count.cnt) {
      const show_track = await knex('trackers as track')
        .where('track.user_id', req._user.id)
        .join('users', 'users.id', 'track.user_id')
        .join('projects', 'projects.id', 'track.project_id')
        .join('work_types', 'work_types.id', 'track.work_type_id')
        .orderBy('track.id', 'desc')
        .select('track.id', 'track.hours', 'track.date',
          'users.name', 'projects.project_title',
          'track.task', 'work_types.work_title',
          'track.id', 'track.id', 'track.id', 'track.id');
      res.send(show_track)
    } else {
      res.send([]);
    }
  }


});

//create
router.post('/create', async function (req, res, next) {
  const user_id = jwt.verify(req.headers.authorization, 'secret').id;
  const validation = new Validator(req.body, rules.create);

  if (validation.fails()) {
    return next(validation.errors);
  }
  const data = {
    project_id: req.body.project_id,
    task: req.body.task,
    work_type_id: req.body.work_type_id,
    hours: req.body.hours,
    user_id: user_id,
    date: req.body.date
  };
  try {
    await knex('trackers ').insert(data);
    res.sendStatus(201);
  } catch (e) {
    return next(e);
  }

});
//delete
router.delete('/delete/:id', async function (req, res, next) {
  const validation = new Validator(req.params, rules.delete);

  if (validation.fails()) {
    return next(validation.errors);
  }

  const track = await knex('trackers as track')
    .where('track.id', req.params.id)
    .count('track.id as cnt')
    .first();


  if (track.cnt) {
    try {
      await knex('trackers')
        .where('trackers.id', req.params.id)
        .del();
      res.sendStatus(200);
    } catch (e) {
      return next(e);
    }

  } else {
    return next();
  }


});

//update
router.put('/:id', async function (req, res, next) {
  console.log(req.body);
  const data = {
    id: req.params.id,
    project_id: req.body.project_id,
    task: req.body.task,
    work_type_id: req.body.work_type_id,
    hours: req.body.hours,
    date: req.body.date
  };


  const validation = new Validator(data, rules.update);
  if (validation.fails()) {
    return next(validation.errors);
  }

  const count = await knex('trackers as track')
    .where('track.id', req.params.id)
    .count('track.id as cnt')
    .first();

  if (count) {
    try {
      await knex('trackers as track')
        .where('track.id', req.params.id)
        .update(data);
      res.sendStatus(200);
    } catch (e) {
      return next(e);
    }
  }


});

module.exports = router;