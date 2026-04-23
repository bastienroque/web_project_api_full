const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  const Authorization = req.headers.authorization;

  console.log("Authorization header:", Authorization);

  if (!Authorization) {
    return res.status(403).json({ error: "Authorization token required" });
  }

  const token = Authorization.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(payload._id);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    return next();
  } catch (error) {
    console.log("AUTH ERROR:", error);
    return res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = auth;
