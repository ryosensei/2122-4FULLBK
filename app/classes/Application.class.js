const express = require('express');
const { log, dd } = require('@ryosensei/console');
const { db } = require('./../helpers/db.js');
const bodyParser = require('body-parser');
const User = require('./../models/user.model');


class Application
{
    constructor(Config, Package)
    {
        log(`Start script version ${Package.version} \n`, 'green');

        this.app  = express();
        this.port = Config.server.port;

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.raw());

        this.routing();
    }

    routing()
    {
        this.app.get('/', this.index);
        this.app.post('/login', this.loginAction);
        this.app.post('/register', this.registerAction);
    }

    async loginAction(req, res)
    {
        let username = req.body.username;
        let password = req.body.password;

        if (!username || !password) {
            return Application.apiError(res, "MISSING_PARAMETER");
        }

        let user = new User();
        let check = await user.login(username, password);

        if (check === false) {
            return res.status(404).json({
                error: 'user not found'
            });
        }

        return res.json({
            "response" : "ok",
            "user_id"  : check
        });
    }

    async registerAction(req, res)
    {
        let username = req.body.username;
        let password = req.body.password;

        if (!username || !password) {
            return Application.apiError(res, "MISSING_PARAMETER");
        }

        let user = new User();
        let check = await user.register(username, password);

        if (check === false) {
            return res.status(400).json({
                error: 'user already exists'
            });
        }

        return res.json({
            "response" : "ok",
            "user_id"  : check
        });
    }


    index(req, res)
    {
        return res.json({
            "response": "ok"
        });
    }

    static apiError(res, message)
    {
        return res.status(400).json({
            error: true,
            message: message
        });
    }

    start()
    {
        this.app.listen(this.port, async () => {
            log(`Listening on port ${this.port} \n`, 'green');
        });
    }
}

module.exports = Application;