const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../data/products.json');
const getProducts = () => JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

const categoryController = {
    show: (req, res) => {
        const productos = getProducts();

        // capturamos la categoria y convertimos a minusculas
        const categoria = req.params.category.toLowerCase();

        // filtramos los productos por categoria
        const productosFiltrados = productos.filter(product => 
            product.categoria && product.categoria.toLowerCase() === categoria
        );

        res.render('pages/category', { productos: productosFiltrados, categoria: categoria });
    }
};

module.exports = categoryController;