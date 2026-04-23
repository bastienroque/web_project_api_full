const Card = require("../models/card");

// GET /cards - returns all cards
module.exports.getCards = (req, res, next) => {
  console.log("user:", req.user);
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

// POST /cards - creates new card
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => res.status(201).send(card))
    .catch(next);
};

// DELETE /cards/:cardId - deletes specific card
module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(404).json({ message: "Card not found" });
      }

      if (!req.user || !card.owner) {
        return res.status(500).json({ message: "Missing user or owner" });
      }

      if (card.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          message: "Você não pode deletar este cartão",
        });
      }

      return Card.findByIdAndDelete(req.params.cardId).then(() =>
        res.send({ message: "Card deleted" }),
      );
    })
    .catch(next);
};

// PUT /cards/:cardId/likes - likes one card
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch(next);
};

// DELETE /cards/:cardId/likes - removes like
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch(next);
};
