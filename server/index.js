const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const validator = require('./validation/register');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const UserModel = require('./model/User');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const User = require('./model/User');
const path = require('path');

const server = express();
const PORT = config.get('port') ?? 8080;

server.use(express.json());
server.use(cors());

if (process.env.NODE_ENV === 'production') {
  server.use('/', express.static(path.join(__dirname, 'build')));
  const index = path.join(__dirname, 'build', 'index.html');
  server.get('*', (req, res) => {
    res.sendFile(index);
  });
}

server.post('/login', async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) return res.json({ message: 'Пользователь не найден' });

    const isValidPassword = await bcrypt.compare(req.body.password, user._doc.password);

    if (!isValidPassword) return res.json({ message: 'Неверный логин или пароль' });

    const token = jwt.sign(
      {
        _id: user._doc._id,
      },
      'secret'
    );

    const { password: passwordHash, ...userId } = user._doc;

    res.json({
      ...userId,
      token,
    });
  } catch (e) {
    res.status(400).json({ message: 'Ошибка сервера' });
    console.log(e);
  }
});

server.get('/login', async (req, res) => {
  const doc = await UserModel.find();
  res.json(doc);
});

server.post('/register', validator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) res.status(400).json(errors.array());
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);

  const doc = new UserModel({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: password,
    _password: password,
    cash: 0,
  });

  const user = await doc.save();
  const token = jwt.sign(
    {
      _id: user._id,
    },
    'secret'
  );

  const { password: passwordHash, ...userId } = user._doc;

  res.json({
    ...userId,
    token,
  });
});

server.patch('/profile/:userId', async (req, res) => {
  const { userId } = req.params;
  if (userId === req.body.userData._id) {
    const update = await User.findByIdAndUpdate(userId, req.body.userData, { new: true });
    res.json(update);
  }
});

server.delete('/profile/:userId', async (req, res) => {
  const { userId } = req.params;
  await User.findOneAndDelete({
    _id: userId,
  });
  res.json({ message: 'OK' });
});

server.patch('/basket', async (req, res) => {
  console.log(req.body);
  const update = await User.findByIdAndUpdate(req.body._id, req.body, { new: true });
  res.json(update);
});

async function startServer() {
  await mongoose.connect(
    'mongodb+srv://SticerK:12345@cluster0.ohvnllp.mongodb.net/blog?retryWrites=true&w=majority'
  );
  server.listen(PORT, () => {
    console.log('Server has been started');
  });
}

startServer();
