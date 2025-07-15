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


// export default {
//   client: 'pg',
//   connection: {
//     host: 'trolley.proxy.rlwy.net', // ou o nome do container, tipo 'postgres' se estiver usando Docker
//     port: 30786,
//     user: 'postgres',        // ex: 'postgres'
//     password: 'sbdVCCZRNdcwESzxgibeYLrmcOaMOZrA',      // ex: '123456'
//     database: 'railway',  // ex: 'meu_banco'
//   },
//   migrations: {
//     directory: './src/models/migrations',
//   },
//   seeds: {
//     directory: './src/models/seeds',
//   },
// };




//       export default {
//   client: 'pg',
//   connection: {
//     host: 'postgres', // ou o nome do container, tipo 'postgres' se estiver usando Docker
//     port: 5432,
//     user: 'postgres',        // ex: 'postgres'
//     password: 'postgres',      // ex: '123456'
//     database: 'api_cadastro',  // ex: 'meu_banco'
//   },
//   migrations: {
//     directory: './src/models/migrations',
//   },
//   seeds: {
//     directory: './src/models/seeds',
//   },
// };