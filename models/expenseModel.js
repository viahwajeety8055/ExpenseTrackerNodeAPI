const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("ts1", "root", "mousepad", {
  host: "localhost",
  dialect: "mysql",
});

const Expense = sequelize.define(
  "Expense",
  {
    eid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    eprice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ereason: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User", // Name of the referenced model (User in this case)
        key: "uid", // Name of the referenced column (uid in the User model)
      },
    },
  },
  {
    tableName: "expense",
  }
);

// Define the association between Expense and User models
Expense.belongsTo(User, { foreignKey: "uid" });

sequelize
  .sync()
  .then(() => {
    console.log("Expense table synced successfully.");
  })
  .catch((error) => {
    console.error("Error syncing User table:", error);
  });
