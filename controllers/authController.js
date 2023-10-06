const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const connection = require("../config/database");

const authController = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      const secretKey = "vish";

      const [rows] = await connection.query(
        "SELECT * FROM user WHERE email = ?",
        username
      );

      if (rows.length === 0) {
        return res.status(401).json({ message: "Authentication failed" });
      }

      const user = rows[0];

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: "Authentication failed" });
      }

      const token = jwt.sign(
        {
          uid: user.uid,
        },
        secretKey,
        {
          expiresIn: "24h",
        }
      );

      return res.json({ token });
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  register: async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "All fields should be mandatory" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    try {
      const [inserted] = await connection.query(
        "INSERT INTO user (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashPassword]
      );

      // Fetch the newly inserted user's data
      const [userRows] = await connection.query(
        "SELECT * FROM user WHERE uid = ?",
        [inserted.insertId]
      );

      if (userRows.length === 0) {
        return res
          .status(404)
          .json({ message: "User not found after registration" });
      }

      //  Inserting value in expensetrack table.
      const insertValue = await connection.query(
        "INSERT INTO expensetrack (eamount, budget) values (?, ?)",
        [0, 0]
      );

      const newUser = userRows[0];

      return res.status(201).json({
        message: "Registered Successfully",
        user: newUser,
      });
    } catch (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = authController;
