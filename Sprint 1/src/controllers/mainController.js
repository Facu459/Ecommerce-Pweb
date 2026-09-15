const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../data/products.json');
const getProducts = () => JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

const mainController = {
    home: (req, res) => {
        const products = getProducts();
        
        // --- US6: SUGERIDOS (5 aleatorios) ---
        const shuffled = [...products].sort(() => 0.5 - Math.random());
        const suggested = shuffled.slice(0, 5);

        // --- US7: LOS MÁS PEDIDOS (10 aleatorios con flag) ---
        // 1. Filtramos solo los que tienen el flag "destacado" en true
        const filtrados = products.filter(p => p.destacado === true);
        // 2. Mezclamos esos filtrados aleatoriamente
        const shuffledDestacados = filtrados.sort(() => 0.5 - Math.random());
        // 3. Tomamos hasta 10
        const mostWanted = shuffledDestacados.slice(0, 10);

        // Enviamos ambas variables a la vista
        res.render('pages/index', { suggested, mostWanted });
    }
};

module.exports = mainController;