// require('dotenv').config();
// const { parse } = require('pg-connection-string');

// const { user, password, host, port, database } = parse(process.env.DATABASE_URL);

// module.exports = {
//   development: {
//     username: user,
//     password: password,
//     database: database,
//     host: host,
//     port: parseInt(port, 10),
//     dialect: 'postgres',
//     logging: console.log,
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000,
//     },
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//         sslmode: 'verify-full', // Explicitly set SSL mode
//         uselibpqcompat: true, // Ensure libpq compatibility
//       },
//     },
//   },
//   production: {
//     username: user,
//     password: password,
//     database: database,
//     host: host,
//     port: parseInt(port, 10),
//     dialect: 'postgres',
//     logging: false,
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000,
//     },
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//         sslmode: 'verify-full', // Explicitly set SSL mode
//         uselibpqcompat: true, // Ensure libpq compatibility
//       },
//     },
//   },
//   test: {
//     username: process.env.DB_USER || 'postgres',
//     password: process.env.DB_PASSWORD || 'postgres',
//     database: process.env.DB_NAME_TEST || 'gronet_test_db',
//     host: process.env.DB_HOST || 'localhost',
//     port: process.env.DB_PORT || 5432,
//     dialect: 'postgres',
//     logging: false,
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//         sslmode: 'verify-full', // Explicitly set SSL mode
//         uselibpqcompat: true, // Ensure libpq compatibility
//       },
//     },
//   },
// };


// import 'dotenv/config';
// import pkg from 'pg-connection-string';

// const { parse } = pkg;

// if (!process.env.DATABASE_URL) {
//   throw new Error('DATABASE_URL is missing in .env');
// }

// const { user, password, host, port, database } = parse(process.env.DATABASE_URL);

// const baseConfig = {
//   username: user,
//   password,
//   database,
//   host,
//   port: parseInt(port, 10),
//   dialect: 'postgres',
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false
//     }
//   }
// };

// export default {
//   development: {
//     ...baseConfig,
//     logging: false
//   },

//   production: {
//     ...baseConfig,
//     logging: false
//   },

//   test: {
//     username: process.env.DB_USER || 'postgres',
//     password: process.env.DB_PASSWORD || 'postgres',
//     database: process.env.DB_NAME_TEST || 'gronet_test_db',
//     host: process.env.DB_HOST || 'localhost',
//     port: process.env.DB_PORT || 5432,
//     dialect: 'postgres',
//     logging: false,
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false
//       }
//     }
//   }
// };

require('dotenv').config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  },

  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  },
};