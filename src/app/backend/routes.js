function setupRoutes(app) {
  app.get('/', (req, res) => {
    res.json({ message: 'Hello from Express backend!' });
    console.log("connected");
  });

  // Add more routes here
}

module.exports = { setupRoutes };
