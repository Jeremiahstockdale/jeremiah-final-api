const db = require('../index');


exports.createNewTrade = async (req, res) => {

    let { symbol, userId, sharePrice, shares } = req.body;

    const script = `
        INSERT INTO paper_trades
            (stock_symbol, user_id, init_share_price, shares, init_investment_date, init_investment_value)
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

    let initInvestmentValue = sharePrice * shares;

    if (
        typeof userId !== 'string'
        || typeof symbol !== 'string'
        || typeof sharePrice !== 'number'
        || typeof shares !== 'number'
    ) {
        res.status(404).send({
            message: "You are missing required data"
        })
        return;
    }

    const pValues = [symbol, userId, sharePrice, shares, formatDate(today), initInvestmentValue]

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

    let { userId } = req.params;

    const script = `
        SELECT * FROM stocktopus.paper_trades
        WHERE (user_id =  ?)
    `

    db.query(script, [userId], (err, results) => {
        if (err) {
            res.status(500).send({
                error: err,
                message: "There was an error finding your trades."
            });
            return;
        } else if (results.length == 0) {
            res.status(404).send({
                message: "Could not locate a user with this user id."
            })
            return;
        } else {
            res.send(results);
            return;
        }
    });
}

exports.deleteTrade = async (req, res) => {

    let { id } = req.params;

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