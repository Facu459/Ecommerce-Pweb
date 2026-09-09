const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

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

//  MVC
app.use('/', mainRoute);
app.use('/', userRoute);
app.use('/', productRoute);
app.use('/', cartRoute);
app.use('/', checkoutRoute);


// levantar el server
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});