const Bcrypt = require('bcrypt');

const users = {

    admin: {
        username: 'admin',
        password: '$2a$10$B/bV1O6ebwNvyWPYYMvs1.AM4F1mn0bq/TZFPtGkh/dOGdEiEJSwa',
        name: 'admin',
        id: '2133d32a'
    }
};

const validate = function (request, username, password, callback) {

    'use strict';
    const user = users[username];
    if (!user) {
        console.log("NO USER FOUND!");
        return callback(null, false);
    }

    Bcrypt.compare(password, user.password, function (err, isValid) {

        callback(err, isValid, {id: user.id, name: user.name});
    });
};

module.exports = validate;