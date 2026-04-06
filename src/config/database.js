// import 'dotenv/config.js';
// import { Sequelize } from 'sequelize';
// // import sequelizeConfig from './sequelize.config.js';
// import config from './sequelize.config.js';

// const env = process.env.NODE_ENV || 'development';
// const config = sequelizeConfig[env];

// if (!config) {
//   throw new Error(`Sequelize config for environment "${env}" not found.`);
// }

// const sequelize = new Sequelize(config.database, config.username, config.password, {
//   host: config.host,
//   port: config.port,
//   dialect: config.dialect,
//   logging: config.logging,
//   pool: config.pool,
//   dialectOptions: config.dialectOptions,
// });

// export default sequelize;

import 'dotenv/config';
import { Sequelize } from 'sequelize';

import sequelizeConfig from './sequelize.config.js';

const env = process.env.NODE_ENV || 'development';
const config = sequelizeConfig[env];

if (!config) {
  throw new Error(`Sequelize config for environment "${env}" not found.`);
}

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: config.logging,
    pool: config.pool,
    dialectOptions: config.dialectOptions,
  }
);

export default sequelize;