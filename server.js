const express = require('express');
const next = require('next');
const http = require('http');
const { setupSocket } = require('./src/app/backend/socket.js');
const { setupRoutes } = require('./src/app/backend/routes.js');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const app = express();
  const server = http.createServer(app);

  setupSocket(server);        //  Real-time communication
  setupRoutes(app);           //  Custom backend routes

  app.use((req, res, next) => {
    if (req.path === '/') return next(); // skip Next.js for root
    return handle(req, res);
  });

  const PORT = process.env.PORT || 4000;
  server.listen(PORT, 'localhost', () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});