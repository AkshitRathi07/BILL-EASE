const jwt = require('jsonwebtoken');
const User = require('../Model/User');

// const model = require('../Model/User');
// const User = model.User;

const JWT_SECRET = process.env.JWT_SECRET || 'yoursecretkey';

const authMiddleware = async (req, res, next) => {
  // gets the token from the frontend 
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  // used to split the token by space
  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    console.log(req.user , "the middware details are");
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware; 