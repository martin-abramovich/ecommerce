const fs = require('fs');
const path = require('path');
const registeredFilePath = path.join(__dirname, '../data/registrados.json');
const registered = JSON.parse(fs.readFileSync(registeredFilePath, 'utf-8'));
const bcrypt = require('bcryptjs') // es lo que usaremos para incriptar la contraseña
const {validationResult} = require('express-validator');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');
const jwt = require("jsonwebtoken")
const users = require('../data/registrados.json')
const usuariosPath = path.join(__dirname, '../data/registrados.json');
const usuarios = JSON.parse(fs.readFileSync(usuariosPath, 'utf8'));



const secretKey = 'Mi Llave Ultra Secreta'
const token = jwt.sign(usuarios[0], secretKey)





cloudinary.config({ 
        cloud_name: 'dgmxc8fal', 
        api_key: '658928733417987', 
        api_secret: 'CYEYZept3jVWxd829y_AsxNsp1E' 
});


//TODO: Encriptamos!!
const encrypt = async (textPlain) => { 
    const hash = await bcrypt.hash(textPlain, 8) //es la cantidad de veces que se multiplicara (8)
    return hash//esto es lo que usaremos para llamar e incriptar un dato 
}

const controladorUsers = {
        
        iniciarSesion: (req, res) => {
                res.render("users/login");
        },   

        registrarse: (req, res) => {
                res.render("users/registro");
                
        },

        create: async (req,res) =>{
               const resultValidation = validationResult(req);
               if (resultValidation.errors.length > 0){
                return res.render("users/registro", {
                        errors: resultValidation.mapped(), //convierte array resultValidation en objeto literal
                        oldData: req.body                        
                })
               };

               let registrados = req.body;
               let idRegistrados;
               if (registered.length > 0){
                idRegistrados = (registered[registered.length-1].id)+1;
               } else {
                idRegistrados = 1;
               }
               
               
               const {Password} = req.body //creamos una constante con el dato o datos que quiera incriptar
               const Passwordhash = await encrypt(Password) //a esa constante la llamamos junto al hash y con (await encrypt(variable) la incriptamos)

               const imageBuffer = req.file.buffer;
               const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
               const customFilename = 'avatar' + uniqueSuffix;
               const folder = 'ecommerce_dh/avatars';
               
               const stream = cloudinary.uploader.upload_stream({ resource_type: 'image', folder: folder, public_id: customFilename }, (error, result) => {
                if (error) {
                        console.error ('Error during upload: ', error);
                } else {
                        console.log('Upload successful: ', result);
                }
               });

               streamifier.createReadStream(imageBuffer).pipe(stream);

               let ObjRegistrados = {
                id: idRegistrados,
                Usuario: registrados.Usuario,
                Apellido: registrados.Apellido,
                Email: registrados.Email,
                avatar: req.file ? `https://res.cloudinary.com/dgmxc8fal/image/upload/ecommerce_dh/avatars/${customFilename}`: "/img/default-avatar.png",
                Password: Passwordhash
               }

               registered.push(ObjRegistrados);
               fs.writeFileSync(registeredFilePath, JSON.stringify(registered, null, ' '));

               res.redirect('/')
        },
        inicio: (req,res)=>{

                const { Email, Password } = req.query;
                const user = usuarios.find((i) => i.Email == Email && i.Password == Password);

                

                if (user) {

                        const token = jwt.sign({
                                exp: Math.floor(Date.now() / 1000) + 10,
                                data: user,
                            },
                            secretKey
                        );
                
                        res.send("ola")
                           
                    } else {
                        res.send("Usuario o contraseña incorrecta");
                    }
                  

               
                
        }

 }
       

module.exports = controladorUsers;
