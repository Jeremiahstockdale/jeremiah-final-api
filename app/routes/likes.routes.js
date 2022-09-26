module.exports = (app) => {

    const likes = require('../controllers/likes.controller');

    app.post(`/api/likes/`, likes.addLikedStockBySymbol);
    app.delete(`/api/likes/`, likes.deleteLikedStock);
    app.get(`/api/likes/:userId`, likes.getAllLikedStocks);
    // app.get(`/api/likes/:id`, users.getLikedStockById);
}