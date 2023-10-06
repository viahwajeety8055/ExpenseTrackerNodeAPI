const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("ts1", "root", "mousepad", {
  host: "localhost",
  dialect: "mysql",
});

const User = sequelize.define(
  "User",
  {
    uid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "user", // Set the table name to match the SQL table name
  }
);

sequelize
  .sync()
  .then(() => {
    console.log("User table synced successfully.");
  })
  .catch((error) => {
    console.error("Error syncing User table:", error);
  });
