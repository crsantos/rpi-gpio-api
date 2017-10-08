# rpi-gpio-api

Sample usage of docker compose with NGINX and a sample node app that controls RPI GPIO

This project is intended to run on an [RaspberryPi](https://www.raspberrypi.org) and it's currently using [HapiJS](http://hapijs.com/) for creating a simple API and uses [OnOff](https://github.com/fivdi/onoff) library to access the GPIO ports of RPI.

## API

### Authentication

This project uses basic authentication, relying on `hapi-auth-basic`. Basic passwords are hashed with `Bcrypt`.

If you need some extra _"protection"_, please refer to [hapijs.com/tutorials/auth](http://hapijs.com/tutorials/auth).

### Methods

#### `/toggle`

Toggles the relay switching its state

#### `/activate/{on|off}`

Changes the relay state switching either to `ON` or `OFF`

## Folder structure

This repo has the following structure :

```
.
├── nginx
    └── Dockerfile
    └── nginx.conf
└── node
    └── Dockerfile
    └── src
        ├── index.js
        ├── package.json
        ├── config
        ├── controllers
        ├── handlers
        ├── models
        └── routes
```

## Logging

Logging is performed via [good-console](https://github.com/hapijs/good-console) and redirected to `/tmp/rpi-gpio-api.log` file.