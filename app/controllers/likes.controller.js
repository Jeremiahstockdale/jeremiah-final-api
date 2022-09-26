const db = require('../index');

exports.addLikedStockBySymbol = (req, res) => {
    let { symbol, userId } = req.body;

    let script = `
        INSERT INTO likes
            (user_id, stock_symbol)
        VALUES
            (?, ?)
    `

    let pValues = [userId, symbol]

    db.query(script, pValues, (err, results) => {
        if (err) {
            res.status(500).send({
                message: 'There was an error adding this to your likes',
                err
            })
        } else if (results.affectedRows == 0) {
            res.status(404).send({
                message: 'Not Found',

            });
        }
        // else if (id !== 'string'|| stockId != 'string') {
        //     res.status(400).send({
        //         message: 'Missing required data'
        //     })
        // } 
        else {
            res.send({
                message: 'Stock added to your likes'
            })
        }
        return;
    });
}

exports.deleteLikedStock = (req, res) => {
    let { id } = req.params;

    let script = `
        DELETE FROM likes
        WHERE (id = ?)
    `

    db.query(script, [id], (err, results) => {
        if (err) {
            res.status(500).send({
                message: 'There was a problem removing this like',
                err
            })
        } else if (results.length == 0) {
            res.status(404).send({
                message: 'No value found with this id.',
                id
            })
        } else {
            res.send({
                message: "User like deleted successfully"
            })
        }
        return
    });
}

exports.getAllLikedStocks = (req, res) => {
    let { userId } = req.params;

    let script = `
        SELECT * 
        FROM likes
        WHERE (user_id = ?)
    `

    db.query(script, [userId], (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: "There was an error finding your likes."
            });
            return;
        } else if (results.length == 0) {
            res.status(404).send({
                message: "Could not locate likes using that user id."
            })
            return;
        } else {
            res.send(results);
            return;
        }
    });
}

exports.getLikedStockById = (req, res) => {
    let { id } = req.params;

    let script = `
        SELECT *
        FROM likes
        WHERE (id = ?)
    `

    db.query(script, [userId], (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: "There was an error finding your likes."
            });
            return;
        } else if (results.length == 0) {
            res.status(404).send({
                message: "Could not locate likes using that user id."
            })
            return;
        } else {
            res.send(results);
            return;
        }
    });
}