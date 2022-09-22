module.exports = (app) => {

    const users = require('../controllers/users.controller');

    app.post('/api/users', users.createNewUser);
    app.post('/api/users/login', users.login);
    app.get('/api/users/:username', users.getUserByUsername);
    // app.put('/api/users/:id', users.updateUser);
    app.delete('/api/users', users.deleteAccount);
    app.put('/api/users/profile/', users.addMoneyById);


}