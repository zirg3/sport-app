const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
      '/api',
      createProxyMiddleware({
        target: 'http://localhost:5000',
        changeOrigin: true,
      })
  );
  app.use(
      '/uploads',
      createProxyMiddleware({
        target: 'http://localhost:5000',
        changeOrigin: true,
      })
  );
  app.use(
      '/api',
      createProxyMiddleware({
        target: 'mongodb+srv://sport-app:Oleg3456@cluster0.66rgyqd.mongodb.net/test',
        changeOrigin: true,
      })
  );
  app.use(
      '/uploads',
      createProxyMiddleware({
        target: 'mongodb+srv://sport-app:Oleg3456@cluster0.66rgyqd.mongodb.net/test',
        changeOrigin: true,
      })
  );
};

