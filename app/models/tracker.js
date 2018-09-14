const knex = require('../../knexfile');
const bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');
module.exports = bookshelf;

const Tracker = bookshelf.Model.extend({
  tableName: 'users',
  project: function () {
    return this.hasMany('Project')
    
  }
});

module.exports = bookshelf.model('User', User);