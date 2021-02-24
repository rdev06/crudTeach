const UserSchema = require('../models/UserSchema');
const bcrypt = require('bcryptjs');
const isLoggedIn = require('../middlewares/isLoggedIn');

const router = require('express').Router();

router.post('/', async (req, res) => {
  try {
    const password = await bcrypt.hash(req.body.password, 8);
    req.body.password = password;
    let user = await UserSchema.create(req.body);
    user = user.toObject();
    delete user.password;
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/', isLoggedIn, (req, res) =>
  UserSchema.findByIdAndUpdate(req.user.userId, req.body, { new: true })
    .select('-password -__v')
    .lean()
    .then(user => res.json(user))
    .catch(err => res.send(500).json(err))
);

module.exports = router;
