const express = require("express");
const session = require("express-session");
const path = require("path");
const methodOverride = require("method-override");

const productosRoutes = require('./src/routes/productosRoutes');
const usersRouters = require('./src/routes/usersRouters');

const app = express();
const PORT = 4000;

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'src', 'views'));

app.use(session({
  secret: 'secret'
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

app.use('/', productosRoutes);
app.use('/users', usersRouters);

app.use('*', (req, res) => {
  res.send(`
  <div style="text-align: center; padding-top:30px">
  <h1>Error de acceso, esta ruta no existe en el sitio :(</h1>
  <p><a href="/">Volver al inicio</a></p>
  <img style="width:40%;" src="https://www.fizzcreations.com/wp-content/uploads/2022/10/2146-Minions-Comic-Ons-Face-on.png">
  </div>
`);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});