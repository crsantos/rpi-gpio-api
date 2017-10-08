const constants = require('../config/constants.js');
var GpioToggler = require('../controllers/gpiotoggler.js');
var gpiToggler = new GpioToggler();

module.exports = Object.freeze({

    root: function (request, reply) {

        'use strict';
        reply({
            status: "ok",
            identity: request.auth.credentials.name,
            timestamp: new Date().getTime(),
            version: constants.VERSION
        }).code(200);
    },

    activate: function (request, reply) {

        'use strict';
        var state = encodeURIComponent(request.params.state) === 'on';
        if (state) {

            gpiToggler.turnOn(function () {
                console.log("turned on ✅");
            });

        } else {

            gpiToggler.turnOff(function () {
                console.log("turned off ❌");
            });

        }

        reply({
            status: state,
            identity: request.auth.credentials.name,
            timestamp: new Date().getTime()
        }).code(200);
    },
    toggle: function (request, reply) {

        'use strict';
        var toggledState = gpiToggler.toggle();
        reply({
            status: toggledState,
            identity: request.auth.credentials.name,
            timestamp: new Date().getTime()
        }).code(200);
    }
});