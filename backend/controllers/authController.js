// controllers/authController.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Hardcoded admin credentials
const ADMIN_CREDENTIALS = {
  email: "intern@dacoid.com",
  password: "Test123"
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      // Find or create the admin user
      let user = await User.findOne({ email: ADMIN_CREDENTIALS.email });
      
      if (!user) {
        user = await User.create({ 
          email: ADMIN_CREDENTIALS.email,
          password: ADMIN_CREDENTIALS.password,
          isAdmin: true
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { 
          id: user._id,
          isAdmin: true 
        }, 
        process.env.JWT_SECRET, 
        { expiresIn: "7d" }
      );
      
      return res.json({ 
        token, 
        user: {
          id: user._id,
          email: user.email,
          isAdmin: true
        }
      });
    }

    res.status(401).json({ message: "Invalid credentials" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    
    req.userId = decoded.id;
    req.isAdmin = decoded.isAdmin;
    next();
  });
};

module.exports = { login, verifyToken };
