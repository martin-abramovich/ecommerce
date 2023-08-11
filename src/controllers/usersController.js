const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const jwt = require("jsonwebtoken");

const registeredFilePath = path.join(__dirname, '../data/registrados.json');
const usuariosPath = path.join(__dirname, '../data/registrados.json');
const secretKey = 'Mi Llave Ultra Secreta';

const cloudinaryConfig = { 
    cloud_name: 'dgmxc8fal', 
    api_key: '658928733417987', 
    api_secret: 'CYEYZept3jVWxd829y_AsxNsp1E' 
};
cloudinary.config(cloudinaryConfig);

const encrypt = async (textPlain) => {
    const hash = await bcrypt.hash(textPlain, 8);
    return hash;
};

const controladorUsers = {
    iniciarSesion: (req, res) => {
        res.render("users/login");
    },
    registrarse: (req, res) => {
        res.render("users/registro");
    },
    create: async (req, res) => {
        let resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render("users/registro", {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        const registered = JSON.parse(fs.readFileSync(registeredFilePath, 'utf-8'));
        const idRegistrados = registered.length > 0 ? registered[registered.length - 1].id + 1 : 1;

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

        const ObjRegistrados = {
            id: idRegistrados,
            Usuario: req.body.Usuario,
            Apellido: req.body.Apellido,
            Email: req.body.Email,
            avatar: avatarUrl,
            Password: Passwordhash
        };

        registered.push(ObjRegistrados);
        fs.writeFileSync(registeredFilePath, JSON.stringify(registered, null, ' '));

        res.redirect('/');
    },
    inicio: (req, res) => {
        let resultValidation = validationResult(req);
        if (resultValidation.errors.length > 0) {
            return res.render("users/login", {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        const usuarios = JSON.parse(fs.readFileSync(usuariosPath, 'utf8'));
        const { email, password } = req.body;
        const user = usuarios.find((i) => i.Email == email);
    
        if (user && bcrypt.compareSync(password, user.Password)) {
            const token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + 10,
                    data: user,
                },
                secretKey
            );
    
            res.send("Sesión iniciada correctamente");
        } else {
            return res.render("users/login", {
                mensaje: "Usuario o contraseña incorrecta",
                oldData: req.body
            });
        }
    }
};

module.exports = controladorUsers;