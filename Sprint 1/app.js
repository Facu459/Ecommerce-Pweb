const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos (CSS, imágenes)
app.use(express.static(path.join(__dirname, 'assets')));

// --- RUTAS DE LA APLICACIÓN ---

// Home (index)
app.get('/', (req, res) => {
    res.render('pages/index');
});

// Login
app.get('/login', (req, res) => {
    res.render('pages/login');
});

// Registro
app.get('/register', (req, res) => {
    res.render('pages/register');
});

// Detalle de Producto
app.get('/products', (req, res) => {
    res.render('pages/product');
});

// Carrito de compras
app.get('/cart', (req, res) => {
    res.render('pages/cart');
});

// Checkout (Pago)
app.get('/checkout', (req, res) => {
    res.render('pages/checkout');
});

// Levantar el servidor
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});