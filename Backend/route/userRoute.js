const express = require('express');
const router = express.Router();
const con = require('../database');
const jwt = require('jsonwebtoken');
const { hashpassword } = require('../uitility');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

let userid = undefined;

router.post("/signup", (req, res) => {
  hashpassword(req.body.password)
    .then(hashPass => {
      const data = { name: req.body.name, password: hashPass };
      con.query("INSERT INTO user SET ?", data, (err, result) => {
        if (err) {
          console.log(err);
          res.status(400).send("Error creating user");
        } else {
          res.status(200).send("User created successfully");
        }
      });
    })
    .catch(err => res.status(400).send("Hashing error: " + err));
});

let authorize = crypto.randomBytes(64).toString("hex");

router.post("/login", (req, res) => {
  const { name, password } = req.body;

  con.query("SELECT * FROM user WHERE name = ?", name, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Internal server error");
    }

    if (result.length) {
      bcrypt.compare(password, result[0].password)
        .then((match) => {
          if (match) {
            const userId = result[0].userId;
            userid = userId;
            const token = jwt.sign({ userId }, authorize);
            res.status(200).send([token, userId]);
          } else {
            res.status(400).send("Password is incorrect");
          }
        });
    } else {
      res.status(400).send("User not found");
    }
  });
});

module.exports = router;
