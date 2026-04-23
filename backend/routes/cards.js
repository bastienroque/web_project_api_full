const router = require("express").Router();
const {
  validateCreateCard,
  validateUserId,
  validateAuth,
} = require("../middleware/validation");
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");
const auth = require("../middleware/auth");

// auth middleware
router.use(auth);

// Protected routes
// GET /cards
router.get("/", getCards);

// DELETE /cards/:cardId
router.delete("/:cardId", deleteCard);

// POST /cards
router.post("/", createCard);

// PUT /cards/:cardId/likes
router.put("/:cardId/likes", likeCard);

// DELETE /cards/:cardId/likes
router.delete("/:cardId/likes", dislikeCard);

module.exports = router;
