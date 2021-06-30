const router = require('express').Router();
const { authentication, tasksAuthorization } = require('../middlewares/auth');
const { Task, User } = require('../models');

// app level middleware
router.use(authentication);

router.post('/', (req, res, next) => {
  const { title, category } = req.body;
  Task.create({
    title,
    category,
    UserId: req.userId,
  })
    .then((result) =>
      Task.findOne({
        where: result.id,
        include: {
          model: User,
          attributes: ['email'],
        },
      })
    )
    .then((result) => res.status(201).json({ message: 'created', data: result }))
    .catch((err) => next(err));
});

router.get('/', (req, res, next) => {
  Task.findAll({
    include: {
      model: User,
      attributes: ['email'],
    },
    order: [['updatedAt']],
  })
    .then((result) => {
      res.status(200).json({ success: true, data: result });
    })
    .catch((err) => next(err));
});

// router level middleware
router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  Task.findOne({ where: { id } })
    .then((task) => {
      if (!task) {
        throw {
          name: 'NotFound',
          message: 'task not found',
        };
      }
      res.status(200).json({ success: true, data: task });
    })
    .catch((err) => next(err));
});

router.put('/:id', tasksAuthorization, (req, res, next) => {
  const { task } = req;

  // instance method sequelize, because we already get the task
  Object.keys(req.body).forEach((key) => {
    if (task[key]) task[key] = req.body[key];
  });

  task
    .save()
    .then((updatedTask) => res.status(200).json({ success: true, data: updatedTask }))
    .catch((err) => next(err));
});

router.patch('/:id', tasksAuthorization, (req, res, next) => {
  const { category } = req.body;
  const { task } = req;

  task.category = category;
  task
    .save()
    .then(() => res.status(200).json({ success: true, data: task }))
    .catch((err) => next(err));
});

router.delete('/:id', tasksAuthorization, (req, res, next) => {
  const { task } = req;
  task
    .destroy()
    .then(() => {
      res.status(200).json({
        message: 'deleted',
        deletedData: req.task,
      });
    })
    .catch((err) => next(err));
});

module.exports = router;
