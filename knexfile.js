// Update with your config settings.

const db_config = {

  development: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      port: '3307',
      user: 'nodeUser',
      password: '1',
      database: 'node-db'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      port: '3307',
      user: 'nodeUser',
      password: '1',
      database: 'node-db'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      host: 'localhost',
      port: '3307',
      user: 'nodeUser',
      password: '1',
      database: 'node-db'
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }


};

module.exports = require('knex')(db_config.development);
