const usersController = require('./../controllers/usersController')

const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { body } = require("express-validator");
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
    body('avatar').custom((value, { req }) => {
        let file = req.file;
    
        // Si no se proporciona un archivo, no hay nada que validar
        if (!file) {
            return true;
        }
    
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        let fileExtension = path.extname(file.originalname);
    
        if (!acceptedExtensions.includes(fileExtension)) {
            throw new Error(`Formato de imagen inválido. Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
        }
    
        return true;
    }),
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

/* configuración del almacenamiento de multer */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'../../public/img/avatars'));
    },
      filename: function (req, file, cb) {
        console.log(path.extname(file.originalname))
        const uniqueSuffix = Date.now();
      cb(null, "product-" + uniqueSuffix + path.extname(file.originalname));
    },
  });

const upload = multer({ storage: storage });

router.get('/registro',usersController.registrarse);
router.post('/registro', upload.single('avatar'), validations, usersController.create);

router.get('/login',usersController.iniciarSesion);


module.exports = router;