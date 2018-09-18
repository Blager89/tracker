const authController = require('./controllers/auth');
const userController = require('./controllers/admin/user');
const trackerController = require('./controllers/admin/tracker');
const projectController = require('./controllers/admin/project');
const workTypeController = require('./controllers/admin/work_types');
const roleController = require('./controllers/role');
const vToken = require('./middlewares/auth');
const roles = require('./middlewares/roles');

module.exports = function(app) {
  app.use('/api',authController);

  app.use('/api/user',[vToken,roles('admin')],userController);
  app.use('/api/tracker', vToken,trackerController);
  app.use('/api/project', vToken,projectController);
  app.use('/api/type', vToken,workTypeController);
  app.use('/api/role', vToken, roleController);

};



