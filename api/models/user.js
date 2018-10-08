module.exports = (sequelize, DataTypes) => {
  return sequelize.define("user", {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    wins: DataTypes.INTEGER,
    losses: DataTypes.INTEGER,
    draws: DataTypes.INTEGER
  });
};
