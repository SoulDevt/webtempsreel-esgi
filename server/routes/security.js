const { Router } = require("express");
const { createToken } = require("../lib/jwt");
const { User } = require("../models");
const bcryptjs = require("bcryptjs");
const { ValidationError } = require("sequelize");

const router = new Router();

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(401).json({
        email: "Email not found",
      });
    }
    if (!(await bcryptjs.compare(req.body.password, user.password))) {
      return res.status(401).json({
        password: "Password is incorrect",
      });
    }
    res.json({
      token: createToken(user),
    });
  } catch (error) {
    res.sendStatus(500);
    console.error(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });
    if (existingUser) {
      return res.status(422).json({
        email: "Email already exists",
      });
    }
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.status(422).json({
        quantity: "must be greather than 0",
        title: "must not be empty",
      });
    } else {
      res.sendStatus(500);
      console.error(error);
    }
  }
});

module.exports = router;
