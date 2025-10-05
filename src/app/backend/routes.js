function setupRoutes(app) {
  app.get('/', (req, res) => {
    res.json({ message: 'Hello from Express backend!' });
    console.log("connected");
  });

  // show database on /database

}

module.exports = { setupRoutes };
