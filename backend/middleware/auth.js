const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).send({ message: 'Unauthorized' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.studentEmail = decodedToken.studentEmail;
    next();
  } catch (err) {
    res.status(401).send({ message: 'Unauthorized' });
  }
};

module.exports = { requireAuth };
