const jwt = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.json({
        status:400,
        success: false,
        message: "Token is not valid",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); 


    req.user = decoded;
    next()
    console.log(req.user);
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "internal server error",
      error: err.message,
    });
  }
};

module.exports = authentication;
