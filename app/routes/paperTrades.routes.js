module.exports = (app) => {

    const trades = require('../controllers/paperTrades.controller');

    app.post('/api/trades', trades.createNewTrade);
    app.get('/api/trades/:userId', trades.getAllActiveTrades);
    app.delete('/api/trades/:id', trades.deleteTrade);

}