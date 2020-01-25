const proxy = require('http-proxy-middleware');
const NET = require('./utils/network');
 
module.exports = function(app) {
    app.use(proxy(['/api'], { target: `http://${NET.IP}:${NET.PORT}` }));
}