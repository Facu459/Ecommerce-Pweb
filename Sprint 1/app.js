const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const session = require('express-session');

// importamos las rutas
const mainRoute = require('./src/routes/mainRoute');
const userRoute = require('./src/routes/userRoute');
const productRoute = require('./src/routes/productRoute');
const cartRoute = require('./src/routes/cartRoute');
const checkoutRoute = require('./src/routes/checkoutRoute');

// configuracion del motor de vistas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views')); // <- Apunta a la nueva carpeta


// Permite que express lea CSS y las imágenes
app.use(express.static(path.join(__dirname, 'assets')));

app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'secreto_ecommerce', // Clave para encriptar la sesión
    resave: false,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    if (!req.session.cart) {
        req.session.cart = [];
    }
    next();
});

//  MVC
app.use('/', mainRoute);
app.use('/', userRoute);
app.use('/', productRoute);
app.use('/', cartRoute);
app.use('/', checkoutRoute);

// --- MANEJO DE ERROR 404 ---
// Este middleware atrapa cualquier petición que no haya coincidido con las rutas anteriores
app.use((req, res, next) => {
    res.status(404).render('pages/404');
});

// levantar el server
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});