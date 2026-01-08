const jwtKey = "fasfasfajs";
const express = require("express");
const sequelize = require("../database");
const Users = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

sequelize.sync();

const app = express();
app.use(express.json());

app.listen(3002, (err) => {
  if (err) process.exit(1);
  console.log("Server running");
});

app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ error: "email is missing" });
  else if (!password)
    return res.status(400).json({ error: "password is missing" });

  try {
    const salt = await bcrypt.genSalt(10);
    const encodedPassword = await bcrypt.hash(password, salt);

    const newUser = await Users.create({
      email: email,
      password: encodedPassword,
    });
    res.status(201).json({ id: newUser.id });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ error: "email is missing" });
  else if (!password)
    return res.status(400).json({ error: "password is missing" });

  try {
    const loginUser = await Users.findOne({ where: { email: email } });
    if (!loginUser)
      return res.status(400).json({ error: "no user with that email" });

    if (await bcrypt.compare(password, loginUser.password)) {
      const token = jwt.sign(
        { id: loginUser.id, email: loginUser.email },
        jwtKey,
        { expiresIn: "1h" }
      );
      res.status(200).json({ jwt: token });
    } else {
      return res.status(400).json({ error: "incorrect password " });
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});
