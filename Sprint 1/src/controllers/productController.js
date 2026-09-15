const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../data/products.json');
const getProducts = () => JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

const productController = {
    detail: (req, res) => {
        const products = getProducts();
        const productId = parseInt(req.params.id);
        
        // 1. Buscamos el producto principal que el usuario quiere ver
        const product = products.find(p => p.id === productId);

        // 2. Tomamos 4 productos aleatorios para sugerir abajo
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        const suggested = shuffled.slice(0, 4);

        if (product) {
            // Mandamos AMBAS variables a la vista
            res.render('pages/product', { product, suggested });
        } else {
            // Si el ID no existe en el JSON, mandamos al 404
            res.status(404).render('pages/404');
        }
    },
    
list: (req, res) => {
        const products = getProducts();
        // ¡Ojo aquí! Debe apuntar a tu vista de catálogo (ej: 'pages/products'), no a 'pages/product'
        res.render('pages/products', { products }); 
    }
};
module.exports = productController;