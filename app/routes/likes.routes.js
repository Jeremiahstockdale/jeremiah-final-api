module.exports = (app) => {

    const users = require('../controllers/users.controller');

    app.post(`/api/likes/`, users.addLikedStock);
    app.delete(`/api/likes/`, users.deleteLikedStock);
    app.get(`/api/likes/:userId`, users.getAllLikedStocks);
    app.get(`/api/likes/:id`, users.getLikedStockById);
}