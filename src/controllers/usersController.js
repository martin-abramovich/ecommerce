const fs = require('fs');
const path = require('path');
const registeredFilePath = path.join(__dirname, '../data/registrados.json');
const registered = JSON.parse(fs.readFileSync(registeredFilePath, 'utf-8'));
const bcrypt = require('bcryptjs') // es lo que usaremos para incriptar la contraseña
const {validationResult} = require('express-validator');

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
               

               let ObjRegistrados = {
                id: idRegistrados,
                Usuario: registrados.Usuario,
                Apellido: registrados.Apellido,
                Email: registrados.Email,
                avatar: req.file ? `/img/avatars/${req.file.filename}`: "/img/default-game.jpg",
                Password: Passwordhash
               }

               registered.push(ObjRegistrados);
               fs.writeFileSync(registeredFilePath, JSON.stringify(registered, null, ' '));

               res.redirect('/')
        },

 }
       

module.exports = controladorUsers;
