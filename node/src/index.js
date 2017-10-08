

// REQUIRES
const constants = require('./config/constants.js');
const authenticator = require('./controllers/authenticator.js');
const routes = require('./routes/routes.js');
const Basic = require('hapi-auth-basic');
const Hapi = require('hapi');
const Good = require('good');

// SETUP
const server = new Hapi.Server();
server.connection({port: constants.SERVER_PORT});

// AUTH
server.register(Basic, function () {
    'use strict';
    server.auth.strategy('simple', 'basic', {validateFunc: authenticator});

    // ROUTES
    server.route(routes);
});

var options = {
    reporters: {
        myConsoleReporter: [
            {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{log: '*', response: '*'}]
            },
            {
                module: 'good-console'
            }, 'stdout'
        ],
        myFileReporter: [
            {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{ops: '*'}]
            },
            {
                module: 'good-squeeze',
                name: 'SafeJson'
            },
            {
                module: 'good-file',
                args: ['/tmp/rpi-gpio-api.log']
            }
        ]
    }
};

// GOOD CONSOLE
server.register({
    register: Good,
    options: options
}, function (err) {
    'use strict';
    if (err) {
        console.error(err);
    } else {
        server.start(function () {

            console.info('Server started at ' + server.info.uri);
        });
    }
});