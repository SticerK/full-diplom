const { body } = require('express-validator');

const validator = [
  body('email', 'Введите корректный email').isEmail(),
  body('password', 'Пароль должен содержать более 5 символов').isLength({ min: 5 }),
  body('firstName', 'Имя должно содержать более 3-х символов').isLength({ min: 3 }),
  body('lastName', 'Фамилия должно содержать более 3-х символов').isLength({ min: 3 }),
  body('_password', 'Пароль должен содержать более 5-х символов').isLength({ min: 5 }),
];

module.exports = validator;
