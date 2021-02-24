const UserSchema = require('../models/UserSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = require('express').Router();

router.post('/login', async (req, res) => {
  try {
    const user = await UserSchema.findOne({ email: req.body.email })
      .select('-name -__v')
      .lean();
    if (!user) res.status(401).json({ msg: 'User not found' });
    else {
      const validPassword = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!validPassword) res.status(400).json({ msg: 'Invalid Passwword' });
      else {
        user.userId = user._id;
        delete user._id;
        delete user.password;
        const token = jwt.sign(user, 'secret.key', {
          expiresIn: '1d'
        });
        res.json({ msg: 'Logged In', token });
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
