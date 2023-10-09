module.exports = {
    development: {
      client: 'pg',
      connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'Flolona81',
        database: 'databaseassignment4',
      },
      migrations: {
        directory: './db/migrations',
      },
      seeds: {
        directory: './db/seeds',
      },
    },
  };
  