require = require('esm')(module);
const { routes } = require('./src/routes.js');
module.exports = {
    devServer: {
      port: 8083
    },
    pluginOptions: {
      sitemap: {
          baseURL: 'https://voyagee-newstravel.herokuapp.com',
          routes,
      }
  }
  }