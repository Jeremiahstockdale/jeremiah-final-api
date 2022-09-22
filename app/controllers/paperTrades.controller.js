const db = require('../index');
const { v4: uuid, stringify } = require('uuid');


exports.createNewTrade = async (req, res) => {
    let { userId, stockId, initSharePrice, shares, initInvestmentValue } = req.body;

    const script = `
        INSERT INTO paper_trades
            (user_id, stock_id, init_share_price, shares, init_investment_date, init_investment_value)
        VALUES
            (?, ?, ?, ?, ?, ?)
    `
    let today = new Date()

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    if (
        typeof userId !== 'string'
        || typeof stockId !== 'string'
        || typeof initSharePrice !== 'number'
        || typeof shares !== 'number'
        || typeof initInvestmentValue !== 'number'
    ) {
        res.status(404).send({
            message: "You are missing required data"
        })
        return;
    }

    const pValues = [userId, stockId, initSharePrice, shares, formatDate(today), initInvestmentValue]

    db.query(script, pValues, (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: "There was an error creating this paper trade"
            });
            return;
        } else {
            res.send(results);
            return;
        }
    });
}

exports.getAllActiveTrades = async (req, res) => {

    let { username } = req.params;

    const script = `
        SELECT * FROM paper_trades
        INNER JOIN  users ON  user_id = users.id
        WHERE users.username =  ?
    `

    db.query(script, [username], (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: "There was an error finding your username."
            });
            return;
        } else if (results.length == 0) {
            res.status(404).send({
                message: "Could not locate a user with this username."
            })
            return;
        } else {
            res.send(results);
            return;
        }
    });
}

exports.getTradeById = async (req, res) => {
    let { id } = req.params;

    let script = `
        SELECT * FROM paper_trades
        WHERE  (id = ?)
    `

    db.query(script, [id], (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: "There was an error finding that trade."
            });
            return;
        } else if (results.length == 0) {
            res.status(404).send({
                message: "Could not locate a trade with this id."
            })
            return;
        } else {
            res.send(results);
            return;
        }
    });
}

exports.sellTrade = async (req, res) => {
    let { id, currentPrice } = req.body;

    let script = `
        UPDATE paper_trades
        SET sold_price = ?
        WHERE (id = ?);
    `

    let pValues = [currentPrice, id];

    db.query(script, pValues, (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: "There was an error updating this trade"
            });
            return;
        } else if (results.length == 0) {
            res.status(404).send({
                message: "Trade not found"
            })
            return;
        } else {
            res.send(results);
            return;
        }
    });
}

exports.deleteTrade = async (req, res) => {
    let { id } = req.body;

    let script = `
        DELETE FROM paper_trades
        WHERE (id  = ?)
    `

    db.query(script, [id], (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: "There was an error deleting this trade."
            });
            return;
        } else if (results.length == 0) {
            res.status(404).send({
                message: "Could not find this trade"
            })
            return;
        } else {
            res.send({
                message: "Deleted successfully"
            });
            return;
        }
    });
}