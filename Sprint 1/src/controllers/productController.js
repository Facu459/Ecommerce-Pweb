const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../data/products.json');
const getProducts = () => JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

const productController = {
    detail: (req, res) => {
        const products = getProducts();
        const productId = parseInt(req.params.id);
        
        // Buscamos el producto principal
        const product = products.find(p => p.id === productId);

        if (product) {
            // --- US8: PRODUCTOS RELACIONADOS ---
            
            // 1. Filtramos los que tienen la misma categoría Y que NO sean el producto actual
            const related = products.filter(p => 
                p.categoria === product.categoria && p.id !== product.id
            );

            // 2. Mezclamos aleatoriamente la lista filtrada
            const shuffledRelated = related.sort(() => 0.5 - Math.random());

            // 3. Cortamos hasta un máximo de 4 productos
            const relatedProducts = shuffledRelated.slice(0, 4);

            // Enviamos el producto y la nueva variable relatedProducts a la vista
            res.render('pages/product', { product, relatedProducts });
        } else {
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