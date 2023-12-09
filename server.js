const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");

const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://localhost/task_management_system", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Configure Passport
require("./config/passport")(passport);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: "secret", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes

app.use("/users", require("./routes/users"));
app.use("/tasks", require("./routes/tasks"));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
