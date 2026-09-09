const userController = {
    login: (req, res) => {
        res.render('pages/login');
    },
    register: (req, res) => {
        res.render('pages/register');
    }
};

module.exports = userController;