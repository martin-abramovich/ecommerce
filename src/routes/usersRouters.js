const usersController = require('./../controllers/usersController')

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { body, check } = require("express-validator");
const fs = require('fs');



const usuariosPath = path.join(__dirname, '../data/registrados.json');
function emailExists(Email) {
    const usuarios = JSON.parse(fs.readFileSync(usuariosPath, 'utf8'));
    return usuarios.some(usuario => usuario.Email === Email);
  }

const validations = [
    body('Usuario').notEmpty().withMessage("El nombre no puede estar vacío"),
    body('Apellido').notEmpty().withMessage("El apellido no puede estar vacío"),
    body('Email').notEmpty().withMessage("El email no puede estar vacío").bail().isEmail().withMessage("Formato inválido"),
    body('Password').notEmpty().withMessage("La contraseña no puede estar vacía").bail().isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    body('Password2').notEmpty().withMessage("Verificación de contraseña no puede estar vacía"),
    body('Email').custom(async (value) => {
        if (emailExists(value)) {
          throw new Error('El correo electrónico ya está registrado');
        }
    }),
    body('Password2').custom((value, { req }) => {
        if (value !== req.body.Password) {
          throw new Error('Las contraseñas no coinciden');
        }
        return true;
    })
]

const upload = multer();

router.get('/registro' , usersController.registrarse);
router.post('/registro', upload.single('avatar'), validations, usersController.create);



router.get('/login',usersController.iniciarSesion);

router.post('/login', [
  check('email').isEmail().withMessage('Email invalido'),
  check('password').isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres') ], 
  usersController.inicio)

router.get('/check', function(req,res){

  if (req.session.usuarioLogueado == undefined){
    res.send("No estas logueado");
  }
  else {
    res.send("Datos del usuario logueado: " + req.sessio.usuarioLogueado.Email);
  }
})


module.exports = router;