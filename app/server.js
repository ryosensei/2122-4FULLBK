const { log, dd } = require('@ryosensei/console');
const Package     = require('./package.json');
const Config      = require('./config.json');

const { openConnection, closeConnection } = require('./helpers/db.js');

const ping = async() => {
    let db = await openConnection();
    let [res, fields] = await db.query("SHOW TABLES");
    if (res.length > 0) {
        log(`Ping DB OK (${res.length} tables)\n`, 'green', 1);
    } else {
        log(`Ping DB NOK \n`, 'red', 1);
    }
    return await closeConnection(db);
};

ping();

const Application = require('./classes/Application.class');

let App = new Application(Config, Package);
App.start();
