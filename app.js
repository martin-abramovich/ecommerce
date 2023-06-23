const productosRoutes = require('./src/routes/productosRoutes');
const usersRouters = require('./src/routes/usersRouters');

const express = require("express");
const path = require("path");

const app = express();

app.use('/', productosRoutes); // se concatenan las rutas del primer y segundo parámetro 

app.use('/users', usersRouters);

app.use('*', function(req, res) {
  res.send("Error de acceso, esta ruta no existe en el sitio")
});

const publicPaht = path.resolve(__dirname, "public");
app.use(express.static(publicPaht));

app.set("view engine","ejs");

app.set("views", path.resolve(__dirname, "src", "views"));

app.listen(4000, () => {
  console.log("Servidor corriendo en puerto 4000");
});

