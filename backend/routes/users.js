const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  validateCreateUser,
  validateUserId,
  validateAuth,
} = require("../middleware/validation");
const {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
} = require("../controllers/users");
const { signupUser, signinUser } = require("../controllers/users");

// POST /signin
router.post("/signin", validateUserId, validateAuth, signinUser);

// POST /signup
router.post("/signup", validateCreateUser, signupUser);

// auth middleware
router.use(auth);

// Protected routes
// GET /users
router.get("/", getUsers);

// GET /users/:userId
router.get("/:userId", validateUserId, validateAuth, getUserById);

// POST /users
router.post("/", createUser);

// PATCH /users/me
router.patch("/me", validateUserId, validateAuth, updateProfile);

// PATCH /users/me/avatar
router.patch("/me/avatar", validateUserId, validateAuth, updateAvatar);

module.exports = router;
