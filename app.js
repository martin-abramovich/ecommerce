const express = require("express");
const session = require("express-session");
const path = require("path");
const methodOverride = require("method-override");

const productosRoutes = require('./src/routes/productosRoutes');
const usersRouters = require('./src/routes/usersRouters');
const logMiddleware = require('./middlewares/logMiddleware');

const app = express();
const PORT = 4000;

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(session({
  secret: 'si',
  resave: false,
  saveUninitialized: false
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

app.use('/', productosRoutes);
app.use('/users', usersRouters);

app.use(logMiddleware);

app.use('*', (req, res) => {
  res.send("Error de acceso, esta ruta no existe en el sitio");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});