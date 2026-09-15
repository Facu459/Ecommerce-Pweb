const fs = require('fs');
const path = require('path');

// Leemos el JSON simulando una base de datos
const productsPath = path.join(__dirname, '../data/products.json');
const getProducts = () => JSON.parse(fs.readFileSync(productsPath, 'utf-8'));

const cartController = {
    // Escenario 2, 5 y 6: Ver carrito y calcular totales
    viewCart: (req, res) => {
        const allProducts = getProducts();
        const cartSession = req.session.cart;
        
        let cartItems = [];
        let total = 0;

        // Cruzamos la sesión con los datos reales
        cartSession.forEach(item => {
            const product = allProducts.find(p => p.id === item.productId);
            if (product) {
                const subtotal = product.price * item.quantity;
                total += subtotal;
                cartItems.push({ ...product, quantity: item.quantity, subtotal });
            }
        });

        res.render('pages/cart', { cart: cartItems, total });
    },

    // Escenario 1: Agregar producto
    add: (req, res) => {
        const productId = parseInt(req.params.id);
        const itemIndex = req.session.cart.findIndex(i => i.productId === productId);

        if (itemIndex >= 0) {
            req.session.cart[itemIndex].quantity += 1;
        } else {
            req.session.cart.push({ productId, quantity: 1 });
        }
        res.redirect('/cart');
    },

    // Escenario 3: Modificar cantidad (+ / -)
    update: (req, res) => {
        const productId = parseInt(req.body.productId);
        const action = req.body.action; // 'increase' o 'decrease'
        const itemIndex = req.session.cart.findIndex(i => i.productId === productId);

        if (itemIndex >= 0) {
            if (action === 'increase') {
                req.session.cart[itemIndex].quantity += 1;
            } else if (action === 'decrease') {
                req.session.cart[itemIndex].quantity -= 1;
                // Eliminar si llega a 0
                if (req.session.cart[itemIndex].quantity <= 0) {
                    req.session.cart.splice(itemIndex, 1);
                }
            }
        }
        res.redirect('/cart');
    },

    // Escenario 4: Vaciar carrito
    clear: (req, res) => {
        req.session.cart = [];
        res.redirect('/cart');
    }
};

module.exports = cartController;