var db       = require('mysql2-promise')();
const Config = require('./../config.json');

exports.openConnection = async () => {
    await db.configure({
        "host"     : Config.mysql.host,
        "user"     : Config.mysql.user,
        "password" : Config.mysql.password,
        "database" : Config.mysql.database,
        "port"     : Config.mysql.port,
    });
    return db;
};

exports.closeConnection = async (db) => {
    await db.pool.end();
    return true;
};