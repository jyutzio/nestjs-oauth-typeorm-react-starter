const path = require('path');

module.exports = {
  type: 'sqlite',
  database: path.join(__dirname, 'database.sqlite'),
  synchronize: false,
  logging: false,
  entities: [path.join(__dirname, 'dist/**/*.entity{.ts,.js}')],
  migrations: [path.join(__dirname, 'dist/migrations/*{.ts,.js}')],
  cli: {
    migrationsDir: 'src/backend/migrations',
  },
};
