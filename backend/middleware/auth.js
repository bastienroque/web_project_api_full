const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  // verify authentication
  const Authorization = req.headers.authorization;

  console.log("Authorization header:", Authorization);
  if (!Authorization) {
    return res.status(403).json({ error: "Authorization token required" });
  }

  const token = Authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findOne({ _id }).select("_id").select("+password");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = auth;
