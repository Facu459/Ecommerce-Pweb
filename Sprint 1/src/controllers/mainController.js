const mainController = {
    home: (req, res) => {
        // Agregamos 'pages/' a la ruta
        res.render('pages/index'); 
    }
};

module.exports = mainController;