require("dotenv").config();
const jwtKey = process.env.JWT_SECRET;
const express = require("express");
const cookieParser = require("cookie-parser");
const sequelize = require("../database");
const Users = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const authenticateToken = require("../util/tokenAuth");

sequelize.sync();

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.listen(3002, (err) => {
  if (err) process.exit(1);
  console.log("Server running");
});

app.post("/users/register", async (req, res) => {
  const { name, surname, nickname, mail, phone = null, password } = req.body;
  const validators = {
    name: (v) => {
      if (v === undefined || v === null || String(v).trim() === "")
        return { error: "name is missing" };

      const raw = String(v).trim();
      const normalized = raw[0].toUpperCase() + raw.slice(1).toLowerCase();

      if (hasWhiteSpace(normalized))
        return { error: "cannot have spaces in name" };

      return { value: normalized };
    },
    surname: (v) => {
      if (v === undefined || v === null || String(v).trim() === "")
        return { error: "surname is missing" };

      const raw = String(v).trim();
      const normalized = raw[0].toUpperCase() + raw.slice(1).toLowerCase();

      if (hasWhiteSpace(normalized))
        return { error: "cannot have spaces in surname" };

      return { value: normalized };
    },
    nickname: (v) => {
      if (v === undefined || v === null || String(v).trim() === "")
        return { error: "nickname is missing" };

      const raw = String(v).trim();
      const normalized = raw[0].toUpperCase() + raw.slice(1).toLowerCase();

      if (hasWhiteSpace(normalized))
        return { error: "cannot have spaces in nickname" };

      return { value: normalized };
    },
    mail: (v) => {
      if (v === undefined || v === null || String(v).trim() === "")
        return { error: "mail is missing" };
      const raw = String(v).trim();
      if (!raw.includes("@")) return { error: 'email has to include "@"' };
      if (hasWhiteSpace(raw)) return { error: "cannot have spaces in mail" };

      return { value: raw };
    },
    phone: (v) => {
      if (v === undefined || v === null || String(v).trim() === "")
        return { value: null };
      const raw = String(v).trim();
      const phoneReg =
        /^[\+]?[0-9]{0,3}\W?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

      if (!phoneReg.test(raw)) return { error: "invalid format" };
      return { value: raw };
    },
    password: (v) => {
      if (v === undefined || v === null || String(v).trim() === "")
        return { error: "password is missing" };
      const raw = String(v).trim();
      if (hasWhiteSpace(raw))
        return { error: "cannot have spaces in password" };

      return { value: raw };
    },
  };

  const sanitized = {};
  for (const [field, validate] of Object.entries(validators)) {
    const result = validate(req.body[field]);
    if (result?.error) {
      return res.status(400).json({ error: result.error });
    }
    sanitized[field] = result.value;
  }

  if (await Users.findOne({ where: { mail: sanitized.mail } }))
    return res.status(400).json({ error: "mail already in use" });

  try {
    const salt = await bcrypt.genSalt(10);
    const encodedPassword = await bcrypt.hash(sanitized.password, salt);

    const newUser = await Users.create({
      name: sanitized.name,
      surname: sanitized.surname,
      nickname: sanitized.nickname,
      mail: sanitized.mail,
      phone: sanitized.phone,
      password: encodedPassword,
    });

    res.status(201).json({ id: newUser.id });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

app.post("/users/login", async (req, res) => {
  const validators = {
    mail: (v) => {
      if (v === undefined || v === null || String(v).trim() === "")
        return { error: "mail is missing" };
      const raw = String(v).trim();
      if (!raw.includes("@")) return { error: 'email has to include "@"' };
      if (hasWhiteSpace(raw)) return { error: "cannot have spaces in mail" };

      return { value: raw };
    },
    password: (v) => {
      if (v === undefined || v === null || String(v).trim() === "")
        return { error: "password is missing" };
      const raw = String(v).trim();
      if (hasWhiteSpace(raw))
        return { error: "cannot have spaces in password" };

      return { value: raw };
    },
  };

  const sanitized = {};
  for (const [field, validate] of Object.entries(validators)) {
    const result = validate(req.body[field]);
    if (result?.error) {
      return res.status(400).json({ error: result.error });
    }
    sanitized[field] = result.value;
  }

  try {
    const loginUser = await Users.findOne({ where: { mail: sanitized.mail } });
    if (!loginUser)
      return res.status(400).json({ error: "no user with that mail" });

    if (await bcrypt.compare(sanitized.password, loginUser.password)) {
      const token = jwt.sign(
        { id: loginUser.id, mail: loginUser.mail },
        jwtKey,
        { expiresIn: "2h" }
      );
      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // for developement (localhost is http not https) (then: "true")
        sameSite: "lax", // also for developement (then: "strict")
        maxAge: 2 * 60 * 60 * 1000,
      });
      res.status(200).json({ userId: loginUser.id });
    } else {
      return res.status(400).json({ error: "incorrect password " });
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

app.post("/users/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});

app.get("/users/me", authenticateToken, async (req, res) => {
  try {
    const user = await Users.findOne({ where: { id: req.user.id } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

function hasWhiteSpace(s) {
  const whitespaceChars = [" ", "\t", "\n"];
  return whitespaceChars.some((char) => s.includes(char));
}
