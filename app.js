const productosRoutes = require('./src/routes/productosRoutes');
const usersRouters = require('./src/routes/usersRouters');
const methodOverride = require("method-override")
const express = require("express");
const session = require("express-session"); 
const path = require("path");
const logMiddleware = require('./middlewares/logMiddleware');

const app = express();

app.use(session({
  secret: 'si',
  resave: false,
  saveUninitialized: false

}))

//no tocar, necesario para guardar en el Json
app.use(express.urlencoded({ extended: false}))
app.use(express.json())
app.use(methodOverride('_method'))

const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

app.set("view engine","ejs");
app.set('views', path.join(__dirname,  'src','views'));

app.use('/', productosRoutes); // se concatenan las rutas del primer y segundo parámetro 

app.use('/users', usersRouters);

app.use(logMiddleware);

app.use('*', function(req, res) {
  res.send("Error de acceso, esta ruta no existe en el sitio")
});

app.listen(4000, () => {
  console.log("Servidor corriendo en puerto 4000");
});

