const express = require('express');
const next = require('next');
const http = require('http');
const { setupSocket } = require('./src/app/backend/socket');
const { setupRoutes } = require('./src/app/backend/routes');

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const app = express();
  const server = http.createServer(app);

  setupSocket(server);        // 🔌 Real-time communication
  setupRoutes(app);           // 🛣️ Custom backend routes

  // ✅ Custom root route handled by Express
  app.get('/', (req, res) => {
    console.log('connected');
    res.json({ message: 'Hello from Express backend!' });
  });

  // ✅ Delegate all other routes to Next.js
  app.use((req, res, next) => {
    if (req.path === '/') return next(); // skip Next.js for root
    return handle(req, res);
  });

  const PORT = process.env.PORT || 4000;
  server.listen(PORT, 'localhost', () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});