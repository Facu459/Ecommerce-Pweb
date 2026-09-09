const productController = {
    detail: (req, res) => res.render('pages/product', { error: false }),
    list: (req, res) => res.render('pages/product', { error: false })
};
module.exports = productController;