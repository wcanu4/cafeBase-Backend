const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Rutas de tu aplicación

const userRoute = require('./api/routes/user');
const productRoute = require('./api/routes/product');
const storeRoute = require('./api/routes/store');
const beneficioRoute = require('./api/routes/beneficio');
const proveedorRoute = require('./api/routes/proveedor');
const clienteRoute = require('./api/routes/cliente');
const cafeRoute = require('./api/routes/cafe');
const ventasRoute = require('./api/routes/ventas');

const productoRoute = require('./api/routes/producto');
const comprasRoute = require('./api/routes/compras');

app.use('/user', userRoute);
app.use('/product', productRoute);
app.use('/store', storeRoute);
app.use('/beneficio', beneficioRoute);
app.use('/proveedor', proveedorRoute);
app.use('/cliente', clienteRoute);
app.use('/cafe', cafeRoute);
app.use('/ventas', ventasRoute);
app.use('/producto', productoRoute);
app.use('/compras', comprasRoute);
module.exports = app;
