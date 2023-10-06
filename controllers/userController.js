const connection = require("../config/database");

const userController = {
  get: async (req, res) => {
    try {
      const [rows] = await connection.query("SELECT * FROM user");

      if (rows.length === 0) {
        return res.status(200).json({ message: "No data found" });
      }

      return res.json({ data: rows });
    } catch (err) {
      res.json({ err });
    }
  },

  create: async (req, res) => {},
  update: async (req, res) => {},
  delete: async (req, res) => {},
};

module.exports = userController;
