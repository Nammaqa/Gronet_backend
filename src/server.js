import http from 'http';

import app from './app.js';
import sequelize from './config/database.js';

import { initSocket } from './socket/socket.js';

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

initSocket(server);

const startServer = async () => {
  try {
    await sequelize.authenticate();

    console.log('✅ DB CONNECTED');

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error('❌ DB CONNECTION FAILED:', error);

    process.exit(1);
  }
};

startServer();