const router = require('express').Router();
const user = require('./user');
const auth = require('./auth');

router.use('/user', user);
router.use('/auth', auth);

router.get('/', (req, res) => res.send('Welcome to api'));

module.exports = router;
