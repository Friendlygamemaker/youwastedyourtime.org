const server = require('./lib/ServerV0.2');
const cli = require("./lib/CLIV0.1");

let app = {};

app.init = function (callback) {
    server.init(8000);

    setTimeout(function () {
        cli.init();
        callback();
    }, 50);
}

if (require.main === module) {
    app.init(function (){});
}

module.exports = app;