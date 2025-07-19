const express = require("express");
const router = express.Router();
const User = require("./models/User"); // Ton modèle mongoose
const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "Email déjà utilisé" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "Inscription réussie" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
