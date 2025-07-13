export default {
  client: 'sqlite3',
  connection: {
    filename: './src/models/database/dev.sqlite3',
  },
  useNullAsDefault: true,
  migrations: {
    directory: './src/models/migrations',
  },
  seeds: {
    directory: './src/models/seeds',
  },
};
