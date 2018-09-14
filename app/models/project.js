const knex = require('../../knexfile');
const bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');
module.exports = bookshelf;

const Project = bookshelf.Model.extend({
  tableName: 'projects',
  traker: function () {
    return this.belongsTo('Traker');
  }
});
