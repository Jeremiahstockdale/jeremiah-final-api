const db = require('../index');
const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid');
const saltRounds = 10;


exports.login = (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400)
            .send({
                message: 'Could not login. username or password was missing.'
            });
        return;
    }

    const query = `
        SELECT * FROM users 
            WHERE username = ?;
    `;

    const placeholders = [username];

    db.query(query, placeholders, async (err, results) => {

        if (err) {
            res.status(500)
                .send({
                    message: "There was an error logging in. Please try again.",
                    error: err
                });
            return;
        } else if (results.length == 0) {
            res.status(404)
                .send({
                    message: "username or Password was incorrect."
                });
            return;
        } else {

            let encryptedPassword = results[0].password;
            const passwordMatched = await bcrypt.compare(password, encryptedPassword);

            if (passwordMatched) {

                let user = results[0];

                res.send(user);
            } else {
                res.status(404)
                    .send({
                        message: 'username or password was incorrect'
                    });
            }
        }
    });
}

exports.createNewUser = async (req, res) => {

    let { username, password, age, height, weight, sex } = req.body;

    if (!username || !password) {
        res.status(400)
            .send({
                message: "username or password was not defined."
            });
        return;
    }

    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    const query = `
        INSERT INTO users
            (id, username, password, height, weight, age, gender)
            VALUES (?, ?, ?, ?, ?, ?, ?);
    `;

    const placeholders = [uuid(), username, encryptedPassword, height, weight, age, sex];

    db.query(query, placeholders, (err, results) => {
        if (err) {
            if (err.errno === 1062) {
                res.status(400)
                    .send({
                        error: err,
                        message: 'That username already exists.'
                    });
            } else {
                res.status(500)
                    .send({
                        error: err,
                        message: 'There was an error creating a new user.'
                    });
            }
        } else {
            this.login(req, res);
        }
    });
}

exports.getUserByUsername = (req, res) => {

    let { username } = req.params;

    const query = `
        SELECT * FROM users
        WHERE username = ?;
    `;

    let pvalues = [username];

    db.query(query, pvalues, (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: "There was an error finding your username."
            });
            return;
        } else if (results.length == 0) {
            res.status(404).send({
                message: "Could not locate a user with this id."
            })
            return;
        } else {
            res.send(results[0]);
            return;
        }
    });
}

exports.deleteAccount = (req, res) => {

    const { id } = req.params;

    const script = `
        DELETE FROM users
            WHERE id = ?;
    `

    const pValues = [id];

    db.query(script, pValues, (err, results) => {
        if (err) {
            res.status(500).send({
                message: 'There was a problem deleting your user profile',
                err
            })
        } else if (results.affectedRows == 0) {
            res.status(404).send({
                message: 'No users found with this name.',
                id
            });
        } else {
            res.send({
                message: "User profile deleted successfully"
            })
        }
    });
}