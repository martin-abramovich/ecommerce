const usersController = require('./../controllers/usersController');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { body, check } = require('express-validator');
const fs = require('fs');
const path = require('path');
const db = require("../database/models");
const guestMiddleware = require('../../middlewares/guestMiddleware');

async function emailExists(Email) {
    const user = await db.usuario.findOne({
        where: {
            email: Email
        }
    });

    return user !== null;
}

const validations = [
    body('Usuario').notEmpty().withMessage('El nombre no puede estar vacío'),
    body('Apellido').notEmpty().withMessage('El apellido no puede estar vacío'),
    body('Email').notEmpty().withMessage('El email no puede estar vacío').bail().isEmail().withMessage('Formato inválido'),
    body('Password').notEmpty().withMessage('La contraseña no puede estar vacía').bail().isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
    body('Password2').notEmpty().withMessage('Verificación de contraseña no puede estar vacía'),
    body('Email').custom(async (value) => {
        if (await emailExists(value)) {
            throw new Error('El correo electrónico ya está registrado');
        }
    }),
    body('Password2').custom((value, { req }) => {
        if (value !== req.body.Password) {
            throw new Error('Las contraseñas no coinciden');
        }
        return true;
    }),
];

const upload = multer();

router.get('/registro', guestMiddleware, usersController.registrarse);
router.post('/registro', upload.single('avatar'), validations, usersController.create);

router.get('/login', guestMiddleware ,usersController.iniciarSesion);
router.post('/login', [
    check('email').isEmail().withMessage('Email inválido'),
    check('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
], usersController.inicio);

module.exports = router;