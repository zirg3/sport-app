const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
      '/api',
      createProxyMiddleware({
        target: 'https://sport-app-test.herokuapp.com',
        changeOrigin: true,
      })
  );
  app.use(
      '/uploads',
      createProxyMiddleware({
        target: 'https://sport-app-test.herokuapp.com',
        changeOrigin: true,
      })
  );
};

// target: 'http://localhost:5000'