const jwt = require("jsonwebtoken");
const connection = require("../config/database");

const expenseController = {
  get: async (req, res) => {
    try {
      const uid = req.uid;

      const [rows] = await connection.query(
        "SELECT * FROM expense where uid = ?",
        [uid]
      );

      return res.json(rows);
    } catch (err) {
      res.json(err);
    }
  },
  create: async (req, res) => {
    try {
      const { reason, price } = req.body;

      const uid = req.id.uid;

      const created = await connection.query(
        "INSERT into expense(ereason, eprice, uid) values (? ,? ,?)",
        [reason, price, uid]
      );

      return res.json(created);
    } catch (err) {
      res.json(err);
    }
  },
  update: async (req, res) => {
    try {
      const { reason, price, eid } = req.body;

      const value = await connection.query(
        "UPDATE expense SET ereason = ?, eprice = ? WHERE eid = ?",
        [reason, price, eid]
      );

      return res.json(value);
    } catch (err) {
      res.json(err);
    }
  },
  delete: async (req, res) => {
    try {
      const { eid } = req.body;

      const value = await connection.query(
        "DELETE from expense where eid = ?",
        [eid]
      );

      return res.json(value);
    } catch (err) {
      res.json(err);
    }
  },
};

module.exports = expenseController;
