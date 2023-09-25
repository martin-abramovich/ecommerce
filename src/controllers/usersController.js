const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const jwt = require("jsonwebtoken");
const session = require('express-session');
const db = require("../database/models");

const registeredFilePath = path.join(__dirname, '../data/registrados.json');
const secretKey = 'Mi Llave Ultra Secreta';
const cloudinaryConfig = {
    cloud_name: 'dgmxc8fal',
    api_key: '658928733417987',
    api_secret: 'CYEYZept3jVWxd829y_AsxNsp1E'
};
cloudinary.config(cloudinaryConfig);

async function encrypt(textPlain) {
    const hash = await bcrypt.hash(textPlain, 8);
    return hash;
}

const controladorUsers = {
    iniciarSesion: (req, res) => {
        res.render("users/login");
    },
    registrarse: (req, res) => {
        res.render("users/registro");
    },
    create: async (req, res) => {
        const resultValidation = validationResult(req);
        if (!resultValidation.isEmpty()) {
            return res.render("users/registro", {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        const { Password } = req.body;
        const Passwordhash = await encrypt(Password);

        let avatarUrl = "/img/default-avatar.png";
        if (req.file) {
            const imageBuffer = req.file.buffer;
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            const customFilename = 'avatar' + uniqueSuffix;
            const folder = 'ecommerce_dh/avatars';

            const stream = cloudinary.uploader.upload_stream({ resource_type: 'image', folder: folder, public_id: customFilename }, (error, result) => {
                if (error) {
                    console.error('Error during upload: ', error);
                } else {
                    console.log('Upload successful: ', result);
                }
            });

            streamifier.createReadStream(imageBuffer).pipe(stream);
            avatarUrl = `https://res.cloudinary.com/dgmxc8fal/image/upload/ecommerce_dh/avatars/${customFilename}`;
        } 

        db.usuario.create({
            nombre: req.body.Usuario,
            email:req.body.Email ,
            clave: Passwordhash ,
            imagen: avatarUrl ,
            administrador: 0,
            fecha_creacion: Date.now()
        })

        res.redirect('/');
    },
    inicio: (req, res) => {
        const resultValidation = validationResult(req);
        if (!resultValidation.isEmpty()) {
          return res.render('users/login', {
            errors: resultValidation.mapped(),
            oldData: req.body,
          });
        }
    
        const { email, password } = req.body;
        
        db.usuario.findOne({ where: { email: email } })
          .then((user) => {
            if (user && bcrypt.compareSync(password, user.clave)) {
              const token = jwt.sign(
                {
                  exp: Math.floor(Date.now() / 1000) + 10,
                  data: user,
                },
                secretKey
              );
    
              req.session.user = user;
    
              res.redirect('/');
            } else {
              return res.render('users/login', {
                mensaje: 'Usuario o contraseña incorrecta',
                oldData: req.body,
              });
            }
          })
          .catch((error) => {
            console.error('Error al buscar al usuario en la base de datos:', error);
            return res.status(500).send('Error interno del servidor');
          });
      },
      profile: (req,res) => {
        res.render("users/profile", {user: req.session.user});
      }    
};

module.exports = controladorUsers;