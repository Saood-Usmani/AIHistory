const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://fx3oon4blwozuiog3z6bingpzm0tzclg.lambda-url.us-east-1.on.aws',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
}; 