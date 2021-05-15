const server = require('./test/ServerV0.3');

let app = {};

app.init = function () {
    server.init(8001);
}

if (require.main === module) {
    app.init();
}

module.exports = app;