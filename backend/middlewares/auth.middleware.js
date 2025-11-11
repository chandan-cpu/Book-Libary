const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const authMiddleware = (req, res, next) => {
  try {

    let token = req.cookies.token;
    
    if (!token && req.headers.authorization) {
      
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }
    
    console.log('Token:', token);

    if (!token) return res.status(401).json({ msg: 'No token, access denied' });


    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);
    req.user = decoded; 

    next(); 
  } catch (error) {
    console.error('JWT Verify Error:', error);
    res.status(401).json({ msg: 'Invalid or expired token' });
  }
};



module.exports={authMiddleware};