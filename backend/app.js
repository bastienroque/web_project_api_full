const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const cors = require("cors");
const path = require("path");
const usersRoutes = require("./routes/users");
const cardsRoutes = require("./routes/cards");
const errorHandler = require("./middleware/errorHandler");
const { requestLogger, errorLogger } = require("./middleware/logger");

require("dotenv").config({ path: path.join(__dirname, ".env") });

const PORT = process.env.PORT || 3000;

// Express app
const app = express();

// Middleware
app.use(cors());

app.use(express.json());
app.use(errors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Request logger
app.use(requestLogger);

// Routes
app.use("/users", usersRoutes);
app.use("/cards", cardsRoutes);

// Error logger
app.use(errorLogger);

// Error handling middleware
app.use(errorHandler);

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log("Server running on Port:", PORT);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
