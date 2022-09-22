module.exports = (app) => {

    const trades = require('../controllers/trades.controller');

    app.post('/api/trades', trades.createNewTrade);
    app.get('/api/trades/:username', trades.getAllActiveTrades);
    app.get('/api/trades/:id', trades.getTradeById)
    app.delete('/api/trades', trades.deleteTrade); // should this be a post to a new table?
    app.put('/api/trades/:username', trades.sellTrade);

}