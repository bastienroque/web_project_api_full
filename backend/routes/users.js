const router = require("express").Router();
const auth = require("../middleware/auth");
const {
  validateCreateUser,
  validateUserId,
  validateAuth,
} = require("../middleware/validation");
const {
  getUsers,
  getCurrentUser,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
} = require("../controllers/users");
const { signupUser, signinUser } = require("../controllers/users");

router.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("O servidor travará agora");
  }, 0);
});

// POST /signin
router.post("/signin", signinUser);

// POST /signup
router.post("/signup", validateCreateUser, signupUser);

// auth middleware
router.use(auth);

// Protected routes
// GET /users
router.get("/", getUsers);

// GET /users/me
router.get("/me", getCurrentUser);

// GET /users/:userId
router.get("/:userId", getUserById);

// POST /users
router.post("/", createUser);

// PATCH /users/me
router.patch("/me", updateProfile);

// PATCH /users/me/avatar
router.patch("/me/avatar", updateAvatar);

module.exports = router;
