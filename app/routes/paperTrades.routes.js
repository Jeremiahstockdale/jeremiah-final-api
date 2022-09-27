module.exports = (app) => {

    const trades = require('../controllers/paperTrades.controller');

    app.post('/api/trades', trades.createNewTrade);
    app.get('/api/trades/:userId', trades.getAllActiveTrades);
    app.delete('/api/trades/:id', trades.deleteTrade); // should this be a post to a new table?
    // app.put('/api/trades/:username', trades.sellTrade);

}