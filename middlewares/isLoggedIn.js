const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (!req.headers.authorization)
    res.status(404).json({ msg: 'Token not found in autho' });
  const [type, token] = req.headers.authorization.split(' ');
  if (type != 'Bearer')
    res.status(404).json({ msg: 'Token not found in Bearer' });
  jwt.verify(token, 'secret.key', (err, decode) => {
    if (err) {
      res.status(404).json({ msg: 'Invalid Token' });
    } else {
      req.user = decode;
      next();
    }
  });
};
