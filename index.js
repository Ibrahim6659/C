const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/monSite");

const authRoutes = require("./authController");
app.use("/api", authRoutes);

app.listen(3000, () => console.log("Serveur en marche sur http://localhost:3000"));
