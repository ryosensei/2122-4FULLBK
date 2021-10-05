const { openConnection, closeConnection } = require('./../helpers/db.js');

class User
{
    constructor()
    {

    }

    async login(username, password)
    {
        let db = await openConnection();
        let query = "SELECT id FROM users WHERE name = ? AND password = ?";
        let [res, fields] = await db.query(query, [username, password]).catch(err => {
            throw err;
        });

        await closeConnection(db);

        if (res.length === 0) {
            return false;
        }
        return res[0].id;
    }

    async register(username, password)
    {
        let db = await openConnection();
        let query = "SELECT id FROM users WHERE name = ?";
        let [res, fields] = await db.query(query, [username]).catch(err => {
            throw err;
        });


        if (res.length === 0) {
            let query = "INSERT INTO users (name, password) VALUES (?, ?)";
            let [res, fields] = await db.query(query, [username, password]).catch(err => {
                throw err;
            });
            await closeConnection(db);
            return res.insertId;
        }
        await closeConnection(db);
        return false;
    }
}

module.exports = User;