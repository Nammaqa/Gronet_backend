require('dotenv').config();
const { parse } = require('pg-connection-string');

const { user, password, host, port, database } = parse(process.env.DATABASE_URL);

module.exports = {
  development: {
    username: user,
    password: password,
    database: database,
    host: host,
    port: parseInt(port, 10),
    dialect: 'postgres',
    logging: console.log,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
        sslmode: 'verify-full', // Explicitly set SSL mode
        uselibpqcompat: true, // Ensure libpq compatibility
      },
    },
  },
  production: {
    username: user,
    password: password,
    database: database,
    host: host,
    port: parseInt(port, 10),
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
        sslmode: 'verify-full', // Explicitly set SSL mode
        uselibpqcompat: true, // Ensure libpq compatibility
      },
    },
  },
  test: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME_TEST || 'gronet_test_db',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
        sslmode: 'verify-full', // Explicitly set SSL mode
        uselibpqcompat: true, // Ensure libpq compatibility
      },
    },
  },
};
